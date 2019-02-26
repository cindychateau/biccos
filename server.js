const http = require('http');
const express = require('express');
const methodOverride = require('method-override');
const validator = require('express-validator');
const basicAuth = require('express-basic-auth');
const config = require('./config');

var app = express();

app.use(methodOverride());
// ## CORS
app.use(function (req, res, next) {
    res.header("Content-Type", 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.use(basicAuth({
    users: config.server.basic_auth_users,
    unauthorizedResponse: getUnauthorizedResponse
}));

function getUnauthorizedResponse(req) {
    if (!req.auth) {
        var authRes = {
            "result": "false",
            "errormsg": "Unauthenticated"
        };
        return JSON.stringify(authRes);
    } else {
        var authRes = {
            "result": "false",
            "errormsg": "Invalid credentials"
        };
        return JSON.stringify(authRes);
    }
}

port = process.env.PORT || config.server.port;
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(validator());

var routes = require('./api/routes/apiRoutes');
routes(app);

var httpServer = http.createServer(app);

console.log("listen on port ", port);
httpServer.listen(port);