# 🚀 INSTRUÇÃO DE EXECUÇÃO - VS CODE

## Método 1: Terminal Integrado do VS Code

### Passo 1 - Abrir a Pasta no VS Code
```
1. Abra VS Code
2. File → Open Folder
3. Selecione: C:\Users\rikel\OneDrive\Documentos\GitHub\HARUYAMA
4. Clique em "Select Folder"
```

### Passo 2 - Abrir Terminal
```
1. Aperte: Ctrl + Ó (ou Ctrl + `)
2. Ou: View → Terminal

Você verá uma aba "TERMINAL" na parte inferior
```

### Passo 3 - Instalar Dependências
```bash
npm install
```

**Saída esperada:**
```
npm notice created a lockfile as package-lock.json
npm WARN notsup This OS is not supported or not yet supported by Node native
+ express@4.18.2
+ socket.io@4.5.4
+ cors@2.8.5
added 123 packages from 123 contributors

up to date in 2.3s
```

### Passo 4 - Iniciar Servidor
```bash
npm start
```

**Saída esperada:**
```
🍱 Haruyama Sushi - Servidor rodando em http://localhost:3000
📊 Painel Admin: http://localhost:3000/admin
```

### Passo 5 - Abrir no Navegador
```
1. Abra seu navegador (Chrome, Firefox, Edge)
2. Digite na barra de endereço: http://localhost:3000
3. Pronto! 🎉
```

---

## Método 2: PowerShell Separado

Se preferir usar PowerShell separado:

```bash
# 1. Navegue até a pasta
cd C:\Users\rikel\OneDrive\Documentos\GitHub\HARUYAMA

# 2. Instale dependências
npm install

# 3. Inicie o servidor
npm start
```

---

## ✅ Verificação Rápida

### O servidor está rodando?
```
Procure pela mensagem:
🍱 Haruyama Sushi - Servidor rodando em http://localhost:3000
```

### Parar o servidor
```
Aperte: Ctrl + C
```

### Reiniciar o servidor
```
1. Aperte: Ctrl + C
2. Digite: npm start
3. Pressione: Enter
```

---

## 🌐 Acessar as Páginas

Após o servidor iniciar, abra em abas diferentes:

| Página | URL |
|--------|-----|
| **Cliente - Fila** | http://localhost:3000 |
| **Cliente - Menu** | http://localhost:3000/menu |
| **Cliente - Status** | http://localhost:3000/status |
| **Cliente - Perfil** | http://localhost:3000/profile |
| **Admin - Painel** | http://localhost:3000/admin |

---

## 🧪 Teste Rápido (1 minuto)

1. Abra http://localhost:3000
2. Preencha: Nome="João", Pessoas="2"
3. Clique: "Entrar na Fila"
4. Você verá seu número!
5. Abra http://localhost:3000/admin em outra aba
6. Você verá a fila em tempo real!

---

## 📊 Extensões Recomendadas no VS Code

Para melhor desenvolvimento:

```
1. REST Client
2. Thunder Client
3. WebSocket Client
4. JSON Beautifier
5. Prettier
6. ES7+ React/Redux/React-Native
7. Tailwind CSS IntelliSense
```

---

## 🔍 Debugging no VS Code

### Abrir DevTools do Navegador
```
F12 (ou Ctrl + Shift + I)

Tabs importantes:
- Console: Ver erros/logs
- Network: Ver requisições
- Sources: Debugar JavaScript
- Application: Ver localStorage
```

### Ver Logs do Servidor
```
Você verá no terminal do VS Code cada evento:
- Cliente conectado
- Add to queue
- Queue update
- etc...
```

---

## 🆘 Erros Comuns

### Erro: "npm: comando não encontrado"
```
Solução: Node.js não está instalado
Faça download em: https://nodejs.org
Depois reinicie o VS Code
```

### Erro: "Address already in use"
```
Solução: Outra aplicação está usando a porta 3000
Opção 1: Feche a outra aplicação
Opção 2: Use outra porta:
PORT=8000 npm start
```

### Erro: "Cannot find module 'express'"
```
Solução: Dependências não instaladas
Execute: npm install
```

---

## 📝 Estrutura no VS Code

Você verá na sidebar esquerda:

```
HARUYAMA/
├─ node_modules/              (Não edite - pacotes)
├─ public/
│  ├─ index.html
│  ├─ menu.html
│  ├─ status.html
│  ├─ profile.html
│  └─ admin.html
├─ data/                      (Criado automaticamente)
│  └─ queue.json
├─ .gitignore
├─ package.json
├─ server.js
├─ README.md
├─ QUICK_START.md
├─ ESTRUTURA.md
├─ TESTE.md
└─ SUMARIO.md
```

---

## 🎨 Editar Código

### Para mudar cores
```
1. Abra: public/index.html (ou outro arquivo)
2. Procure por: "colors"
3. Mude os valores hex (ex: #5D4037)
4. Salve com: Ctrl + S
5. Recarregue o navegador: F5
```

### Para mudar nome
```
1. Abra: public/index.html
2. Procure por: "HARUYAMA"
3. Mude para seu nome
4. Salve
5. Recarregue o navegador
```

### Para adicionar prato no menu
```
1. Abra: public/menu.html
2. Procure por: <!-- Row 2 -->
3. Copie um bloco de prato
4. Mude nome, preço e descrição
5. Salve
6. Recarregue
```

---

## 💾 Salvar Arquivo

No VS Code:
```
Ctrl + S     = Salvar arquivo atual
Ctrl + Shift + S = Salvar como novo arquivo
Ctrl + K, Ctrl + W = Fechar arquivo
```

---

## 🔄 Recarregar Navegador

```
F5                = Recarregar página
Ctrl + Shift + R  = Recarregar ignorando cache
Ctrl + Shift + Delete = Limpar dados do site
```

---

## 🎓 Estrutura do Código

### server.js (Backend)
```javascript
const express = require('express');      // Framework HTTP
const io = require('socket.io');         // WebSockets
const app = express();                   // Aplicação
const server = http.createServer(app);   // Servidor HTTP

app.use(express.static('public'));       // Servir arquivos estáticos
app.get('/', ...);                       // Rotas HTTP
io.on('connection', ...);                // WebSocket listeners
server.listen(3000, ...);                // Iniciar servidor
```

### HTML (Frontend)
```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="/socket.io/socket.io.js"></script>
  </head>
  <body>
    <!-- Interface HTML -->
    <script>
      const socket = io();  // Conectar WebSocket
      // JavaScript lógica
    </script>
  </body>
</html>
```

---

## 📱 Testar em Mobile

### Via IP Local
```
1. Obtenha seu IP: ipconfig (Windows)
2. Procure: IPv4 Address (ex: 192.168.1.100)
3. No celular, abra: http://192.168.1.100:3000
4. Pronto!
```

---

## 🎯 Dicas Produtivas

### Comando Rápido
```
Ctrl + P = Procurar arquivo
Ctrl + Shift + P = Comando VS Code
Ctrl + L = Selecionar linha
Ctrl + D = Selecionar palavra
```

### Múltiplos Cursores
```
Ctrl + Alt + ↓ = Adicionar cursor abaixo
Ctrl + Alt + ↑ = Adicionar cursor acima
Alt + Click = Adicionar cursor ao clicar
```

### Formatar Código
```
Ctrl + Shift + F = Formatar documento
Ctrl + K, Ctrl + F = Formatar seleção
```

---

## 📚 Recursos Úteis

### Dentro do VS Code
```
Ctrl + Shift + X = Extensões
Ctrl + Shift + D = Debug
Ctrl + Shift + G = Git
Ctrl + J = Toggle Terminal
```

### Na Web
```
https://nodejs.org              = Node.js
https://expressjs.com           = Express
https://socket.io               = Socket.io
https://tailwindcss.com         = Tailwind CSS
```

---

## ✨ Enjoy!

Agora você tem tudo pronto:

```
✅ Projeto estruturado
✅ Código limpo
✅ Documentação completa
✅ Servidor rodando
✅ Interface bonita
✅ Sincronização em tempo real
```

**Divirta-se desenvolvendo!** 🍱🚀

---

**Próxima etapa:** Abra http://localhost:3000 e comece a testar!
