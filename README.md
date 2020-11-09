# Teste Simulador Caixa Eletrônico

---

### Objetivo

O intuito do projeto é desenvolver uma API que simule um Caixa Eletrônico e seu funcionamento.

## Requisitos

1. Possibilidade de cadastrar, alterar, excluir e buscar usuários. Os atributos para usuário precisam ser nome, data de nascimento e cpf.

2. Possibilidade de cadastrar contas para usuários com tipo da conta (poupança ou corrente) e saldo.

3. O usuário poderá fazer depósito de qualquer valor em sua conta, exceto centavos.

4. O usuário poderá fazer saque de sua conta apenas utilizando as notas de 20, 50 ou 100.

    - A API de saque deverá priorizar as notas maiores para compor o valor total. Exemplo:  Se escolher sacar 150, então liberar uma nota de 100 e outra de 50. Se escolher sacar 60, então deverá liberar 3 notas de 20.

    -  Se o valor solicitado para saque for maior que o disponível na conta do usuário, exibir erro.

    - Se não houver cédulas disponíveis para o valor solicitado, exibir erro. Por exemplo, se for solicitado o saque de 15, não será possível seguir com a operação visto que a nota mínima de saque é 20.

5. Garantir que na concorrência das operações (saque e depósito), um saque, por \exemplo, precisa esperar que o outro finalize para executar.


#### O que é esperado neste teste?

- [x] Testes automatizados de alguns fluxos
- [x] Uso de banco de dados
- [x] Uso dos padrões de API RESTful (verbos, endpoints, status code, etc)
- [x] Documentação de como executar a aplicação
- [x] Documentação de como usar os endpoints
- [x] Uso de git, o código poderá estar no Github ou Bitbucket

___
### Como rodar o projeto

Com o projeto devidamente clonado acesse a pasta e rode
```properties
yarn install
#OR
npm install
```

Rode as migrations para criar o banco de dados
```properties
yarn typeorm schema:drop
yarn typeorm migration:run
#OR
npm run typeorm schema:drop
npm run typeorm migration:run
```

Feito isso basta rodar o comando
```properties
yarn dev
#OR
npm run dev
```

###### (dev é o comando configurado para rodar os comandos necessários)
___
### Testes Unitários

Para realizar os testes implementados é necessário que a aplicação tenha sido recém clonada, ou seja, o banco deve estar **zerado**.

Caso não tenha realizado dessa forma é muito simples, basta rodar o comando para que as tabelas sejam "dropadas"
```properties
yarn typeorm schema:drop
```

Depois rode o comando a seguir para recriar as tabelas
```properties
yarn typeorm migration:run
```

Para rodar os testes basta executar o comando
```properties
yarn test
```

Todos os testes implementados estão na pasta **/src/test**.

___
# MENU
- Usuario
  - [Cadastrar Usuário](#cadastrar-usuario)
  - [Listar Todos Usuários](#listar-todos-usuarios)
  - [Lista Usuário](#lista-usuario)
  - [Edita Usuário](#edita-usuario)
  - [Deleta Usuário](#deleta-usuario)
  <br>
- Contas Bancarias
  - [Cadastrar Conta Bancária](#cadastrar-conta-bancária)
  <br>

- Transações
  - [Deposito](#deposito)
  - [Saque](#saque)
___

## Rotas Implementadas

### Usuários

#### Rotas
##### Cadastrar Usuario:
```
POST /user
```
* Request
```json {.line-numbers}
{
	"name": "Juliano",
	"birthDate": "1996-02-14",
	"CPF": "12345678900",
	"isActive": true,
	"newAccounts": [
		{
			"accountType": 2,
			"balance": 1537.54,
			"isActive": true
		}
	]
}
```
* Response
```json {.line-numbers}
HTTP/1.1 201 Created

{
    "message": "New User Registered",
    "user": {
    "name": "Juliano",
    "birthDate": "1996-02-14",
    "CPF": "12345678900",
    "isActive": true,
    "newAccounts": [
      {
        "accountType": 2,
        "balance": 1537.54,
        "isActive": true,
        "id": 5
      }
    ],
    "id": 5
  }
}
```
| Fields        | Description                                                            |
|:------------- |:-------------                                                          |
| name          | Nome do usuário a ser cadastrado.                                      |
| birthDate     | Data de nascimento do usuário.                                         |
| CPF           | Campo Único. CPF do usuário.                                           |
| isActive      | Indica se o usuário está ativo.                                        |
| newAccounts   | Opcional. Objeto contendo (Tipo de conta, saldo e se está ativa). Caso queira cadastrar o usuário já com uma conta bancária.   |

___
##### Listar Todos Usuarios:
```
GET /user
```

* Response
```json {.line-numbers}
HTTP/1.1 200 OK

[
  {
    "name": "Juliano",
    "birthDate": "1996-02-14",
    "CPF": "12345678900",
    "isActive": true,
  },
  {
    "name": "Rodrigo",
    "birthDate": "1995-01-15",
    "CPF": "12345678901",
    "isActive": true,
  }
]
```
___
##### Lista Usuario:
```
GET /user/:idUser
```

* Response
```json {.line-numbers}
HTTP/1.1 200 OK

[
  {
    "name": "Rodrigo",
    "birthDate": "1995-01-15",
    "CPF": "12345678901",
    "isActive": true,
  }
]
```
___
##### Edita Usuario:
```
PUT /user/:idUser
```
* Request
```json {.line-numbers}
{
	"name": "Juliano",
	"birthDate": "1996-02-14",
	"CPF": "12345678900",
	"isActive": true,
}
```
* Response
```json {.line-numbers}
HTTP/1.1 200 OK

{
  "message": "Usuário alterado com sucesso."
}
```
| Fields        | Description                                                            |
|:------------- |:-------------                                                          |
| name          | Nome do usuário a ser editado.                                      |
| birthDate     | Data de nascimento do usuário.                                         |
| CPF           | CPF do usuário.                                           |
| isActive      | Indica se o usuário está ativo.                                        |
___
##### Deleta Usuario:
###### (deleta logicamente mudando o field isActive para false):
```
DELETE /user/:idUser
```
* Response
```json {.line-numbers}
HTTP/1.1 200 OK

{
  "message": "Usuário excluído com sucesso."
}
```
___
### Contas Bancárias

#### Rotas
##### Cadastrar Conta Bancária
```
POST /account
```
* Request
```json {.line-numbers}
{
  "userId": 1,
  "accountType": 1,
  "balance": 250.00,
  "isActive": true
}
```
* Response
```json {.line-numbers}
HTTP/1.1 201 Created

{
    "message": "New Account Registered",
    "accounts": {
      "userId": 1,
      "accountType": 1,
      "balance": 250.00,
      "isActive": true,
      "id": 5
  }
}
```
| Fields        | Description                                                            |
|:------------- |:-------------                                                          |
| userId        | ID do usuário vinculado a esta conta.                                  |
| accountType   | Tipo da conta cadastrada (1 - Conta Corrente, 2 - Conta Poupança.      |
| balance       | Saldo da conta.                                                        |
| isActive      | Indica se a conta está ativa.                                          |

___
### Transações

#### Rotas
##### Deposito
```
PUT /deposit/:idAccount
```
* Request
```json {.line-numbers}
{
	"deposito": 500
}
```
* Response
```json {.line-numbers}
HTTP/1.1 200 OK

{
  "message": "Depósito efetuado com sucesso."
}
```
| Fields        | Description              |
|:------------- |:-------------            |
| deposito      | Valor a ser depositado na conta bancária.  |
___
##### Saque
```
PUT /withdraw/:idAccount
```
* Request
```json {.line-numbers}
{
	"saque": 290,
	"accountType": 2
}
```
* Response
```json {.line-numbers}
HTTP/1.1 200 OK

{
  "message": "Saque efetuado com sucesso.",
  "cedulas": {
    "cem": 2,
    "cinquenta": 1,
    "vinte": 2
  }
}
```
| Fields        | Description              |
|:------------- |:-------------            |
| saque         | Valor a ser sacado da conta bancária.  |
| cedulas       | Mostra as cedulas que seram sacadas e a quantas de cada cedula.  |
