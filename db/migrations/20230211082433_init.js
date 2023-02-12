/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//Initial creation of merchants table
exports.up = function (knex) {
  return knex.schema.createTable("merchants", table => {
    table.increments("id")
    table.string("merchant_name").notNullable()
    table.string("phone_number", 20).unique().notNullable() //Char limit of 20. Phone number must be unique.
    table.decimal("latitude")
    table.decimal("longitude")
    table.boolean("is_active").notNullable().defaultTo(0)
    table.timestamps(false, true) //Timestamp format - created at & updated at
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("merchants")
}
