// .up Método responsável pela criação da tabela
//npx knex migrate:latest
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    table.increments() //Vai criar um número incrementando a cada incidente criado
    table.string('title').notNullable(); // Campo não pode ser nulo
    table.string('description').notNullable(); 
    table.decimal('value').notNullable();  //Número float com casas decimais
    
    //Campo de relacionamento pra linkar incidente com a ONG
    // string pq na tabela ong o id é string
    table.string('ong_id').notNullable();

    //Chave estrangeira
    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

//Caso precise voltar a atrás na criação de uma tabela se algo der ruim...
//npx knex migrate:rollback
//npx knex migrate:down
exports.down = function(knex) {
  return knex.schema.dropTable('incidents'); //vai deletar a tabela ongs
};
