<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Implementar api de marketplace conforme documentação abaixo

https://rocketseat-mba-marketplace.apidocumentation.com/referencehttps://rocketseat-mba-marketplace.apidocumentation.com/reference

## Funcionalidades e Regras

- [X]  Deve ser possível cadastrar novos usuários
    - [X]  Deve ser feito o hash da senha do usuário
    - [X]  Não deve ser possível cadastrar usuário com e-mail duplicado
    - [X]  Não deve ser possível cadastrar usuário com telefone duplicado
- [X]  Deve ser possível atualizar os dados do usuário
    - [X]  Deve ser feito o hash da senha do usuário
    - [X]  Não deve ser possível atualizar para um e-mail duplicado
    - [X]  Não deve ser possível atualizar para um telefone duplicado
- [X]  Deve ser possível obter o token de autenticação
    - [X]  Não deve ser possível se autenticar com credenciais incorretas
- [ ]  Deve ser possível realizar o upload de arquivos
- [ ]  Deve ser possível criar e editar um Produto
    - [ ]  Deve ser possível armazenar o valor do produto em centavos
    - [ ]  Não deve ser possível criar/editar um Produto com um usuário inexistente
    - [ ]  Não deve ser possível criar/editar um Produto com uma categoria inexistente
    - [ ]  Não deve ser possível criar/editar um Produto com imagens inexistentes
    - [ ]  Não deve ser possível editar um Produto inexistente
    - [ ]  Não deve ser possível alterar um Produto de outro usuário
    - [ ]  Não deve ser possível editar um Produto já vendido
- [ ]  Deve ser possível obter dados de um Produto
    - [ ]  Qualquer usuário deve poder obter dados do Produto
- [X]  Deve ser possível listar todas as categorias
    - [X]  Qualquer usuário deve poder obter a lista de categorias
- [ ]  Deve ser possível listar todos os produtos por ordem de criação (mais recente)
    - [ ]  Qualquer usuário deve poder obter a lista de produtos
    - [ ]  Deve ser possível realizar paginação pela lista de produtos
    - [ ]  Deve ser possível filtrar pelo Status
    - [ ]  Deve ser possível buscar pelo título ou pela descrição do produto
- [ ]  Deve ser possível listar todos os produtos de um usuário
    - [ ]  Não deve ser possível listar os produtos de um usuário inexistente
    - [ ]  Deve ser possível filtrar pelo Status
    - [ ]  Deve ser possível buscar pelo título ou pela descrição do produto
- [ ]  Deve ser possível alterar o Status do Produto
    - [ ]  Não deve ser possível alterar o Status de um Produto com um usuário inexistente
    - [ ]  Não deve ser possível alterar o Status de um Produto inexistente
    - [ ]  Não deve ser possível alterar o Status de um Produto de outro usuário
    - [ ]  Não deve ser possível marcar como Cancelado um Produto já Vendido
    - [ ]  Não deve ser possível marcar como Vendido um Produto Cancelado
- [ ]  Deve ser possível obter informações do perfil de um usuário
    - [ ]  Não deve ser possível obter informações do perfil de um usuário inexistente
    - [ ]  Não deve ser possível obter a senha do usuário
- [ ]  Deve ser possível registrar uma visualização em um produto
    - [ ]  Não deve ser possível registrar uma visualização em um produto inexistente
    - [ ]  Não deve ser possível registrar uma visualização de um usuário inexistente
    - [ ]  Não deve ser possível registrar uma visualização do próprio dono do produto
    - [ ]  Não deve ser possível registrar uma visualização duplicada
- [ ]  Métricas
    - [ ]  Não deve ser possível obter métricas de usuários inexistentes
    - [ ]  Deve ser possível obter a métrica de produtos vendidos nos últimos 30 dias
    - [ ]  Deve ser possível obter a métrica de produtos disponíveis nos últimos 30 dias
    - [ ]  Deve ser possível obter a métrica de visualizações nos últimos 30 dias
    - [ ]  Deve ser possível obter a métrica de visualizações por dia dos últimos 30 dias
    - [ ]  Deve ser possível obter a métrica de visualizações de um produto nos últimos 7 dias

## Conceitos que serão praticados aqui:

- Repository Pattern
- Inversão e Injeção de dependências
- Segregação de Interfaces
- DDD
- SOLID
- Clean Architecture
- Autenticação
- Functional Error Handling
- Upload de arquivos

## Tecnologias que esperamos que utilizem no projeto:

- NestJS
- Zod
- Prisma
- JWT
- Bcrypt

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
