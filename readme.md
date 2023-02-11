Project Introduction 
This project involves setting up a backend for storing and querying merchant information, for the Bipi full stack engineer assessment. 

Tech Stack used:
1) Database - postgresql 
2) Knex.js for database management, seeding and query builder
3) Node.js + Express - Backend server 
4) Graphql - API query language

Notes: 
1) The backend is currently setup for development only - future update to include config option for production as well
2) Error handling will be included in future updates.
3) Default dev port is set to 8080.

Steps to get the backend running:
1) Install all required packages via : 
    npm install

2) Start your postgres server 

3) Create your database - Default used is bipiassessment  

4) Update the development config with your own info in db/knexfile.js :
    {database : yourdatabase,
    user: yourname,
    password: yourpassword}

5) Update your personal development settings (ie. port) in config/index.js

6) Start the backend server via 
    npm run dev 

7) Create the database merchant table via knex using the following command: 
    npm run migrate 

8) Seed the merchant table via knex using the following command:
    npm run seed

9) To access the query builder (GraphiQL), open your browser (replace the 8080 with your specified port) : 
    http://localhost:8080/graphql