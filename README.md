<p align="right">
  <img src="https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs" />
  <img src="https://img.shields.io/badge/release-1.5.0-blue" />
</p>
<p align="center">
  <img src="https://i.imgur.com/ShZhcXw.png" />
</p>
<br>

<h1 align="center">Compass: Desafio Final</h1>
<p align="center">
  Este projeto faz parte do programa de bolsa de estudo da <a href="https://compass.uol/">Compass UOL</a> <br>
  O desafio consiste em fazer uma API REST com os consteúdos aprendidos ao longo da bolsa.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Vscode-2496ED?style=for-the-badge&logo=visualstudio&logoColor=blue&color=white">
</p>

## 📖 Indíce

- [Clonando repositório](#clonando-repositorio)
- [Configurando variáveis de ambiente](#configurando-variaveis-de-ambiente)
- [Iniciando o servidor](#iniciando-o-servidor)
  - [Desenvolvimento](#iniciando-o-servidor/desenvolvimento)
  - [Produção](#iniciando-o-servidor/producao)
- [Utilizando Docker](#utilizando-docker)
- [Executando Testes](#executando-testes)
- [Rotas](#routes)
  - [Car](#routes/car)
  - [People](#routes/people)
  - [Autheticante](#routes/authenticate)
___
<a name="clonando-repositorio"></a>
## 📥 Clonando repositório

O primeiro passo para subir a aplicação localmente é clonando o repositório em sua máquina. <br>
Com o [Git](https://git-scm.com/) instalado na sua máquina, você pode executar o seguinte comando no terminal:

```bash
git clone https://github.com/diogo-alexandre/compass-desafio-final.git && cd compass-desafio-final
```
Após isso, você tem uma cópia do repositório em sua máquina. <br>
Caso não tenha o `git` instalado, será necessário acessar o [repositório](https://github.com/diogo-alexandre/compass-desafio-final) e baixa-lo manualmente.
___
<a name="configurando-variaveis-de-ambiente"></a>
## ⚙️ Configurando variáveis de ambiente

Seguindo adiante, é antes de rodar a aplicação é necessário configurar as variáveis de ambiente. <br>
Crie na raiz do projeto um arquivo `.env`, ele precisa ter as seguintes variáveis:

> Estas são variáveis obrigatórias, são necessárias para que a aplicação funcione de maneira correta.

```bash
# Porta em que a aplicação irá iniciar.
# Em caso de utilizar docker, essa variável é obrigatória.
PORT=3000

# URI para que o app se comunique com o MongoDB.
DB_URI=mongodb://mongo/desafio-final

# Uma chave para geração de token JWT.
SECRET=segredo
```

Existem também as variáveis de configuração do docker-compose, do serviço MongoDB. <br>
Elas são `opcionais`, não sendo necessário passa-las no arquivo `.env`. Em caso de alteração, é necessário alterar a variável `DB_URI` também.

```bash
# Configura o nome de usuário.
DB_USER=admin

# Coloca uma senha para autenticação.
DB_PASS=12345

# Modifica a porta do MongoDB
DB_PORT=27017
```
___
<a name="iniciando-o-servidor"></a>
## ▶️ Iniciando o servidor

Depois de ter o `.env` configurado corretamente, é possível iniciar o app.

> Caso utilize Docker, pule para seção: [Utilizando Docker](#utilizando-docker)

Existem dois ambientes para iniciar o aplicativo:
  - [Desenvolvimento](#iniciando-o-servidor/desenvolvimento)
  - [Produção](#iniciando-o-servidor/producao)


<a name="iniciando-o-servidor/desenvolvimento"></a>
### 🔧 Desenvolvimento
A aplicação roda localmente, escutando as modificações nos arquivos e reiniciando o serviço a cada modificação. <br>
Por isso não é ideál executar este comando em produção.


Para executar a aplicação, execute o seguinte comando na linha de comando:
```bash
npm run start:dev
```
<a name="iniciando-o-servidor/producao"></a>
### 📦 Produção
Antes de executa o app em modo produção, é necessário fazer o build. <br>
A aplicação será compilada para arquivos `Javascript`.
```bash
npm run build
```

Após isso, execute o seguinte comando para iniciar o serviço:
```bash
npm run start
```
___
<a name="utilizando-docker"></a>
## 🚢 Utilizando Docker
É possível utilizar a aplicação com o [Docker](https://www.docker.com/). <br>
Para iniciar o app com o Docker, segue o mesmo raciocínio da seção [Iniciando o Servidor](#iniciando-o-servidor) <br>

Primeiro, certifique-se de ter o [Docker Compose](https://docs.docker.com/compose/install/) na sua máquina. <br>
Em seguida, para o ambiente de desenvolvimento, existem os seguintes comandos:
```bash
# Subir a aplicação
npm run docker:up:dev

# Derrubar os containers
npm run docker:down:dev
```

E em ambiente de produção, você pode executar:
```bash
# Fazer o build e subir a aplicação
npm run docker:up

# Derrubar os containers
npm run docker:down
```
___
<a name='executando-testes'></a>
## 🧪 Executando Testes

O App atualmente utiliza de teste de feature para verificar a integridade do serviço. <br>
Você pode testar a aplicação com o comando:
```bash
npm run test:e2e
```

Caso queira utilizar o Docker para fazer o teste, é necessário obter o id do container do app:
```bash
docker ps
```

Em seguida, você deve rodar o comando de teste dentro do container:
```bash
docker exec <id-do-container> npm run test:e2e
```

> O teste utiliza banco em memória, não sendo necessário a env DB_URI para executalo.
___
<a name="routes"></a>
## 🗺️ Rotas

O app usa como caminha base `/api/v1`

<a name="routes/car"></a>
### Car

#### <img src="https://img.shields.io/badge/-GET-green"/>&ensp;<sup>`/car` - Retorna todos carros</sup>
Query Params:
```jsonc
{
  modelo: "string"
  cor: "string",
  ano: "string",
  acessorios: "array",
  quantidadePassageiros: "number",
  limit: "number",
  offset: "number"
}

```

Repostas:
<details>
  <summary>200 - OK</summary>

  ```jsonc
  {
    "veiculos": [
      {
        "_id": "123",
        "modelo": "GM S10 2.8",
        "cor": "branco",
        "ano": "2021",
        "acessorios": [
          { "descricao": "Ar-condicionado" },
          { "descricao": "Dir. Hidráulica" },
          { "descricao": "Cabine Dupla" },
          { "descricao": "Tração 4x4" },
          { "descricao": "4 portas" },
          { "descricao": "Diesel" },
          { "descricao": "Air bag" },
          { "descricao": "ABS" }
          ],
        "quantidadePassageiros": 5
      },
      ...
    ],
    "total": 3464,
    "limit": 100,
    "offset": 1,
    "offsets": 35
  }
  ```
</details>

<details>
  <summary>400 - Bad Request</summary>

  ```jsonc
  {
    "name": "Bad Request",
    "details": [
      {
        "message": "..."
      },
      ...
    ]
  }
  ```
</details>
<br>

#### <img src="https://img.shields.io/badge/-GET-green"/>&ensp;<sup>`/car/{id}` - Encontra um carro pelo `id`</sup>
Query Params:
```js
id: "string"
```

Respostas:
<details>
  <summary>200 - OK</summary>

  ```jsonc
  {
    "_id": "123",
    "modelo": "GM S10 2.8",
    "cor": "branco",
    "ano": "2021",
    "acessorios": [
      { "descricao": "Ar-condicionado" },
      { "descricao": "Dir. Hidráulica" },
      { "descricao": "Cabine Dupla" },
      { "descricao": "Tração 4x4" },
      { "descricao": "4 portas" },
      { "descricao": "Diesel" },
      { "descricao": "Air bag" },
      { "descricao": "ABS" }
    ],
    "quantidadePassageiros": 5
  }
  ```
</details>

<details>
  <summary>400 - Bad Request</summary>

  ```jsonc
  {
    "name": "Bad Request",
    "details": [
      {
        "message": "..."
      },
      ...
    ]
  }
  ```
</details>

<details>
  <summary>404 - Bad Request</summary>

  ```jsonc
  {
    "name": "Bad Request",
    "details": [{
      "message": "Cannot find car with id = ${id}"
    }]
  }
  ```
</details>
<br>

#### <img src="https://img.shields.io/badge/-POST-yellow"/>&ensp;<sup>`/car` - Cria um carro</sup>
Body Request:
```jsonc
// Todos os campos são obrigatórios
{
  "modelo": "GM S10 2.8",
  "cor": "branco",
  "ano": "2021",
  "acessorios": [
    { "descricao": "Ar-condicionado" },
    { "descricao": "Dir. Hidráulica" },
    { "descricao": "Cabine Dupla" },
    { "descricao": "Tração 4x4" },
    { "descricao": "4 portas" },
    { "descricao": "Diesel" },
    { "descricao": "Air bag" },
    { "descricao": "ABS" }
  ],
  "quantidadePassageiros": 5
}
```

Respostas:
<details>
  <summary>201 - Created</summary>

  ```jsonc
  {
    "_id": "123",
    "modelo": "GM S10 2.8",
    "cor": "branco",
    "ano": "2021",
    "acessorios": [
      { "descricao": "Ar-condicionado" },
      { "descricao": "Dir. Hidráulica" },
      { "descricao": "Cabine Dupla" },
      { "descricao": "Tração 4x4" },
      { "descricao": "4 portas" },
      { "descricao": "Diesel" },
      { "descricao": "Air bag" },
      { "descricao": "ABS" }
    ],
    "quantidadePassageiros": 5
  }
  ```
</details>

<details>
  <summary>400 - Bad Request</summary>

  ```jsonc
  {
    "name": "Bad Request",
    "details": [
      {
        "message": "..."
      },
      ...
    ]
  }
  ```
</details>

<details>
  <summary>404 - Not Found</summary>

  ```jsonc
  {
    "name": "Not Found",
    "details": [{
      "message": "Cannot find car with id = ${id}"
    }]
  }
  ```
</details>
<br>

#### <img src="https://img.shields.io/badge/-PUT-blue"/>&ensp;<sup>`/car/{id}` - Atualiza um carro</sup>
Query Params:
```js
id: "string"
```

Body Request:
```jsonc
// Todos os campos são obrigatórios
{
  "modelo": "GM S10 2.8",
  "cor": "branco",
  "ano": "2021",
  "acessorios": [
    { "descricao": "Ar-condicionado" },
    { "descricao": "Dir. Hidráulica" },
    { "descricao": "Cabine Dupla" },
    { "descricao": "Tração 4x4" },
    { "descricao": "4 portas" },
    { "descricao": "Diesel" },
    { "descricao": "Air bag" },
    { "descricao": "ABS" }
  ],
  "quantidadePassageiros": 5
}
```

Respostas:
<details>
  <summary>204 - No Content</summary>

  ```jsonc
  /*
  * Sucessfully updated car
  * No body expected
  */
  ```
</details>

<details>
  <summary>400 - Bad Request</summary>

  ```jsonc
  {
    "name": "Bad Request",
    "details": [
      {
        "message": "..."
      },
      ...
    ]
  }
  ```
</details>

<details>
  <summary>404 - Not Found</summary>

  ```jsonc
  {
    "name": "Not Found",
    "details": [{
      "message": "Cannot find car with id = ${id}"
    }]
  }
  ```
</details>
<br>

#### <img src="https://img.shields.io/badge/-DELETE-red"/>&ensp;<sup>`/car/{id}` - Delete um carro</sup>
Query Params:
```js
id: "string"
```

Respostas:
<details>
  <summary>204 - No Content</summary>

  ```jsonc
  /*
  * Sucessfully deleted car
  * No body expected
  */
  ```
</details>

<details>
  <summary>400 - Bad Request</summary>

  ```jsonc
  {
    "name": "Bad Request",
    "details": [
      {
        "message": "Id field is not valid"
      }
    ]
  }
  ```
</details>

<details>
  <summary>404 - Not Found</summary>

  ```jsonc
  {
    "name": "Not Found",
    "details": [{
      "message": "Cannot find car with id = ${id}"
    }]
  }
  ```
</details>
<br>

#### <img src="https://img.shields.io/badge/-PATCH-gray"/>&ensp;<sup>`/car/:carId/acessorios/:acessorioId` - Atualiza um acessório de um carro</sup>
Params
```jsonc
{
  "carId": "string",
  "acessorioId": "string"
}
```

Body Request:
```jsonc
// Todos os campos são obrigatórios
{
  "descricao": "string"
}
```

Respostas:
<details>
  <summary>204 - No Content</summary>

  ```jsonc
  /*
  * Sucessfully updated Car.acessorio
  * No body expected
  */
  ```
</details>

<details>
  <summary>400 - Bad Request</summary>

  ```jsonc
  {
    "name": "Bad Request",
    "details": [
      {
        "message": "..."
      },
      ...
    ]
  }
  ```
</details>

<details>
  <summary>404 - Not Found</summary>

  ```jsonc
  {
    "name": "Not Found",
    "details": [{
      "message": "Cannot find car with id = ${id}"
    }]
  }
  ```
</details>
<br>

___
<a name="routes/people"></a>

### People
#### <img src="https://img.shields.io/badge/-POST-yellow"/>&ensp;<sup>`/people` - Cria um usuário</sup>
Body Request:
```jsonc
// Todos os campos são obrigatórios
{
  "nome": "joaozinho fulano",
  "cpf": "12345678900",
  "data_nascimento": "23/02/2000",
  "email": "fulano@mail.com",
  "senha": "12345678",
  "habilitado": "sim" | "nao",
}
```

Respostas:
<details>
  <summary>201 - Created</summary>

  ```jsonc
  /*
  * Sucessfully created People
  * No body expected
  */
  ```
</details>

<details>
  <summary>400 - Bad Request</summary>

  ```jsonc
  {
    "name": "Bad Request",
    "details": [
      {
        "message": "..."
      },
      ...
    ]
  }
  ```
</details>

<details>
  <summary>409 - Conflict</summary>

  ```jsonc
  {
    "name": "Conflict",
    "details": [{
      "message": "Already exists People with same value of ${key}"
    }]
  }
  ```
</details>
<br>

___
<a name="routes/authenticate"></a>

### Authenticate
#### <img src="https://img.shields.io/badge/-POST-yellow"/>&ensp;<sup>`/authenticate` - Cria um Token</sup>
Body Request:
```jsonc
// Todos os campos são obrigatórios
{
  "email": "fulano@mail.com",
  "senha": "12345678"
}
```

Respostas:
<details>
  <summary>200 - OK</summary>

  ```jsonc
  {
    "acess_token": "...",
    "type": "bearer"
  }
  ```
</details>

<details>
  <summary>400 - Bad Request</summary>

  ```jsonc
  {
    "name": "Bad Request",
    "details": [
      {
        "message": "..."
      },
      ...
    ]
  }
  ```
</details>

<details>
  <summary>401 - Unauthorized</summary>

  ```jsonc
  {
    "name": "Unauthorized",
    "details": [{
      "message": "Passwords are not the same"
    }]
  }
  ```
</details>

<details>
  <summary>404 - Not Found</summary>

  ```jsonc
  {
    "name": "Not Found",
    "details": [{
      "message": "Cannot find user with email = ${email}"
    }]
  }
  ```
</details>
<br>

___
