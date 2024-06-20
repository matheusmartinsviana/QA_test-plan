const { describe, expect, it, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const conexao = require("../src/database")
const ServicoExercicio = require("../src/services/pessoa");

describe('Testes da Entidade Pessoa', () => {
   let servico;
   let transaction;

   beforeAll(async () => {
      servico = new ServicoExercicio();
      console.info('Iniciando TDD com jest!');
   });

   beforeEach(async () => {
      transaction = await conexao.transaction();
   });

   afterAll(async () => {
      console.info('Encerrados os testes');
   });

   afterEach(async () => {
      await transaction.rollback();
   });

   it('Should add a name', async () => {
      const mockPessoa = { nome: "João da Silva", email: "batata@123.com", senha: "123456" };
      const pessoa = await servico.Adicionar(mockPessoa, transaction);
      console.log(pessoa[pessoa.dataValues.id]) // pessoa.null
      expect(mockPessoa.nome).toBe(pessoa.dataValues.nome);
      expect(mockPessoa.email).toBe(pessoa.dataValues.email);
      expect(mockPessoa.senha).toBe(pessoa.dataValues.senha);

   });

   it('Should update a name', async () => {
      const id = 26;
      const mockPessoa = { nome: "Josaao", email: "batata2@123.com", senha: "123456" };
      const dataValue = await servico.Alterar(id, mockPessoa, transaction);

      expect(id).toBe(dataValue.dataValues.id);
      expect(mockPessoa.nome).toBe(dataValue.dataValues.nome);
      expect(mockPessoa.email).toBe(dataValue.dataValues.email);
      expect(mockPessoa.senha).toBe(dataValue.dataValues.senha);
   });

   it('Should delete a name', async () => {
      const id = 26;
      const qtdeBefore = await Number(servico.PegarTodos().length); // 2
      const dataValue = await servico.Deletar(id, transaction);

      const qtdeAfter = await Number(servico.PegarTodos().length); // 1

      expect(dataValue).toBe(1);
      expect(qtdeAfter + 1).toBe(qtdeBefore);
   });
});
