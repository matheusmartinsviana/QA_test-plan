const { describe, expect, it, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const conexao = require("../src/database")
const ServicoExercicio = require("../src/services/pessoa");

describe('Testes da Entidade Pessoa', () => {
   let servico;
   let transaction;
   const mockPessoa = { nome: "Just for test", email: "test@domain.com", senha: "test#password" };

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

   it('Should get a person by id', async () => {
      const pessoa = await servico.Adicionar(mockPessoa, transaction);
      const id = pessoa[pessoa.dataValues.id]
      const dataValues = await servico.PegarUm(id, transaction)
      expect(mockPessoa.nome).toBe(pessoa.dataValues.nome);
      expect(mockPessoa.email).toBe(pessoa.dataValues.email);
      expect(mockPessoa.senha).toBe(pessoa.dataValues.senha);

   });

   it('Should add a person', async () => {
      const pessoa = await servico.Adicionar(mockPessoa, transaction);
      console.log(pessoa[pessoa.dataValues.id]) // ou (pessoa.null)
      expect(mockPessoa.nome).toBe(pessoa.dataValues.nome);
      expect(mockPessoa.email).toBe(pessoa.dataValues.email);
      expect(mockPessoa.senha).toBe(pessoa.dataValues.senha);

   });

   it('Should update a person', async () => {
      const pessoa = await servico.Adicionar(mockPessoa, transaction)
      const id = pessoa.null; // ou pessoa[pessoa.dataValues.id]
      const mockPessoaUpdate = {nome: "User Updated", email: "updated@domain.com", senha: "update#password" };

      const dataValue = await servico.Alterar(id, mockPessoaUpdate, transaction);

      expect(id).toBe(dataValue.dataValues.id);
      expect(mockPessoaUpdate.nome).toBe(dataValue.dataValues.nome);
      expect(mockPessoaUpdate.email).toBe(dataValue.dataValues.email);
      expect(mockPessoaUpdate.senha).toBe(dataValue.dataValues.senha);
   });

   it('Should delete a person', async () => {
      const pessoa = await servico.Adicionar(mockPessoa, transaction)
      const id = pessoa.null; // ou pessoa[pessoa.dataValues.id]

      const qtdeBefore = await Number(servico.PegarTodos().length); // 2
      const dataValue = await servico.Deletar(id, transaction);

      const qtdeAfter = await Number(servico.PegarTodos().length); // 1

      expect(dataValue).toBe(1);
      expect(qtdeAfter + 1).toBe(qtdeBefore);
   });
});
