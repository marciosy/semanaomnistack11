//Pacote que já vem no node, vamos usar pra gerar textos com vários caracteres aleatórios juntos
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

  async index (request, response){
    //Com o await o node quando chegar aqui vai aguardar esse código terminar pra então continuar
    const ongs = await connection('ongs').select('*');
    
    return response.json(ongs);
  },

  async create(request, response){
    const {name, email, whatsapp, city, uf } = request.body;
    const id = crypto.randomBytes(4).toString('HEX');

    //Com o await o node quando chegar aqui vai aguardar esse código terminar pra então continuar
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    }); 

    return response.json({ id });
  }
};