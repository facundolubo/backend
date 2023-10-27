import express from 'express';
import session from 'express-session';
import userRouter from './routers/user.router.js';
import login_mongo from '../../../../mongo/login_mongo.js';


const app = express();

try {
    const client = await login_mongo();
    await client.connect();
    console.log('MongoDB connected');
} catch (error) {
    console.log(error);
}

/*
const USER = process.env.MONGO_USER;
const PASS = process.env.MONGO_PASS;

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${USER}:${PASS}@cluster0.jv8xqu9.mongodb.net/`,
        dbName: 'sessions'
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
*/
app.use('/', userRouter);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});