//Importing custom scalar types
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql")

const {
  GraphQLLatitude,
  GraphQLLongitude,
  GraphQLDateTime,
} = require("graphql-scalars")

//Defining merchant type - for use in the query & mutations in schema.js
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

module.exports = MerchantType
