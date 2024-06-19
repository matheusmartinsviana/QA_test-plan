const { describe, expect, it } = require('@jest/globals');

const conexao = require("../src/database")
const ServicoExercicio = require("../src/services/pessoa");

describe('Testes do primeiro exercício', () => {

   const servico = new ServicoExercicio()

   beforeAll(async () => {
      this.transaction = await conexao.transaction();
      console.info('Iniciando TDD com jest!');
   });

   afterAll(() => {
      this.transaction.rollback();
      console.info('Encerrados os testes');
   });

   it('Should add a name', async () => {
      const mockPessoa = { nome: "João da Silva", email: "batata@123.com", senha: "123456" }
      const { dataValues } = await servico.Adicionar(mockPessoa, this.transaction)

      expect(mockPessoa.nome).toBe(dataValues.nome);
      expect(mockPessoa.email).toBe(dataValues.email);
      expect(mockPessoa.senha).toBe(dataValues.senha);
   })

   it('Should update a name', async () => {
      const id = 1;
      const mockPessoa = { nome: "Joao", email: "batata2@123.com", senha: "123456" }
      const dataValue = await servico.Alterar(id, mockPessoa, this.transaction)
      
      expect(id).toBe(dataValue.dataValues.id);
      expect(mockPessoa.nome).toBe(dataValue.dataValues.nome);
      expect(mockPessoa.email).toBe(dataValue.dataValues.email);
      expect(mockPessoa.senha).toBe(dataValue.dataValues.senha);
   })

   it('Should delete a name', async () => {
      const id = 1;
      const dataValue = await servico.Deletar(id, this.transaction)
      
      expect(dataValue).toBe(dataValue.id);
      
      const result = () => (servico.PegarUm(id, this.transaction))

      expect(result).toThrowError()
   })

})
