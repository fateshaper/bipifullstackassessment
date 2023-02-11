const db = require('../db/db')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql')


const RootQueryType = new GraphQLObjectType({
    name : 'Query',
    description : 'Root query for all merchants',
    fields: () => ({
        merchants: {
            type : new GraphQLList(MerchantType),
            description : 'List of all merchants',
            resolve : () => db('merchants').select('*')
        }
    })
})

//Todo : Replace latitude and longitude with custom Decimal scalar
const MerchantType = new GraphQLObjectType({
    name: 'Merchant',
    description: 'This represents a merchant',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        merchant_name: {type:GraphQLNonNull(GraphQLString)},
        phone_number: {type:GraphQLNonNull(GraphQLString)},
        latitude : {type:GraphQLNonNull(GraphQLFloat)},
        longitude: {type:GraphQLNonNull(GraphQLFloat)},
        is_active : {type:GraphQLNonNull(GraphQLBoolean)}
    })
})


const myschema = new GraphQLSchema({
    query:RootQueryType
})


module.exports = myschema