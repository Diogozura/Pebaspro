# PebasPro - Plataforma de Conexão entre Empresas e Profissionais

Sistema web desenvolvido com **Next.js + TypeScript + Firebase + Material UI**, hospedado na Vercel.  
Conecta empresas que oferecem vagas a profissionais que buscam oportunidades de trabalho.

## 🔗 Acesso ao Sistema (produção)

- 🌐 URL pública: [https://www.pebaspro.com.br/](https://www.pebaspro.com.br/)

---

## ⚙️ Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase (Firestore, Auth)](https://firebase.google.com/)
- [Material UI](https://mui.com/)
- [Vercel](https://vercel.com/)

---

## 🧪 Executando o Projeto Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Diogozura/Pebaspro
cd pebaspro
```

### 2.  Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
Crie um arquivo .env.local na raiz do projeto com as chaves do Firebase:

env
Copiar
Editar

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

```

### 4. Inicie o servidor local
```bash
npm run dev

O sistema ficará disponível em http://localhost:3000.
```

### ☁️ Configuração do Firebase
```bash
| Recurso        | Descrição                                      |
| -------------- | ---------------------------------------------- |
| Firestore      | Armazenamento de usuários, vagas, candidaturas |
| Authentication | Login com Google e WhatsApp                    |
| Storage        | (opcional) Fotos de perfil de usuários         |

```

### 4. Inicie o servidor local
```bash
npm run dev

O sistema ficará disponível em http://localhost:3000.
```

### Estrutura do Firestore
```bash
- usuarios/: dados de empresas e profissionais

- vagas/: lista de vagas criadas

    - vagas/{id}/candidaturas/: subcoleção com os candidatos de cada vaga

- usuarios/{uid}/candidaturas/: vagas às quais o profissional se candidatou

```

### 🧭 Funcionalidades
```bash
Para profissionais:
-- Cadastro com Google
-- Edição de perfil (área de atuação, salário/hora, sobre mim, certificações)
-- Candidatura a vagas
-- Acompanhamento das vagas que se candidatou

Para empresas:
-- Criação e gerenciamento de vagas
-- Visualização de candidatos por vaga
-- Acesso ao perfil dos profissionais interessados

```

### 🚀 Publicação (Vercel)
```bash
1 Crie uma conta no Vercel

2 Clique em "New Project" e importe o repositório do GitHub

3 Defina as variáveis de ambiente .env.local no painel do projeto

4 Clique em Deploy

```

### 🛠 Manutenção
```bash
Para editar o site: use o painel do Firebase e as rotas protegidas.

Para atualizar o sistema: qualquer desenvolvedor Next.js pode continuar o trabalho.

Para suporte ou dúvidas: [diogozura@gmail.com]

```

