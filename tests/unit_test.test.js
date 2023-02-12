"use strict"
const { addMocksToSchema } = require("@graphql-tools/mock")
const { graphql } = require("graphql")
const myschema = require("../schema/schema")

//Mock values inserted into schema for testing
const mocks = {
  String: () => "teststring",
  Boolean: () => false,
  Int: () => 10,
  Latitude: () => 78.24,
  Longitude: () => 48.12,
}

const schemaWithMocks = addMocksToSchema({ schema: myschema, mocks })

//Testing latitude for a single merchant
test("", async () => {
  const query = `
    query RootQueryType {
        merchant(id: 5) { 
            latitude
        }
      }
    `
  const result = await graphql(schemaWithMocks, query)
  expect(result.data.merchant.latitude).toBe(78.24)
})

//Testing longitude for a single merchant
test("", async () => {
  const query = `
      query RootQueryType {
          merchant(id: 5) { 
              longitude
          }
        }
      `
  const result = await graphql(schemaWithMocks, query)
  expect(result.data.merchant.longitude).toBe(48.12)
})

//Testing is_active for a single merchant
test("", async () => {
  const query = `
        query RootQueryType {
            merchant(id: 5) { 
                is_active
            }
          }
        `
  const result = await graphql(schemaWithMocks, query)
  expect(result.data.merchant.is_active).toBe(false)
})

//Testing merchant_name for a single merchant
test("", async () => {
  const query = `
          query RootQueryType {
              merchant(id: 5) { 
                  merchant_name
              }
            }
          `
  const result = await graphql(schemaWithMocks, query)
  expect(result.data.merchant.merchant_name).toBe("teststring")
})
