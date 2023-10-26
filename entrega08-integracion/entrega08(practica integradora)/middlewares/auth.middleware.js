export const auth = (req, res, next) => {
    if (req.session.user?.role === 'admin') {
        res.send('Welcome admin ' + req.session.user.username);
    }
    else {
        res.send('public access (not admin)');
    }
}