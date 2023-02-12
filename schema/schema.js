const db = require("../db/db")
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql")

//Importing custom scalar types
const {
  GraphQLLatitude,
  GraphQLLongitude,
  GraphQLDateTime,
} = require("graphql-scalars")
const { default: knex } = require("knex")

//List of query APIs
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query for all merchants",
  fields: () => ({
    merchants: {
      type: new GraphQLList(MerchantType),
      description: "List of merchants, paginated and sorted based on column",
      args: {
        perPage: { type: GraphQLNonNull(GraphQLInt) },
        currentPage: { type: GraphQLNonNull(GraphQLInt) },
        column: { type: GraphQLNonNull(GraphQLString) },
        order: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { perPage, currentPage, column, order }) {
        return db("merchants")
          .orderBy(column, order)
          .paginate({ perPage, currentPage })
          .then(res => res.data)
      },
    },
    merchant: {
      type: MerchantType,
      description: "A single merchant, searched via id",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return db("merchants").select("*").where("id", args.id).first()
      },
    },
  }),
})

//Latitude and longitude can be null
const MerchantType = new GraphQLObjectType({
  name: "Merchant",
  description: "This represents a single merchant",
  fields: () => ({
    id: { type: GraphQLInt },
    merchant_name: { type: GraphQLNonNull(GraphQLString) },
    phone_number: { type: GraphQLNonNull(GraphQLString) },
    latitude: { type: GraphQLLatitude },
    longitude: { type: GraphQLLongitude },
    is_active: { type: GraphQLNonNull(GraphQLBoolean) },
    created_at: { type: GraphQLNonNull(GraphQLDateTime) },
    updated_at: { type: GraphQLNonNull(GraphQLDateTime) },
  }),
})

//List of mutation APIs
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root mutation",
  fields: () => ({
    addMerchant: {
      type: MerchantType,
      description: "Create a new merchant",
      args: {
        merchant_name: { type: GraphQLNonNull(GraphQLString) },
        phone_number: { type: GraphQLNonNull(GraphQLString) },
        latitude: { type: GraphQLLatitude },
        longitude: { type: GraphQLLongitude },
        is_active: { type: GraphQLBoolean },
      },
      resolve(
        parent,
        { merchant_name, phone_number, latitude, longitude, is_active }
      ) {
        return db("merchants")
          .insert({
            merchant_name,
            phone_number,
            latitude,
            longitude,
            is_active,
          })
          .returning("*")
          .then(([data]) => data)
      },
    },
    updateMerchant: {
      type: MerchantType,
      description: "Update an existing merchant",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }, //Specify ID of merchant to be updated
        merchant_name: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        is_active: { type: GraphQLBoolean },
      },
      resolve(
        parent,
        { id, merchant_name, phone_number, latitude, longitude, is_active }
      ) {
        return db("merchants")
          .where("id", id)
          .update({
            merchant_name,
            phone_number,
            latitude,
            longitude,
            is_active,
            updated_at: db.fn.now(),
          })
          .returning("*")
          .then(([data]) => data)
      },
    },
    toggleActive: {
      type: new GraphQLList(MerchantType),
      description: "Bulk update merchants to active status",
      args: {
        startid: { type: GraphQLNonNull(GraphQLInt) },
        endid: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, { startid, endid }) {
        return db("merchants")
          .where("id", ">=", startid)
          .andWhere("id", "<=", endid)
          .update({
            is_active: db.raw("NOT ??", ["is_active"]), //Toggle's active status
            updated_at: db.fn.now(),
          })
          .returning("*")
          .then(data => data)
      },
    },
  }),
})

const myschema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})

module.exports = myschema
