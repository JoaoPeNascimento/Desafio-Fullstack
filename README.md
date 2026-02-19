# Desafio Técnico - Full-Stack

Este projeto é uma aplicação de gestão e consulta de imóveis, desenvolvida como parte de um desafio técnico. A solução utiliza uma arquitetura moderna com **Java 21 (Spring Boot)** no backend e **React (TypeScript)** no frontend, totalmente containerizada com **Docker**.

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 21**
- **Spring Boot 3.x**
- **Spring Security + JWT** (Autenticação e Autorização)
- **PostgreSQL** (Banco de dados)
- **Hibernate/JPA** & **Jakarta Validation**
- **JUnit 5 & Mockito** (Testes)

### Frontend
- **React 19 + TypeScript**
- **CRA**
- **Zustand** (Gerenciamento de Estado)
- **React Router Dom** (Roteamento)
- **Material UI / CSS Modules** (Estilização)

### Infraestrutura
- **Docker & Docker Compose**

---

## 📋 Funcionalidades

O sistema conta com controle de acesso baseado em perfis (**RBAC**):

1.  **Administrador**: Gerencia usuários (corretores/admins) e imóveis.
2.  **Corretor**: Gerencia seus próprios imóveis.
3.  **Cliente**: Consulta, filtra e favorita imóveis.

### Principais Recursos
- Login e Registro com autenticação JWT.
- CRUD de Imóveis (Criar, Editar, Visualizar, Inativar).
- Listagem com Paginação e Filtros (Preço, Quartos, Tipo).
- Upload de imagens (Integração configurada).

---

## 🛠️ Como Executar o Projeto

A maneira mais simples de rodar a aplicação é utilizando o Docker Compose, que orquestra o Banco de Dados, o Backend e o Frontend.

### Pré-requisitos
- Docker e Docker Compose instalados.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/joaopenascimento/desafio-fullstack.git](https://github.com/joaopenascimento/desafio-fullstack.git)
   cd desafio-fullstack

2. **Suba a aplicação:** 
Na raiz do projeto (onde está o arquivo docker-compose.yml), execute:
```Bash
docker-compose up --build
```

Aguarde alguns instantes. O Backend aguardará o Banco de Dados estar saudável antes de iniciar.

3. **Acesse a aplicação:**
- Frontend: http://localhost:80 (ou http://localhost:3000 se rodar localmente fora do docker)
- Backend API: http://localhost:8080

### 📋 Credenciais de Acesso para Testes
Para facilitar a validação das funcionalidades do sistema, o banco de dados foi populado com usuários pré-cadastrados representando os três níveis de acesso (roles) exigidos:

1. Administrador (Role: ADMIN)

- Permissões: Criar novos usuários (admins/corretores), cadastrar e gerenciar qualquer imóvel.

- E-mail: admin@imobiliaria.com

- Senha: 123456

2. Corretor (Role: CORRETOR)

- Permissões: Cadastrar novos imóveis e gerenciar apenas os imóveis criados por ele.

- E-mail: corretor@imobiliaria.com

- Senha: 123456

3. Cliente (Role: CLIENTE)

- Permissões: Apenas visualizar imóveis, filtrar e favoritar.

- E-mail: cliente@gmail.com

- Senha: 123456

## 📚 Documentação da API (Swagger)

A aplicação possui documentação interativa gerada automaticamente via **Swagger UI**. Após iniciar o backend, você pode acessar:

- **Interface Visual (Swagger UI):** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Documentação JSON (OpenAPI):** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

> **Nota:** Para testar os endpoints protegidos, utilize o botão **Authorize** no topo da página do Swagger e insira o token JWT retornado na rota de `/login` (formato: `Bearer <seu_token>`).

## 🧪 Executando Testes (Opcional)Caso queira executar os testes unitários e de integração do Backend separadamente:
```Bash
cd backend
./mvnw test
```

## ⚙️ Variáveis de Ambiente
Para facilitar a execução e a avaliação técnica deste desafio, as variáveis de ambiente e credenciais sensíveis foram definidas explicitamente nos arquivos de configuração (como o docker-compose.yml). Em um ambiente de produção real, essas informações jamais seriam versionadas no repositório, devendo ser injetadas de maneira segura.
