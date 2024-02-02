export default function (res, req, next) {
    const isAuth = res.cookies.token ? true : false
    req.locals.token = isAuth
    next()
}