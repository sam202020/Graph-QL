var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
  buildSchema
} = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    roll(numRolls: Int!): [Int]
  }
  type Query {
    hello: String
    quoteOfTheDay: String
    random: Float!
    getDie(numSides: Int): RandomDie
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollDice: function ({numDice, numSides}) {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');