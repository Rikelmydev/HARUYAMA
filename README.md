# 🍱 Haruyama Sushi - Sistema de Gerenciamento de Fila

Um sistema completo e moderno de gerenciamento de fila para restaurantes, desenvolvido com Node.js, Express e WebSockets para atualizações em tempo real.

## 🚀 Características

- ✅ **Interface de Cliente Responsiva** - Páginas para entrada na fila, visualização de cardápio, status e perfil
- ✅ **Painel Administrativo em Tempo Real** - Gerenciar fila, mesas e estatísticas
- ✅ **WebSockets** - Atualização em tempo real para todos os clientes conectados
- ✅ **Design Premium** - Inspirado em design Material Design com tema Haruyama
- ✅ **Persistência de Dados** - Dados salvos em arquivo JSON
- ✅ **Responsivo** - Funciona em desktop e mobile

## 📋 Páginas Disponíveis

### Cliente
- **`/` (Entrada na Fila)** - Formulário para entrar na fila com nome e número de convidados
- **`/menu`** - Visualizar cardápio com categorias e preços
- **`/status`** - Acompanhar posição na fila em tempo real
- **`/profile`** - Perfil do cliente com preferências e histórico

### Administrador
- **`/admin`** - Painel completo com:
  - Dashboard com estatísticas
  - Gerenciamento de fila
  - Controle de mesas
  - Configurações do restaurante

## 🛠️ Instalação

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar Servidor
```bash
npm start
```

O servidor iniciará em `http://localhost:3000`

### 3. Acessar
- **Cliente:** `http://localhost:3000`
- **Admin:** `http://localhost:3000/admin`

## 📁 Estrutura do Projeto

```
HARUYAMA/
├── server.js              # Servidor Node.js principal
├── package.json           # Dependências do projeto
├── public/                # Arquivos estáticos
│   ├── index.html        # Página de entrada na fila
│   ├── menu.html         # Cardápio
│   ├── status.html       # Status da fila
│   ├── profile.html      # Perfil do cliente
│   └── admin.html        # Painel administrativo
└── data/                  # Dados persistidos
    └── queue.json        # Arquivo de fila
```

## 🎯 Como Usar

### Para Clientes
1. Abrir `http://localhost:3000`
2. Preencher nome e número de convidados
3. Clicar em "Entrar na Fila"
4. Receber número de identificação
5. Acompanhar status em `/status`

### Para Administradores
1. Abrir `http://localhost:3000/admin`
2. Dashboard mostra:
   - Pessoas na fila
   - Mesas ocupadas
   - Cliente sendo atendido
3. Ações disponíveis:
   - **Chamar Próximo** - Chamar próximo cliente da fila
   - **Concluir Atendimento** - Marcar atendimento como completo
   - **Liberar Mesa** - Liberar mesa ocupada

## 🔌 API WebSocket

### Eventos Enviados pelo Cliente
- `add-to-queue` - Adicionar cliente à fila
- `confirm-presence` - Confirmar presença quando chamado

### Eventos Recebidos pelo Cliente
- `queue-update` - Atualização do estado da fila (enviado a todos)
- `queue-number` - Número de identificação do cliente
- `customer-called` - Cliente chamado para a mesa

### Eventos do Administrador
- `call-next` - Chamar próximo cliente
- `complete-service` - Concluir serviço
- `free-table` - Liberar mesa

## 📊 Estrutura de Dados

### Queue Entry
```javascript
{
  id: "socket-id",
  number: 42,
  name: "João Silva",
  guests: 4,
  timestamp: "2024-05-11T10:30:00Z",
  status: "waiting" | "called" | "seated",
  position: 3
}
```

### Queue State
```javascript
{
  queue: Array<QueueEntry>,
  currentServing: QueueEntry | null,
  nextNumber: 43,
  tables: 15,
  occupiedTables: 8,
  averageWaitTime: 25
}
```

## 🎨 Tema de Cores

O projeto utiliza o sistema de cores Material Design adaptado para Haruyama:

- **Primária:** #5D4037 (Marrom escuro)
- **Secundária:** #705C4E (Marrom médio)
- **Superfície:** #FAF7F2 (Bege claro)
- **Fundo:** #FAF7F2 (Bege)

## 📱 Responsive Design

- **Mobile:** Layout single-column com navegação por abas
- **Tablet:** Layout 2-column com navegação melhorada
- **Desktop:** Layout full com sidebar

## 🔧 Configuração Avançada

### Aumentar Limite de Clientes
Edite `server.js` e altere a variável de configuração:
```javascript
tables: 15  // Aumentar este número
```

### Mudar Porta
```bash
PORT=8000 npm start
```

## 🚀 Próximas Melhorias

- [ ] Autenticação de usuários
- [ ] Integração com banco de dados (MongoDB)
- [ ] Notificações via SMS/Push
- [ ] Sistema de cupons e descontos
- [ ] Histórico de pedidos
- [ ] Reservas de mesas
- [ ] Sistema de avaliações

## 📝 Licença

MIT

## 👨‍💻 Autor

Desenvolvido com ❤️ para Haruyama Sushi

---

**Suporte:** Para dúvidas ou reportar bugs, abra uma issue no GitHub.
