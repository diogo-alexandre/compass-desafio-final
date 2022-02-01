<p align="right">
  <img src="https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs" />
  <img src="https://img.shields.io/badge/release-1.0.0-blue" />
</p>
<p align="center">
  <img src="https://scontent.frec5-1.fna.fbcdn.net/v/t39.30808-6/251638643_4793169397388190_2358352085720421550_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=e3f864&_nc_ohc=homloH0eWr4AX-WRpQK&_nc_ht=scontent.frec5-1.fna&oh=00_AT8BoZN2Y0YVJm0vO1lVf4A_tirk2HHbiizxZN3k-jLL0A&oe=61FEA543" />
</p>
<br>

<h1 align="center">Compass: Desafio Final</h1>
<p align="center">
  Este projeto faz parte do programa de bolsa de estudo da <a href="https://compass.uol/">Compass OUL</a> <br>
  O desafio consiste em fazer uma API REST com os consteúdos aprendidos ao longo da bolsa.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Vscode-2496ED?style=for-the-badge&logo=visualstudio&logoColor=blue&color=white">
</p>

### 📖 Indíce

- [Clonando repositório](#clonando-repositorio)
- [Configurando variáveis de ambiente](#configurando-variaveis-de-ambiente)
- [Iniciando o servidor](#iniciando-o-servidor)
  - [Desenvolvimento](#iniciando-o-servidor/desenvolvimento)
  - [Produção](#iniciando-o-servidor/producao)
- [Utilizando Docker](#utilizando-docker)
___
<a name="clonando-repositorio"></a>
### 📥 Clonando repositório

O primeiro passo para subir a aplicação localmente é clonando o repositório em sua máquina. <br>
Com o [Git](https://git-scm.com/) instalado na sua máquina, você pode executar o seguinte comando no terminal:

```bash
git clone https://github.com/diogo-alexandre/compass-desafio-final.git && cd compass-desafio-final
```
Após isso, você tem uma cópia do repositório em sua máquina. <br>
Caso não tenha o `git` instalado, será necessário acessar o [repositório](https://github.com/diogo-alexandre/compass-desafio-final) e baixa-lo manualmente.
___
<a name="configurando-variaveis-de-ambiente"></a>
### ⚙️ Configurando variáveis de ambiente

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
### ▶️ Iniciando o servidor

Depois de ter o `.env` configurado corretamente, é possível iniciar o app.

> Caso utilize Docker, pule para seção: [Utilizando Docker](#utilizando-docker)

Existem dois ambientes para iniciar o aplicativo:
  - [Desenvolvimento](#iniciando-o-servidor/desenvolvimento)
  - [Produção](#iniciando-o-servidor/producao)


<a name="iniciando-o-servidor/desenvolvimento"></a>
#### 🔧 Desenvolvimento
A aplicação roda localmente, escutando as modificações nos arquivos e reiniciando o serviço a cada modificação. <br>
Por isso não é ideál executar este comando em produção.


Para executar a aplicação, execute o seguinte comando na linha de comando:
```bash
npm run start:dev
```
<a name="iniciando-o-servidor/producao"></a>
#### 📦 Produção
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
### 🚢 Utilizando Docker
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
# Fazer o buld e subir a aplicação
npm run docker:up

# Derrubar os containers
npm run docker:down
```
