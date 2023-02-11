const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const app = express();
const config = require("./config")


app.use(express.json());
app.listen(config.port, () => console.log(`Server is listening on  ${config.port}`))