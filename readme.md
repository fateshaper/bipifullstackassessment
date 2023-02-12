Project Introduction
This project involves setting up a backend for storing and querying merchant information, for the Bipi full stack engineer assessment.

Tech Stack used:

1. Database - postgresql
   - pg used for connection
2. Knex.js for database management, seeding and query builder
3. Node.js + Express - Backend web server
4. Graphql - API query language
   -express-graphql package was used for the express server to run the graphql API
   -Custom scalar types (Latitude/Longitude/Date Time) were used from the graphql-scalars pacakge
5. graphql-tools/mock and jest were used for testing purposes
6. No front-end - querying can be carried out via GraphiQL in the browser


Directory Setup 
```
-- Config
   --index.js     <--- Web server configuration (ie. port etc)
-- DB
   -- migrations  <-- Folder for all database knex migrations, including table creation
   -- seeds       <-- Folder containing files for database seeding 
   -- db.js       <-- Knex server creation file
   -- knexfile.js <-- Knex configuration file 
-- Middleware     <-- Placeholder folder for any middleware
-- Schema         <-- Folder for graphql schema - defining merchant object type and queries/mutations
-- Tests          <-- Sample unit tests
-- index.js       <-- Main file for starting web server 
```

Notes:
1. The server config is currently setup for development only - future update to include config option for production as well. Default local host port is set to 8080.
2. Small number of basic unit tests are included to illustrate how I would approach testing for the schema. For real life settings, integrations & end-to-end testing would be crucial as well.
3. For this exercise, GraphQL service was developed using a code-first approach. An alternative would be to use a schema-first approach (ie. SDL). There is an interesting discussion on the pros/cons of each approach beow
   https://blog.logrocket.com/code-first-vs-schema-first-development-graphql/
4. Refer to apiguide.md for a quick summary of the API's
5. Express-graphql was used for this project as it was a lightweight and easy framework to use.
   However, the Apollo server seems to have a lot of very useful functionality (testing, integration etc) that may be more useful in a real-world production setting.

Steps to get the server running:

1. Install all required packages via :
   ```
   npm install
   ```
2. Start your postgres server

3. Create your database - Default used is bipiassessment

4. Update the development config with your own info in db/knexfile.js :
   ```
   {database : yourdatabase,
   user: yourname,
   password: yourpassword}
   ```

5. Update your personal development settings (ie. port) in config/index.js

6. Start the backend server via
   ```
   npm run dev
   ```

7. Create the database merchant table via knex using the following command (ensure you are in bipi root folder):
   ```
   npm run migrate
   ```

8. Seed the merchant table via knex using the following command:
   ```
   npm run seed
   ```

9. To access the query builder (GraphiQL), open your browser (replace the 8080 with your specified port) :
   ```
   http://localhost:8080/graphql
   ```

10. To run unit tests
    ```
    npm run test
    ```