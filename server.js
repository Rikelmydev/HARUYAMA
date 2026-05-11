const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'data', 'queue.json');
const TABLES = [
  { id: 'C01', type: 'casal', label: 'Mesa Casal 01', capacity: 2 },
  { id: 'C02', type: 'casal', label: 'Mesa Casal 02', capacity: 2 },
  { id: 'C03', type: 'casal', label: 'Mesa Casal 03', capacity: 2 },
  { id: 'C04', type: 'casal', label: 'Mesa Casal 04', capacity: 2 },
  { id: 'C05', type: 'casal', label: 'Mesa Casal 05', capacity: 2 },
  { id: 'M01', type: 'medio', label: 'Mesa Média 01', capacity: 4 },
  { id: 'M02', type: 'medio', label: 'Mesa Média 02', capacity: 4 },
  { id: 'M03', type: 'medio', label: 'Mesa Média 03', capacity: 4 },
  { id: 'M04', type: 'medio', label: 'Mesa Média 04', capacity: 4 },
  { id: 'M05', type: 'medio', label: 'Mesa Média 05', capacity: 4 },
  { id: 'F01', type: 'familia', label: 'Mesa Família 01', capacity: 6 },
  { id: 'F02', type: 'familia', label: 'Mesa Família 02', capacity: 6 },
  { id: 'F03', type: 'familia', label: 'Mesa Família 03', capacity: 6 },
  { id: 'F04', type: 'familia', label: 'Mesa Família 04', capacity: 6 },
  { id: 'F05', type: 'familia', label: 'Mesa Família 05', capacity: 6 }
];
const DEFAULT_PORT = Number(process.env.PORT) || 3000;
const MAX_PORT_ATTEMPTS = DEFAULT_PORT + 10;

function createInitialTableState() {
  return TABLES.map((table) => ({
    ...table,
    status: 'free',
    customer: null
  }));
}

function normalizeDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

function normalizeCpf(value) {
  return normalizeDigits(value).slice(0, 11);
}

function normalizePhone(value) {
  return normalizeDigits(value).slice(0, 11);
}

function formatCpf(value) {
  const digits = normalizeCpf(value);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

function formatPhone(value) {
  const digits = normalizePhone(value);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function createInitialState() {
  return {
    queue: [],
    currentServing: null,
    nextNumber: 1,
    tables: TABLES.length,
    tableLayout: createInitialTableState(),
    occupiedTables: 0,
    averageWaitTime: 25,
    servedToday: 0
  };
}

// Garantir que a pasta de dados existe
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Estrutura de dados
let queueData = createInitialState();

function normalizeQueueItem(item) {
  return {
    ...item,
    phone: normalizePhone(item.phone),
    cpf: normalizeCpf(item.cpf),
    guests: Number(item.guests) || 1,
    position: Number(item.position) || 1,
    status: item.status || 'waiting',
    tableId: item.tableId || null,
    tableType: item.tableType || null,
    createdAt: item.createdAt || new Date().toISOString()
  };
}

function normalizeTableItem(item) {
  const base = TABLES.find((table) => table.id === item.id) || item;
  return {
    ...base,
    status: item.status || 'free',
    customer: item.customer ? normalizeQueueItem(item.customer) : null
  };
}

function recalculateQueuePositions() {
  queueData.queue.forEach((item, index) => {
    item.position = index + 1;
  });
}

function recalculateOccupiedTables() {
  queueData.occupiedTables = queueData.tableLayout.filter((table) => table.status === 'occupied').length;
}

function syncDerivedState() {
  queueData.queue = queueData.queue.map(normalizeQueueItem);
  queueData.tableLayout = queueData.tableLayout.length ? queueData.tableLayout.map(normalizeTableItem) : createInitialTableState();
  queueData.tables = queueData.tableLayout.length;
  queueData.nextNumber = Number(queueData.nextNumber) || 1;
  queueData.averageWaitTime = Number(queueData.averageWaitTime) || 25;
  queueData.servedToday = Number(queueData.servedToday) || 0;
  recalculateQueuePositions();
  recalculateOccupiedTables();
}

function persistAndBroadcast() {
  syncDerivedState();
  saveQueue();
  io.emit('queue-update', queueData);
}

function findDuplicateCustomer(cpf, phone) {
  const normalizedCpf = normalizeCpf(cpf);
  const normalizedPhone = normalizePhone(phone);

  const queueMatch = queueData.queue.find((item) => item.cpf === normalizedCpf || item.phone === normalizedPhone);
  if (queueMatch) {
    return queueMatch;
  }

  const tableMatch = queueData.tableLayout.find((table) => table.customer && (table.customer.cpf === normalizedCpf || table.customer.phone === normalizedPhone));
  return tableMatch ? tableMatch.customer : null;
}

function findTableById(tableId) {
  return queueData.tableLayout.find((table) => table.id === tableId) || null;
}

function findBestTableForGuests(guestCount) {
  return queueData.tableLayout
    .filter((table) => table.status === 'free' && table.capacity >= guestCount)
    .sort((left, right) => left.capacity - right.capacity)[0] || null;
}

function findNextWaitingCustomerForTable(table) {
  return queueData.queue.find((item) => item.guests <= table.capacity) || null;
}

function assignCustomerToTable(customer, table) {
  const seatedCustomer = {
    ...customer,
    status: 'seated',
    tableId: table.id,
    tableType: table.type,
    seatedAt: new Date().toISOString()
  };

  table.status = 'occupied';
  table.customer = seatedCustomer;
  queueData.currentServing = seatedCustomer;
  queueData.queue = queueData.queue.filter((item) => item.number !== customer.number);
  recalculateQueuePositions();
  recalculateOccupiedTables();
  queueData.servedToday += 1;
  return seatedCustomer;
}

function customerRoom(cpf) {
  return `cpf:${normalizeCpf(cpf)}`;
}

// Carregar dados existentes
function loadQueue() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      queueData = JSON.parse(data);
      if (!Array.isArray(queueData.tableLayout) || queueData.tableLayout.length === 0) {
        queueData.tableLayout = createInitialTableState();
      }
    }
  } catch (error) {
    queueData = createInitialState();
    console.log('Inicializando nova fila');
  }

  syncDerivedState();
}

// Salvar dados
function saveQueue() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(queueData, null, 2));
}

// Carregar dados ao iniciar
loadQueue();

// Rotas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

app.get('/status', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'status.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-pro.html'));
});

app.get('/api/queue', (req, res) => {
  res.json(queueData);
});

app.get('/api/tables', (req, res) => {
  res.json(queueData.tableLayout);
});

// WebSocket conexões
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // Enviar estado atual
  socket.emit('queue-update', queueData);

  socket.on('register-client', (data = {}) => {
    const cpf = normalizeCpf(data.cpf);
    if (!cpf) {
      return;
    }

    socket.join(customerRoom(cpf));
  });

  // Adicionar à fila
  socket.on('add-to-queue', (data) => {
    const name = String(data.name || '').trim();
    const cpf = normalizeCpf(data.cpf);
    const guests = Math.min(Math.max(Number(data.guests) || 1, 1), 10);

    if (!name || cpf.length !== 11) {
      socket.emit('queue-error', {
        message: 'Preencha nome e CPF válidos para entrar na fila.'
      });
      return;
    }

    const duplicateCustomer = findDuplicateCustomer(cpf, '');
    if (duplicateCustomer) {
      socket.emit('queue-error', {
        message: 'Já existe um cadastro ativo com este CPF.'
      });
      return;
    }

    const newEntry = {
      id: `${Date.now()}-${socket.id}`,
      socketId: socket.id,
      number: queueData.nextNumber,
      name,
      cpf,
      guests,
      createdAt: new Date().toISOString(),
      status: 'waiting',
      position: queueData.queue.length + 1
    };

    queueData.queue.push(newEntry);
    queueData.nextNumber++;
    socket.join(customerRoom(cpf));
    persistAndBroadcast();
    socket.emit('queue-number', newEntry.number);
    socket.emit('queue-confirmed', newEntry);
    console.log(`${name} adicionado à fila - Número: ${newEntry.number}`);
  });

  // Chamar próximo cliente
  socket.on('call-next', (payload = {}) => {
    const table = payload.tableId ? findTableById(payload.tableId) : findBestTableForGuests(payload.guests || 1);

    if (!table) {
      socket.emit('queue-error', {
        message: 'Não há mesa disponível para este chamado.'
      });
      return;
    }

    if (table.status === 'occupied') {
      socket.emit('queue-error', {
        message: 'A mesa selecionada já está ocupada.'
      });
      return;
    }

    const customer = findNextWaitingCustomerForTable(table);
    if (!customer) {
      socket.emit('queue-error', {
        message: 'Não há cliente na fila compatível com esta mesa.'
      });
      return;
    }

    const seatedCustomer = assignCustomerToTable(customer, table);
    saveQueue();
    io.emit('queue-update', queueData);
    const notification = {
      customer: seatedCustomer,
      table,
      message: `Sua vez chegou. Dirija-se à ${table.label}.`
    };

    if (seatedCustomer.socketId) {
      io.to(seatedCustomer.socketId).emit('table-ready', notification);
    }

    io.emit('customer-called', notification);
  });

  // Marcar como concluído
  socket.on('complete-service', (payload = {}) => {
    const table = payload.tableId ? findTableById(payload.tableId) : queueData.tableLayout.find((item) => item.customer && item.customer.number === payload.number);

    if (!table || !table.customer) {
      socket.emit('queue-error', {
        message: 'Nenhuma mesa ativa encontrada para concluir.'
      });
      return;
    }

    if (queueData.currentServing && queueData.currentServing.number === table.customer.number) {
      queueData.currentServing = null;
    }

    table.status = 'free';
    table.customer = null;
    persistAndBroadcast();
  });

  // Confirmar presença
  socket.on('confirm-presence', (data) => {
    const cpf = normalizeCpf(data.cpf);
    const customerInQueue = queueData.queue.find((item) => item.cpf === cpf);
    const customerOnTable = queueData.tableLayout.find((table) => table.customer && table.customer.cpf === cpf);

    if (customerInQueue) {
      customerInQueue.status = 'confirmed';
    }

    if (customerOnTable) {
      customerOnTable.customer.status = 'seated';
      queueData.currentServing = customerOnTable.customer;
    }

    persistAndBroadcast();
  });

  // Liberar mesa
  socket.on('free-table', (payload = {}) => {
    const table = payload.tableId ? findTableById(payload.tableId) : queueData.tableLayout.find((item) => item.customer && item.customer.number === payload.number);

    if (!table || !table.customer) {
      socket.emit('queue-error', {
        message: 'Nenhuma mesa ocupada encontrada para liberar.'
      });
      return;
    }

    if (queueData.currentServing && queueData.currentServing.number === table.customer.number) {
      queueData.currentServing = null;
    }

    table.status = 'free';
    table.customer = null;
    persistAndBroadcast();
  });

  // Desconectar
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

function startServer(port, attemptsLeft) {
  server.listen(port);

  server.once('listening', () => {
    const address = server.address();
    const actualPort = address && typeof address === 'object' ? address.port : port;
    console.log(`🍱 Haruyama Sushi - Servidor rodando em http://localhost:${actualPort}`);
    console.log(`📊 Painel Admin: http://localhost:${actualPort}/admin`);
  });

  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && attemptsLeft > 0) {
      console.log(`Porta ${port} em uso, tentando ${port + 1}...`);
      startServer(port + 1, attemptsLeft - 1);
      return;
    }

    console.error(error);
    process.exit(1);
  });
}

startServer(DEFAULT_PORT, MAX_PORT_ATTEMPTS - DEFAULT_PORT);
