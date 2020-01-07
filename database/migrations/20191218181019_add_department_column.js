
exports.up = function (knex) {
   return knex.schema.table('users', table => {
      table.string('department', 128);
   });
};

exports.down = function (knex) {
   return knex.schema.dropColumn('department');
};
