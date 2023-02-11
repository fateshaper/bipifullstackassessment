/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('merchants',table => {
    table.increments('id');
    table.string('merchant_name').notNullable();
    table.string('phone_number');
    table.decimal('latitude');
    table.decimal('longitude');
    table.boolean('is_active').notNullable().defaultTo(0);
    table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('merchants');
};
