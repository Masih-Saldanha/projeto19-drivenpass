<p align="center">
  <a href="https://github.com/$username-github/$nome-repositorio">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    Valex
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/Masih-Saldanha/projeto18-valex

$ cd projeto18-valex

$ npm install

$ npm run dev
```

API:

```
- POST /create-card
    - Rota para a empresa cadastrar um cartão novo para um empregado
    - headers: {
        "x-api-key": "loremIpsum"
    }
    - body: {
        "employeeId": 1,
        "type": "groceries" | "restaurant" | "transport" | "education" | "health"
    }
- PUT /activate-card
    - Rota para o(a) empregado(a) ativar um cartão
    - headers: {}
    - body: {
        "id": 1,
        "securityCode": "123",
        "password": "1234"
    }
- POST /recharge-card
    - Rota para a empresa recarregar o cartão de um(a) empregado(a)
    - headers: {}
    - body: {
        "id": 1,
        "rechargeValue": 100000
    }
- POST /buy
    - Rota para o(a) empregado(a) fazer uma compra usando um cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "password": "1234",
        "amount": 10000,
        "businessId": 1
    }
- GET /view-card/:cardId
    - Rota para o(a) empregado(a) acessar saldo atual e histórico de recarga e uso do cartão
    - headers: {}
    - body: {}
    - params: { "cardId": "1" }
- PUT /block-card
    - Rota para o(a) empregado(a) bloquear um cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "password": "1234"
    }
- PUT /unblock-card
    - Rota para o(a) empregado(a) bloquear um cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "password": "1234"
    }
```
