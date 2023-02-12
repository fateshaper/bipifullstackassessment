const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const app = express()
const config = require("./config")
const myschema = require("./schema/schema")

app.use(
  "/graphql",
  graphqlHTTP({
    schema: myschema,
    graphiql: true,
  })
)

app.use(express.json())
app.listen(config.port, () =>
  console.log(`Server is listening on  ${config.port}`)
)
