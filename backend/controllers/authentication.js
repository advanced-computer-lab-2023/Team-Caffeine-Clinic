
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
     } else {
        return res.send(401);
     }
}

export default {
    ensureAuthenticated
}