export default function (res, req, next) {
    console.log(res.cookies.token);
    const isAuth = res.cookies.token ? true : false
    console.log(isAuth);
    req.locals.token = isAuth
    next()
}