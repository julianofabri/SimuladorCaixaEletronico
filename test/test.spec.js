
    var should = require("should");
    var request = require("request");
    var chai = require("chai");
    let chaiHttp = require('chai-http');

    chai.use(chaiHttp);

    var expect = chai.expect;
    var urlBase = "http://localhost:3333";

    describe("POST /user", () => {

        it("Cria um usuário já com conta bancária do tipo poupança (accountType: 2)", async () =>  {
            let res = await chai.request(urlBase).post('/user')
                .send(
                    {
                        name: "Juliano",
                        birthDate: "1996-02-14",
                        CPF: "12345678900",
                        isActive: true,
                        newAccounts: [
                            {
                                accountType: 2,
                                balance: 1537.54,
                                isActive: true
                            }
                        ]
                    }
                )
           
            expect(res.status).to.equal(201);
           
        });
    });

    describe("POST /account", () => {

        it("Cria uma conta bancária para o usuário cadastrado anteriormente (accountType: 1)", async () =>  {
            let res = await chai.request(urlBase).post('/account')
                .send(
                    {
                        userId: 1,
                        accountType: 1,
                        balance: 250.00,
                        isActive: true
                    }
                )
           
            expect(res.status).to.equal(201);
           
        });
    });      

    describe("GET /user", () => {
        it("Deve receber a lista de usuários GET /user", function(done){
            request.get(
            {
                url : urlBase + "/user"
            }, function(error, response, body){

                    var _body = {};
                    try{
                    _body = JSON.parse(body);
                    }
                    catch(e){
                    _body = {};
                    }

                    expect(response.statusCode).to.equal(200);

                    if(_body[0].should.have.property('name')){
                        expect(_body[0].name).to.equal('Juliano');
                    }

                    done();
                }
            );
        });
    });

    describe('PUT /user/:idUser', () => {
        it('Altera usuário cadastrado (Coloca o usuário com o campo de "isActive" falso)', async () => {
            let res = await chai.request(urlBase)
                                .put('/user/1')
                                .send(
                                    {
                                        name: 'Juliano',
                                        birthDate: '1996-02-14',
                                        CPF: '12345678900',
                                        isActive: false,
                                    }
                                )
   
            expect(res.status).to.equal(200);
        }); 
    });
