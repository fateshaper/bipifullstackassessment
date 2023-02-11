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


//List of query APIs
//To do : Retrieve merchants based on pagination and sorting
const RootQueryType = new GraphQLObjectType({
    name : 'Query',
    description : 'Root query for all merchants',
    fields: () => ({
        merchants: {
            type : new GraphQLList(MerchantType),
            description : 'List of merchants, paginated and sorted based on column',
            args: {
                perPage: {type: GraphQLNonNull(GraphQLInt)},
                currentPage: {type: GraphQLNonNull(GraphQLInt)},
                column : {type:GraphQLNonNull(GraphQLString)},
                order: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,{perPage, currentPage,column, order}){
                return db('merchants')
                .orderBy(column, order)
                .paginate({perPage, currentPage})
                .then(res=>res.data)
            }
        },
        merchant: {
            type: MerchantType,
            description: 'A single merchant, searched via id',
            args: {
                id:{ type: GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){ 
                return db('merchants')
                .select('*')
                .where('id', args.id)
                .first()}
        }
    })
})

//Todo : Replace latitude and longitude with custom Decimal scalar
const MerchantType = new GraphQLObjectType({
    name: 'Merchant',
    description: 'This represents a single merchant',
    fields: () => ({
        id: {type: GraphQLInt},
        merchant_name: {type:GraphQLNonNull(GraphQLString)},
        phone_number: {type:GraphQLNonNull(GraphQLString)},
        latitude : {type:GraphQLNonNull(GraphQLFloat)},
        longitude: {type:GraphQLNonNull(GraphQLFloat)},
        is_active : {type:GraphQLNonNull(GraphQLBoolean)}
    })
})

//List of mutation APIs
const RootMutationType = new GraphQLObjectType({
    name : 'Mutation',
    description : 'Root mutation',
    fields: () => ({
        addMerchant : {
            type: MerchantType,
            description : 'Create a new merchant',
            args : {
                merchant_name : {type: GraphQLNonNull(GraphQLString)}, 
                phone_number: {type:GraphQLNonNull(GraphQLString)},
                latitude : {type:GraphQLNonNull(GraphQLFloat)},
                longitude: {type:GraphQLNonNull(GraphQLFloat)},
                is_active : {type:GraphQLBoolean}
            },
            resolve(parent,{merchant_name, phone_number, latitude, longitude, is_active}){
                return db('merchants')
                .insert(
                    {merchant_name, phone_number, latitude, longitude,is_active}
                ).returning('id')
                .then(([id])=>id)
            }
        },
        updateMerchant: {
            type: MerchantType,
            description : 'Update an existing merchant',
            args: {
                id : {type: GraphQLNonNull(GraphQLInt)},
                merchant_name : {type: GraphQLString}, 
                phone_number: {type:GraphQLString},
                latitude : {type:GraphQLFloat},
                longitude: {type:GraphQLFloat},
                is_active : {type:GraphQLBoolean}
            },
            resolve(parent, {id, merchant_name, phone_number, latitude, longitude, is_active}){
                return db('merchants')
                .where('id', id)
                .update({merchant_name, phone_number, latitude, longitude, is_active})
                .returning('*')
                .then(([data])=>data)
            }
        },
        toggleActive: {
            type: MerchantType,
            description : 'Bulk update merchants to active status',
            args: {
                startid: {type: GraphQLNonNull(GraphQLInt)},
                endid : {type:GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, {startid, endid}){
                return db('merchants')
                .where('id','>=', startid)
                .andWhere('id','<=' ,endid)
                .update({is_active: true})
            }
        }
    })
})

const myschema = new GraphQLSchema({
    query:RootQueryType,
    mutation: RootMutationType
})


module.exports = myschema