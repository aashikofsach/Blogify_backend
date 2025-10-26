import { validateToken } from "../services/authentication.js";

  function checkForAuthenticationCookie(cookieName)
{
    return (req, res, next) =>{

        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue)
        {
            next()
        }
        try {
            
        const userpayLoad = validateToken(tokenCookieValue)
req.user = userpayLoad

            
        } catch (error) {
            
        }
                    next()


    }
}

export default checkForAuthenticationCookie;