# 📊 Estrutura do Projeto Haruyama Sushi

## 🎯 Visão Geral

```
┌─────────────────────────────────────────────────────────┐
│         HARUYAMA SUSHI - Sistema de Fila                 │
│          Tempo Real com WebSockets                        │
└─────────────────────────────────────────────────────────┘

                     SERVIDOR NODE.JS
                   (server.js - Port 3000)
                            │
          ┌─────────────────┼──────────────────┐
          │                 │                  │
    ┌──────────┐   ┌──────────────┐   ┌──────────────┐
    │ CLIENTE  │   │  WEBSOCKET   │   │   DATABASE   │
    │ (BROWSER)│◄─►│  (Socket.io) │◄─►│  (queue.json)│
    └──────────┘   └──────────────┘   └──────────────┘
          │                 │
    ┌─────┴──────┐    ┌─────┴──────┐
    │  Interface │    │   Eventos  │
    │   HTML+CSS │    │   Tempo    │
    └─────┬──────┘    │   Real     │
          │            └────────────┘
    ┌─────┴─────────────┐
    │  Múltiplas Abas:  │
    │  - Fila           │
    │  - Menu           │
    │  - Status         │
    │  - Perfil         │
    │  - Admin          │
    └───────────────────┘
```

---

## 📂 Estrutura de Arquivos

```
HARUYAMA/
│
├── 📄 server.js                    # ⭐ Servidor principal
│   └─ Express + Socket.io + CORS
│
├── 📄 package.json                 # Dependências npm
│   ├─ express
│   ├─ socket.io
│   └─ cors
│
├── 📁 public/                      # Arquivos de frontend
│   ├── 📄 index.html              # Página 1: Entrar na Fila
│   ├── 📄 menu.html               # Página 2: Cardápio
│   ├── 📄 status.html             # Página 3: Status
│   ├── 📄 profile.html            # Página 4: Perfil
│   └── 📄 admin.html              # Página 5: Painel Admin
│
├── 📁 data/                       # Dados persistidos
│   └── 📄 queue.json             # Arquivo de fila (gerado)
│
├── 📄 README.md                   # Documentação completa
├── 📄 QUICK_START.md              # Guia rápido
├── 📄 ESTRUTURA.md                # Este arquivo
└── 📄 .gitignore                  # Arquivos ignorados

```

---

## 🔄 Fluxo de Dados

### 1️⃣ Cliente Entra na Fila

```
Cliente Browser
     │
     ├─► Abre http://localhost:3000
     │
     ├─► Preenche: Nome + Nº de Pessoas
     │
     ├─► Clica "Entrar na Fila"
     │
     ├─► Socket.io emite: 'add-to-queue'
     │
     ├─► Servidor recebe evento
     │
     ├─► Salva em data/queue.json
     │
     ├─► Emite para TODOS os clientes: 'queue-update'
     │
     └─► Cliente recebe seu número (#42)
         Outros clientes veem sua posição na fila
         Admin vê atualização em tempo real
```

### 2️⃣ Admin Chama Próximo Cliente

```
Admin (http://localhost:3000/admin)
     │
     ├─► Vê Dashboard com fila
     │
     ├─► Clica "Chamar Próximo"
     │
     ├─► Socket.io emite: 'call-next'
     │
     ├─► Servidor:
     │   ├─ Remove primeiro da fila
     │   ├─ Define como 'currentServing'
     │   ├─ Atualiza data/queue.json
     │
     ├─► Emite para TODOS: 'queue-update'
     │
     └─► Todos os clientes veem:
         ✅ Próximo cliente chamado
         ✅ Nova posição na fila
         ✅ Admin vê mudanças em tempo real
```

### 3️⃣ Cliente Confirmará Presença

```
Cliente em /status
     │
     ├─► Recebe notificação: "Mesa Pronta!"
     │
     ├─► Clica "Estou a caminho"
     │
     ├─► Socket.io emite: 'confirm-presence'
     │
     ├─► Servidor marca como 'seated'
     │
     ├─► Atualiza em tempo real
     │
     └─► Próximo cliente pode ser chamado
```

---

## 🔌 Comunicação WebSocket

### Eventos do Cliente ➡️ Servidor

| Evento | Dados | Descrição |
|--------|-------|-----------|
| `add-to-queue` | `{name, guests}` | Cliente entra na fila |
| `confirm-presence` | - | Cliente confirma presença |

### Eventos do Servidor ➡️ Cliente

| Evento | Dados | Descrição |
|--------|-------|-----------|
| `queue-update` | `{queue, currentServing, tables...}` | Atualização geral (broadcast) |
| `queue-number` | `number` | Número do cliente |
| `customer-called` | `{name, number...}` | Cliente chamado |

### Eventos do Admin ➡️ Servidor

| Evento | Dados | Descrição |
|--------|-------|-----------|
| `call-next` | - | Chamar próximo cliente |
| `complete-service` | - | Concluir atendimento |
| `free-table` | - | Liberar mesa |

---

## 🌐 Rotas HTTP

```
GET  /                          ← Página inicial (Fila)
GET  /menu                      ← Cardápio
GET  /status                    ← Status da fila
GET  /profile                   ← Perfil do cliente
GET  /admin                     ← Painel administrativo
GET  /api/queue                 ← API para dados JSON
GET  /socket.io/socket.io.js    ← WebSocket cliente (auto)
```

---

## 💾 Estrutura do Banco de Dados (queue.json)

```json
{
  "queue": [
    {
      "id": "socket-id-123",
      "number": 42,
      "name": "João Silva",
      "guests": 4,
      "timestamp": "2024-05-11T10:30:00Z",
      "status": "waiting",
      "position": 1
    },
    {
      "id": "socket-id-456",
      "number": 43,
      "name": "Maria Santos",
      "guests": 2,
      "timestamp": "2024-05-11T10:35:00Z",
      "status": "waiting",
      "position": 2
    }
  ],
  "currentServing": {
    "id": "socket-id-789",
    "number": 41,
    "name": "Pedro Costa",
    "guests": 3,
    "status": "called"
  },
  "nextNumber": 44,
  "tables": 15,
  "occupiedTables": 8,
  "averageWaitTime": 25
}
```

---

## 🎨 Design System

### Cores Haruyama
```
Primária:      #5D4037 (Marrom escuro)
Secundária:    #705C4E (Marrom médio)
Superfície:    #FAF7F2 (Bege claro)
Fundo:         #FAF7F2 (Bege)
Outline:       #A09384 (Cinza marrom)
Sucesso:       #4CAF50 (Verde)
Erro:          #F44336 (Vermelho)
```

### Tipografia
```
Títulos:       EB Garamond
Corpo:         Hanken Grotesk
Ícones:        Material Symbols
```

### Espaçamento (Tailwind CSS)
```
Margem Mobile: 20px
Margem Desktop: 64px
Gutter (padding): 24px
Unit (base): 8px
Seção: 120px
Máx largura: 1200px
```

---

## 🚀 Sequência de Inicialização

```
1. Servidor inicia (node server.js)
   ├─ Express servidor HTTP
   ├─ Socket.io websocket
   ├─ Carrega data/queue.json (ou cria novo)
   └─ Escuta em localhost:3000

2. Cliente abre http://localhost:3000
   ├─ Navegador carrega index.html
   ├─ Conecta Socket.io ao servidor
   ├─ Recebe 'queue-update' inicial
   └─ Renderiza interface

3. Admin abre http://localhost:3000/admin
   ├─ Carrega admin.html
   ├─ Conecta Socket.io
   ├─ Recebe dados iniciais
   └─ Começa a gerenciar
```

---

## 📊 Fluxo de Atendimento Completo

```
CLIENTE                    SERVIDOR              ADMIN
  │                           │                    │
  ├─ Abre /                   │                    │
  ├────────────────────────► [conexão]             │
  │                           │                    │
  │ Preenche formulário        │                    │
  ├─ "add-to-queue"           │                    │
  ├────────────────────────► Salva em JSON        │
  │                           ├─ Emite update     ◄┤
  │◄──── "queue-number" #42   │                    │
  │ (Recebe seu número)        │                    │
  │                            │  Vê: "Pessoas: 1"
  │                            │  Vê: "#42 na fila"
  │                            │
  │ Abre /status              │                    │
  ├─ "queue-update"           │                    │
  │ Vê: "Posição: 1ª"         │                    │
  │ Vê: "Espera: ~10 min"      │                    │
  │                            │                    │
  │                            │ ◄─ "call-next"   │
  │                            │                    │
  │◄──── "customer-called"     │  Emite update    ◄┤
  │ Notificação: "Mesa pronta" │                   │
  │                            │  Vê: "#42 atendendo"
  │                            │                    │
  │ Clica "Estou a caminho"    │                    │
  ├─ "confirm-presence"       │                    │
  │                            │                    │
  │────────────────────────► Marca como 'seated'  │
  │                           │ Emite update      ◄┤
  │ Vai à mesa                 │                    │
  │                            │  Vê: "Atendido"   │
  │                            │  Vê: "Próximo..."  │
  │                            │                    │
  │ (Cliente está sentado)     │                    │
  │                            │ ◄─ "free-table"  │
  │                            │ (depois do serviço)
  │                            ├─ Atualiza JSON
  │                            │ Emite update      ◄┤
  │                            │                    │
  │ (Próximo cliente #43       │  Pronto para      │
  │  recebe notificação)       │  chamar próximo   │
```

---

## ⚙️ Tecnologias Utilizadas

| Camada | Tecnologia | Função |
|--------|-----------|--------|
| **Backend** | Node.js | Runtime JavaScript |
| | Express | Framework HTTP |
| | Socket.io | WebSockets |
| | CORS | Requisições cross-origin |
| **Frontend** | HTML5 | Estrutura |
| | Tailwind CSS | Estilos |
| | JavaScript Vanilla | Interatividade |
| | Material Symbols | Ícones |
| **Persistência** | JSON File | Armazenamento simples |

---

## 🔄 Atualização em Tempo Real

O segredo está no WebSocket Socket.io:

```javascript
// Servidor emite para TODOS os clientes
io.emit('queue-update', queueData);

// Cada cliente recebe
socket.on('queue-update', (data) => {
  // Atualiza a tela com novos dados
  updateUI(data);
});
```

Isso significa que **todos veem a mesma informação simultaneamente**, sem precisar de refresh!

---

## 🎓 Como Expandir

### Adicionar Nova Página
1. Crie `/public/nova-pagina.html`
2. Adicione rota em `server.js`:
```javascript
app.get('/nova-pagina', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'nova-pagina.html'));
});
```
3. Pronto! 🎉

### Adicionar Banco de Dados Real
1. Instale MongoDB ou PostgreSQL
2. Substitua:
```javascript
// De:
fs.writeFileSync(DATA_FILE, JSON.stringify(queueData));

// Para:
await Database.save(queueData);
```

### Adicionar Autenticação
1. Instale `passport.js` ou `jwt`
2. Proteja as rotas do admin
3. Adicione login

---

## ✅ Checklist de Verificação

- [ ] Node.js instalado (`node --version`)
- [ ] Pasta do projeto criada
- [ ] `npm install` executado
- [ ] Sem erros ao iniciar
- [ ] Consegue acessar `http://localhost:3000`
- [ ] Admin carrega em `http://localhost:3000/admin`
- [ ] WebSocket conectado (abra DevTools F12)
- [ ] Formulário aceita entrada
- [ ] Número aparece na tela
- [ ] Múltiplas abas sincronizam em tempo real
- [ ] Admin vê atualização imediata

---

## 🎉 Pronto!

Você tem um sistema **profissional e completo** de gerenciamento de fila com:
- ✅ Interface bonita e responsiva
- ✅ Comunicação em tempo real
- ✅ Múltiplos usuários simultâneos
- ✅ Painel de administração
- ✅ Persistência de dados
- ✅ Escalável e fácil de estender

**Bom uso!** 🍱✨
