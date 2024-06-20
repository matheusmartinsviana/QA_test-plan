const RepositorioExercicio= require("../repositories/pessoa.js")

const repositorio = new RepositorioExercicio()
class ServicoExercicio {

    async PegarUm(id, transaction){
      if(!id || isNaN(id)) {
        throw new Error("Favor corretamente o id.")
      }
      return repositorio.PegarUm(id, transaction)
    }

    async PegarTodos(){
      return repositorio.PegarTodos()
    }

    async Adicionar(pessoa, transaction){
      if(!pessoa) {
        throw new Error("Favor preencher o pessoa.")
      } else if(!pessoa.nome) {
        throw new Error("Favor preencher o nome.")
      } else if(!pessoa.email) {
        throw new Error("Favor preencher o email.")
      } else if(!pessoa.senha) {
        throw new Error("Favor preencher o senha.")
      }

      return repositorio.Adicionar(pessoa, transaction)
    }

    async Alterar(id, pessoa, transaction){
      if(!id || isNaN(id)) {
        throw new Error("Favor corretamente o id.")
      }

      await repositorio.Alterar(id, pessoa, transaction)

      return this.PegarUm(id, transaction)
    }

    async Deletar(id, transaction){
      if(!id || isNaN(id)) {
        throw new Error("Favor corretamente o id.")
      }

      return repositorio.Deletar(id, transaction)
    }

}
module.exports = ServicoExercicio