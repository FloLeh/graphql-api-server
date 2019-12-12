var express = require('express');
var express_graphql = require('express-graphql');
var {buildSchema} = require('graphql');


var actorsData = [
    {
        id: 1,
        name: 'Tom Cruise',
        description: 'American Actor'
    },
    {
        id: 2,
        name: 'Brad Pitt',
        description: 'Another american actor'
    },
    {
        id: 3,
        name: 'Alain Chabat',
        description: 'This one is french'
    },

];


// GraphQL Schema
var schema = buildSchema(`
    type Query {
        actor(id: String): Actor
        actors(): [Actor]
    }
    type Actor {
        id: String
        name: String
        description: String
    }
`);

var getActor = function(args) {
    var id = args.id;
    return actorsData.filter(actor => {
        return actor.id == id;
    })[0];
};

var getActors = function(args) {
    if (args.name) {
        var name = args.name;
        return actorsData.filter(actors => actor.name == name);
    }
    else{
        return actorsData;
    }
};

//Root resolver
var root = {
    actor: getActor,
    actors: getActors
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running on Localhost:4000/graphql'));

