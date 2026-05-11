# 🍱 Haruyama Sushi - Início Rápido

## ⚡ 5 Minutos para Começar

### Passo 1️⃣ - Instalar Dependências
Abra o terminal na pasta do projeto e execute:
```bash
npm install
```
Isso baixará todas as bibliotecas necessárias (Express, Socket.io, etc)

### Passo 2️⃣ - Iniciar o Servidor
```bash
npm start
```

Você deve ver:
```
🍱 Haruyama Sushi - Servidor rodando em http://localhost:3000
📊 Painel Admin: http://localhost:3000/admin
```

### Passo 3️⃣ - Abrir no Navegador

**Cliente:**
- Abra o navegador em `http://localhost:3000`
- Preencha seu nome e número de pessoas
- Clique em "Entrar na Fila"
- Seu número aparecerá na tela!

**Administrador:**
- Abra em outra aba `http://localhost:3000/admin`
- Você verá o Dashboard com:
  - Pessoas na fila
  - Mesas ocupadas
  - Opções para chamar próximo cliente

---

## 🎯 O que Cada Página Faz?

| Página | URL | Função |
|--------|-----|---------|
| **Entrada na Fila** | `/` | Cliente preenche nome e entra na fila |
| **Cardápio** | `/menu` | Visualizar pratos e preços |
| **Status** | `/status` | Ver sua posição na fila em tempo real |
| **Perfil** | `/profile` | Dados do cliente e preferências |
| **Admin** | `/admin` | Gerenciar fila (usar outro navegador) |

---

## 👨‍💼 Como Usar o Painel Admin?

### 1. Dashboard (Tela Principal)
Mostra:
- Quantas pessoas estão na fila
- Quantas mesas estão ocupadas
- Quem está sendo atendido agora

### 2. Gerenciar Fila
- Vê lista de todas as pessoas esperando
- Cada pessoa mostra: número, nome, quantas pessoas no grupo

### 3. Ações Rápidas (Botões Principais)
- **Chamar Próximo** - Chama o próximo cliente para a mesa
- **Concluir Atendimento** - Marca que o cliente foi para a mesa
- **Liberar Mesa** - Marca que uma mesa ficou livre

### 4. Configurações
- Alterar número de mesas
- Definir tempo de atendimento
- Abrir ou fechar o restaurante

---

## 📱 Testando no Mobile

1. Abra o navegador do seu celular
2. Acesse: `http://<seu-ip>:3000`
   (substitua `<seu-ip>` pelo IP do seu computador)
3. Funciona perfeitamente em smartphone!

### Como encontrar o IP?
**Windows:**
- Abra o terminal
- Digite: `ipconfig`
- Procure por "IPv4 Address" (ex: 192.168.1.100)

---

## 🔄 Como Funciona em Tempo Real?

1. Cliente entra na fila no `/` 
2. Admin vê aparecer na fila no `/admin`
3. Admin clica "Chamar Próximo"
4. Cliente recebe notificação que sua mesa está pronta
5. Admin clica "Concluir Atendimento"
6. Próximo cliente é chamado automaticamente
7. **Tudo atualiza em tempo real!** ⚡

---

## 🆘 Troubleshooting

### Erro: "Address already in use"
A porta 3000 está sendo usada. Mude para outra:
```bash
PORT=8000 npm start
```

### Dados desapareceram
Os dados são salvos em `data/queue.json`. Você pode deletar esse arquivo para resetar:
```bash
rm data/queue.json
```

### Servidor não inicia
Verifique se o Node.js está instalado:
```bash
node --version
```

---

## 🎨 Personalizações Básicas

### Mudar Logo
Edite `public/index.html` e procure por "HARUYAMA" para trocar o nome

### Mudar Número de Mesas
No arquivo `server.js`, linha com `tables: 15`, altere 15 para o número desejado

### Mudar Cores
As cores estão nos estilos Tailwind CSS em cada arquivo HTML

---

## 📊 Arquivos de Dados

Os dados são salvos em `data/queue.json`:
```json
{
  "queue": [...clientes esperando...],
  "currentServing": {...cliente sendo atendido...},
  "nextNumber": 43,
  "occupiedTables": 8,
  "tables": 15
}
```

---

## 🚀 Próximos Passos

1. **Testar com vários clientes** - Abra múltiplas abas
2. **Usar em smartphone** - Acesse pelo IP
3. **Explorar o admin** - Teste todos os botões
4. **Customizar** - Mude cores, adicione seu logo

---

## ❓ Dúvidas Frequentes

**P: Como adicionar novos pratos?**
R: Edite `/menu` no arquivo `public/menu.html`

**P: Posso usar em produção?**
R: Para produção, recomenda-se usar um banco de dados real (MongoDB) em vez de JSON

**P: Funciona sem internet?**
R: Sim! Funciona perfeitamente em rede local

**P: Como salvar as informações dos clientes?**
R: Os dados são salvos automaticamente em `data/queue.json`

---

**Divirta-se!** 🍱✨

Para mais detalhes, abra `README.md`
