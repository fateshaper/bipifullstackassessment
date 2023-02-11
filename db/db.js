const knex = require('knex');
const knexfile = require('./knexfile');
const {attachPaginate} = require('knex-paginate')



const db = knex(knexfile.development)
attachPaginate()


module.exports = db 