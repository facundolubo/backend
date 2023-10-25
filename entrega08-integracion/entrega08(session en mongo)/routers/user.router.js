import { auth } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send('<a href="/login">login</a> | | <a href="/logout">logout</a> || <a href="/set-cookie">set-cookie</a>');
})
router.get("/set-cookie", (req, res) => {
    const user = {
        username: 'facundo',
        role: 'admin',
        id: 1
    }
    req.session.user = user;
    res.send('cookie set');
})

router.get("/login", auth)

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        else {
            res.send('logout ok');
        }
    });
})

export default router;