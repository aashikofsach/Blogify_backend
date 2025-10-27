import { validateToken } from "../services/authentication.js";

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {

        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next()
        }
        try {

            const userpayLoad = validateToken(tokenCookieValue)
            req.user = userpayLoad


        } catch (error) {

        }
       return next()


    }
}

export default checkForAuthenticationCookie;