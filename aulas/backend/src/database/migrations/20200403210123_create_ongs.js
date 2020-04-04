// .up Método responsável pela criação da tabela
//npx knex migrate:latest
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
    table.string('id').primary(); //Coluna primária
    table.string('name').notNullable(); // Campo não pode ser nulo
    table.string('email').notNullable(); 
    table.string('whatsapp').notNullable(); 
    table.string('city').notNullable(); 
    table.string('uf', 2).notNullable(); // Como UF só tem 2 digitos sempre, é possível passar outro param com a quantidade de caracteres
  });
};

//Caso precise voltar a atrás na criação de uma tabela se algo der ruim...
//npx knex migrate:rollback
//npx knex migrate:down
exports.down = function(knex) {
  return knex.schema.dropTable('ongs'); //vai deletar a tabela ongs
};
