# 🧪 Guia de Testes - Haruyama Sushi

## 🎬 Teste Completo (5 minutos)

### Preparação
```bash
npm install
npm start
```

Aguarde:
```
🍱 Haruyama Sushi - Servidor rodando em http://localhost:3000
📊 Painel Admin: http://localhost:3000/admin
```

---

## ✅ Teste 1: Cliente Entra na Fila

### Passo 1 - Abrir Página de Entrada
```
URL: http://localhost:3000
```

### Passo 2 - Preencher Formulário
- [ ] Nome: "João Silva"
- [ ] Pessoas: "4"
- [ ] Clique em "Entrar na Fila"

### Resultado Esperado
```
✅ Desaparece formulário
✅ Aparece número (#1)
✅ Mensagem: "Seu Número"
✅ Botão "Novo Cadastro"
```

---

## ✅ Teste 2: Verificar em Múltiplas Abas

### Passo 1 - Abrir Nova Aba
```
URL: http://localhost:3000/status
```

### Resultado Esperado
```
✅ Mostra: Número #1
✅ Mostra: Posição 1º
✅ Mostra: Tempo ~10 min
✅ Barra de progresso: 0% (nenhuma mesa ocupada)
```

### Passo 2 - Abrir Outra Aba e Entrar na Fila
```
URL: http://localhost:3000
Nome: "Maria Santos"
Pessoas: "2"
```

### Resultado Esperado
```
✅ Primeira aba mostra: Número #2
✅ Segunda aba (status) já mostra: Posição 2º
✅ Fila sincroniza instantaneamente!
```

---

## ✅ Teste 3: Acessar Menu

### Passo 1 - Abrir Cardápio
```
URL: http://localhost:3000/menu
```

### Resultado Esperado
```
✅ Página carrega com pratos
✅ Vê: "Omakase Haru" (assinatura)
✅ Vê: "Sake Nigiri - R$ 42"
✅ Vê: "Yama Shoyu - R$ 68"
✅ Abas de categorias: SUSHI, RAMEN, ENTRADAS, etc
✅ Navegação mobile funciona
```

---

## ✅ Teste 4: Perfil do Cliente

### Passo 1 - Abrir Perfil
```
URL: http://localhost:3000/profile
```

### Resultado Esperado
```
✅ Mostra: "João Silva" (nome inserido)
✅ Estatísticas:
   - Visitas: 1
   - Pontos: 0
   - Nível: Bronze
✅ Preferências com toggles
✅ Pratos favoritos listados
```

---

## ✅ Teste 5: Painel Administrativo

### Passo 1 - Abrir Admin
```
URL: http://localhost:3000/admin
```

### Resultado Esperado
```
✅ Carrega Dashboard
✅ Mostra:
   - Pessoas na Fila: 2
   - Mesas Ocupadas: 0/15
   - Atendendo: Ninguém
   - Tempo Médio: ~25 min
✅ Sidebar com Menu
✅ Botões de ação visíveis
```

### Passo 2 - Chamar Próximo Cliente
```
[ CLIQUE ] "Chamar Próximo"
```

### Resultado Esperado
```
✅ Alerta: "Próximo cliente chamado!"
✅ Admin mostra:
   - Atendendo: #1
   - Pessoas na Fila: 1
✅ Cliente vê notificação em tempo real
✅ Barra de progresso muda
```

### Passo 3 - Concluir Atendimento
```
[ CLIQUE ] "Concluir Atendimento"
```

### Resultado Esperado
```
✅ Alerta: "Atendimento concluído!"
✅ Mesas Ocupadas: 1/15
✅ Atendendo: Ninguém (pronto para próximo)
✅ Cliente #1 não está mais na fila
```

### Passo 4 - Chamar Próximo Novamente
```
[ CLIQUE ] "Chamar Próximo"
```

### Resultado Esperado
```
✅ Atendendo: #2
✅ Pessoas na Fila: 0
✅ Cliente #2 é chamado
```

---

## ✅ Teste 6: Gerenciar Fila (Tab)

### Passo 1 - Clicar em "Gerenciar Fila"
```
Menu Sidebar → Gerenciar Fila
```

### Resultado Esperado
```
✅ Lista todos os clientes esperando
✅ Cada entrada mostra:
   - #2
   - Maria Santos - 2 pessoas
   - Posição: 1º
   - ~10 min de espera
```

---

## ✅ Teste 7: Controle de Mesas (Tab)

### Passo 1 - Clicar em "Mesas"
```
Menu Sidebar → Mesas
```

### Resultado Esperado
```
✅ Grid 5x3 com 15 mesas
✅ Cores:
   - Verdes: Livres (0)
   - Vermelhas: Ocupadas (1 - onde #1 está)
✅ Labels: "Mesa 1", "Mesa 2", etc
```

---

## ✅ Teste 8: Sincronização em Tempo Real

### Passo 1 - Abrir 3 Navegadores
```
Aba 1: http://localhost:3000 (CLIENTE)
Aba 2: http://localhost:3000/status (CLIENTE)
Aba 3: http://localhost:3000/admin (ADMIN)
```

### Passo 2 - Entrar na Fila (Aba 1)
```
Nome: "Pedro Costa"
Pessoas: "5"
```

### Resultado Esperado
```
✅ Aba 1: Mostra número
✅ Aba 2: Atualiza fila
✅ Aba 3: Admin vê atualização INSTANTÂNEA
⚡ Sem delay! Sem refresh!
```

### Passo 3 - Admin Chama Próximo
```
Aba 3: Clique "Chamar Próximo"
```

### Resultado Esperado
```
✅ Aba 1: Recebe notificação
✅ Aba 2: Vê sua posição mudar
✅ Aba 3: Dashboard atualiza
⚡ TUDO sincronizado em tempo real!
```

---

## ✅ Teste 9: Responsividade Mobile

### Passo 1 - Redimensionar Navegador
```
F12 → Toggle Device Toolbar → iPhone 12
```

### Resultado Esperado
```
✅ Layout se adapta
✅ Menu hamburger funciona
✅ Bottom navigation mostra
✅ Formulário legível
✅ Ícones aparecem corretamente
```

### Passo 2 - Testar Navegação
```
[ CLIQUE ] Ícone "Fila"     → /
[ CLIQUE ] Ícone "Menu"    → /menu
[ CLIQUE ] Ícone "Status"  → /status
[ CLIQUE ] Ícone "Perfil"  → /profile
```

### Resultado Esperado
```
✅ Todas as páginas carregam
✅ Transições suaves
✅ Todos os botões funcionam
✅ Nenhuma quebra de layout
```

---

## ✅ Teste 10: Persistência de Dados

### Passo 1 - Verificar Arquivo
```
Abra: data/queue.json
```

### Resultado Esperado
```json
✅ Arquivo existe
✅ Contém:
{
  "queue": [...clientes...],
  "currentServing": {...},
  "nextNumber": 3,
  "tables": 15,
  "occupiedTables": 1
}
```

### Passo 2 - Reiniciar Servidor
```bash
Ctrl+C (para o servidor)
npm start (reinicia)
```

### Resultado Esperado
```
✅ Dados são carregados
✅ Fila permanece (não zera)
✅ Números continuam de onde pararam
✅ Mesas mantêm status
```

---

## ✅ Teste 11: Navegação Mobile

### Passo 1 - Menu Hamburger
```
[ CLIQUE ] Ícone Menu (topo esquerdo)
```

### Resultado Esperado
```
✅ Menu desliza para baixo
✅ Mostra: Fila, Menu, Status, Perfil
✅ Estilo Material Design
✅ Fecha ao clicar em item
```

---

## ✅ Teste 12: Validações

### Passo 1 - Deixar Nome Vazio
```
Nome: [vazio]
Pessoas: "2"
[ CLIQUE ] "Entrar na Fila"
```

### Resultado Esperado
```
✅ Campo fica vermelho/destacado
✅ Mensagem de erro aparece
✅ Não envia para fila
```

### Passo 2 - Tentar Número Inválido
```
Pessoas: "0"
```

### Resultado Esperado
```
✅ Não permite (mín: 1)
✅ Não permite (máx: 10)
```

---

## ✅ Teste 13: Transições e Animações

### Resultado Esperado
```
✅ Barra de progresso (admin) se move suavemente
✅ Botões têm hover effect
✅ Ícones giram/mudam
✅ Cores transitam suavemente
✅ Nenhuma transição abrupta
```

---

## ✅ Teste 14: Compatibilidade de Navegadores

Testar em:
- [ ] Chrome/Edge ✅
- [ ] Firefox ✅
- [ ] Safari ✅
- [ ] Mobile Safari ✅
- [ ] Chrome Mobile ✅

### Resultado Esperado
```
✅ Funciona em todos
✅ WebSockets funcionam
✅ CSS renderiza correto
✅ JS executa sem erros
```

---

## ✅ Teste 15: Performance

### Passo 1 - Abrir DevTools (F12)
```
Console → Verificar erros
Network → Ver requisições
Performance → Medir speed
```

### Resultado Esperado
```
✅ Sem erros vermelhos
✅ WebSocket conectado
✅ Requisições rápidas
✅ Página carrega < 2s
```

---

## 🐛 Problemas Comuns e Soluções

| Problema | Solução |
|----------|---------|
| WebSocket não conecta | Verifique firewall / Port 3000 aberta |
| Dados não sincronizam | Atualize página (F5) |
| Arquivo JSON não existe | Reinicie servidor (cria automaticamente) |
| Porta 3000 em uso | Use `PORT=8000 npm start` |
| CSS não carrega | Verifique Tailwind no `<script>` |
| Ícones não aparecem | Verifique link do Google Fonts |

---

## 📊 Métricas de Sucesso

Quando **TODOS** estes testes passarem ✅:

```
✅ Clientes podem entrar na fila
✅ Números são gerados corretamente
✅ Admin gerencia a fila
✅ Sincronização em tempo real funciona
✅ Layout é responsivo
✅ Dados persistem
✅ Sem erros no console
✅ WebSocket funciona
✅ Múltiplos clientes simultâneos
✅ Performance é boa
```

## 🎉 Parabéns!

Se todos os testes passaram, você tem um **sistema funcional e pronto para produção!**

---

## 🚀 Próximas Melhorias para Testar

- [ ] Adicionar notificações som
- [ ] Integrar SMS/WhatsApp
- [ ] Adicionar sistema de cupons
- [ ] Dashboard com gráficos
- [ ] Exportar relatórios
- [ ] Integrar com POS
- [ ] Análise de dados

---

**Bom teste!** 🧪✨
