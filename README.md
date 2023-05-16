
# Projeto Almoxarifado TDD

Este é um projeto de um sistema de almoxarifado feito em NextJS utilizando Jest para realizar os testes.


## MySQL Workbench Setup

Primeiramente, é necessário ter instalado o MySQL Workbench.

Agora, crie um banco de dados com o nome que preferir, após isso abra a pasta sql contida no projeto e importe as tabelas para o banco de dados que você criou.


## NextJS Setup
Agora, abra o projeto no VsCode. Lembrando que o NodeJS deve estar instalado em sua máquina.

Dito isso, rode o seguinte comando:
```
npm install
```

Após todas as dependências terem sido baixadas, abra o arquivo .env e configure-o de acordo com seu ambiente.

Por exemplo:

No exemplo abaixo, o nome do meu usuário é __root__, minha senha é __123456__ e o nome do meu banco de dados que eu criei foi __almoxarifadodb__

![image](https://github.com/ThiagoArndt/logistic-app/assets/89104471/df93da8e-a584-4add-99b1-1385a1f91b86)

Após configurar o .env, rode o seguinte comando:

```
npx prisma init
```

E depois:

```
npx primsa db pull
```

Isso irá gerar uma model para campo de cada tabela em seu banco de dados.

## Rodando os Testes

Dentro do projeto existe uma pasta chamada: `__test__` que contém todos os testes referentes as regras de negócio do usuário e do fornecedor.

Como são utilizados endpoints para testar, o arquivo: `__test__/utils/integration-test-hooks.ts` contém uma função que roda o servidor na porta 3001, a qual é fechada após o teste ser rodado.

Outra coisa que deve ser pontuada, é que cada teste deve ser rodado individualmente, pois o Jest, por padrão, roda todos os testes de forma paralela, ocasionando em problemas.

Para resolver esse problema, fiz scripts no `package.json` que rodam cada teste individualmente.

Código dos scripts:

![image](https://github.com/ThiagoArndt/logistic-app/assets/89104471/295c5414-2bb4-4f97-acbe-b3df97f89e52)

Ou seja, caso queira testar a função de registro de usuário, basta rodar o seguinte comando:

```
npm run test:auth/register
```

E caso queira testar outra funcionalidade, basta rodar algum dos comandos que começam com o prefixo __test:__ nos scripts.

E claro, lembrando que caso o comando "npm run test" seja rodado, os testes resultaram em erro pois serão rodados em paralelo.

