// dependency imports
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

//relative imports
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

//Necessery to connect to dn before server
mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server is running as ${res.url}`);
    });