import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRouter from './routers/user.router.js';
import login_mongo from '../../../../mongo/login_mongo.js';


await login_mongo();

const USER = process.env.MONGO_USER;
const PASS = process.env.MONGO_PASS;

const app = express();
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${USER}:${PASS}@cluster0.jv8xqu9.mongodb.net/`,
        dbName: 'sessions'
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use('/', userRouter);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});