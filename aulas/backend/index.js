const express  = require('express');

const app = express();

//Criando rotas:
app.get('/', (request, response)=>{
   return response.json({
      evento: "Semana OmniStack 11.0",
      aluno: 'Marcio Shiniti'
   })
});

//Vai ficar 'ouvindo' a porta 3333
app.listen(3333); 