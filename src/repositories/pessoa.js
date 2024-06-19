const Pessoa = require('../models/pessoa.js');

class RepositorioExercicio {

    async PegarUm(id, transaction){
        return Pessoa.findOne({
            where: {
                id
            },
            transaction
        })
    }

    async PegarTodos(){
        return Pessoa.findAll()
    }

    async Adicionar(pessoa, transaction){
        return Pessoa.create({ ...pessoa}, {transaction})
    }

    async Alterar(id, pessoa, transaction){
        return Pessoa.update(pessoa, {
            where: {
                id
            },
            transaction
        })
    }

    async Deletar(id){
        return Pessoa.destroy({
            where: {
                id
            }
        })
    }

}

module.exports = RepositorioExercicio