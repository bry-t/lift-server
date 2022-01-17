const Express = require('express');
const app = Express();
const dbConnection = require('./db');

app.use(Express.json());

const controllers = require('./controllers');

app.use('/workout', controllers.workoutController);
app.use('/user', controllers.userController)

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3500, () => {
            console.log(`[Server]: App is listening on 3500.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });
