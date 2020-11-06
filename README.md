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

- [ ] Testes automatizados de alguns fluxos
- [x] Uso de banco de dados
- [x] Uso dos padrões de API RESTful (verbos, endpoints, status code, etc)
- [x] Documentação de como executar a aplicação
- [x] Documentação de como usar os endpoints
- [x] Uso de git, o código poderá estar no Github ou Bitbucket

## Rotas Implementadas

#### Usuários

##### Rotas
Cadastrar Usuario:
```
POST /user
```
* Request
```json {.line-numbers}
{
	"name": "Juliano",
	"birthDate": "1996-02-14",
	"CPF": "12345678904",
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
    "CPF": "12345678904",
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

#### Contas Bancárias

##### Rotas
Cadastrar Conta Bancária:
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