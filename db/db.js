const knex = require("knex")
const knexfile = require("./knexfile")
const { attachPaginate } = require("knex-paginate")

//Set up knex database with pagination option
const db = knex(knexfile.development)
attachPaginate()

module.exports = db
