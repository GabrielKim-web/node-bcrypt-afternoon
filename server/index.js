require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const authCtrl = require('./controller/authController');
const treasureCtrl = require('./controller/treasureController');
const auth = require('./middleware/authMiddleware');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());

app.use(session({
   secret: SESSION_SECRET,
   resave: true,
   saveUninitialized: false,
}))

massive(CONNECTION_STRING).then(db => {
   app.set('db', db);
   console.log('DB connected');
})

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/api/treasure/user',auth.usersOnly, treasureCtrl.addUserTreasure);
app.get('/auth/logout', authCtrl.logout);
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure);
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure);

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`))