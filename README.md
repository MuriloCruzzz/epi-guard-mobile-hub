# EPI Guard Mobile Hub 🛡️

Sistema móvel para gestão e controle de Equipamentos de Proteção Individual (EPIs) desenvolvido com React e TypeScript.

## 📱 Sobre o Projeto

O EPI Guard Mobile Hub é uma aplicação web responsiva que permite aos usuários:
- **Solicitar EPIs** de forma simplificada
- **Avaliar equipamentos** recebidos
- **Gerenciar perfil** de usuário
- **Visualizar dashboard** com estatísticas
- **Receber notificações** sobre status de solicitações
- **Acompanhar histórico** de itens

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Responsive Design**: Mobile-first approach

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Git

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/MuriloCruzzz/epi-guard-mobile-hub.git
cd epi-guard-mobile-hub
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Execute o projeto
```bash
npm run dev
# ou
yarn dev
```

### 4. Acesse a aplicação
Abra [http://localhost:5173](http://localhost:5173) no seu navegador

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── Header.tsx      # Cabeçalho da aplicação
│   ├── SideMenu.tsx    # Menu lateral
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── Dashboard.tsx   # Página principal
│   ├── Login.tsx       # Autenticação
│   └── ...
├── contexts/           # Contextos React
│   ├── AuthContext.tsx # Contexto de autenticação
│   └── DataContext.tsx # Contexto de dados
├── hooks/              # Hooks customizados
├── types/              # Definições de tipos TypeScript
└── lib/                # Utilitários e configurações
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 📱 Funcionalidades Principais

### 🔐 Autenticação
- Login com credenciais
- Recuperação de senha
- Perfil de usuário

### 📊 Dashboard
- Visão geral de EPIs
- Estatísticas de consumo
- Status de solicitações

### 📝 Solicitações
- Formulário de solicitação de EPIs
- Upload de imagens
- Acompanhamento de status

### ⭐ Avaliações
- Sistema de avaliação por estrelas
- Comentários sobre equipamentos
- Histórico de avaliações

### 🔔 Notificações
- Sistema de notificações em tempo real
- Alertas sobre status de solicitações

## 🎨 Design System

O projeto utiliza o shadcn/ui como base de componentes, garantindo:
- Consistência visual
- Acessibilidade
- Responsividade
- Tema escuro/claro

## 📱 Responsividade

Desenvolvido com abordagem mobile-first, garantindo excelente experiência em:
- Smartphones
- Tablets
- Desktops

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Murilo Cruz** - [GitHub](https://github.com/MuriloCruzzz)

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do GitHub ou abra uma issue no repositório.

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
