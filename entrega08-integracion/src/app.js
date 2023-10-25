import express from "express";
import session from "express-session";
import FileStore from "session-file-store";
//import cookieParser, { JSONCookies } from "cookie-parser";
//app.use(cookieParser('secret'));

const app = express();
const fileStore = new FileStore(session);

app.use(session({
    store: new fileStore ({
        path: './sessions',
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.get("/", (req, res) => {
    res.send('<a href="/login">login</a> | | <a href="/logout">logout</a> || <a href="/set-cookie">set-cookie</a>');
})
app.get("/set-cookie", (req, res) => {
    const user = {
        username: 'facundo',
        role: 'admin',
        id: 1
    }
    req.session.user = user;
    res.send('cookie set');
})

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send('Welcome ' + req.session.user.username);
    }
    else {
        res.send('public access');
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        else {
            res.send('logout ok');
        }
    });
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})
