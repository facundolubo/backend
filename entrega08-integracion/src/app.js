import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.get("/", (req, res) => {
    res.cookie('oreo', 'chocolate').send('cookie set');
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})
