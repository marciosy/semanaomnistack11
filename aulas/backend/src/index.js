const express  = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());

// Informa que usaremos JSON para o corpo das requisições
app.use(express.json());

// Importante esse código tem que vir logo abaixo o express.json
app.use(routes);

//Vai ficar 'ouvindo' a porta 3333
app.listen(3333); 