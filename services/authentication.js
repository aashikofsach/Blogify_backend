import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

 export function createTokenForUser(user)
{
    const payload = {
        id : user.id ,
        email : user.email,
        imageUrl : user.imageUrl,
        role :  user.role,

    };

    const token = jwt.sign(payload, secret);
    return token

}

export function validateToken(token)
{
    const payload = jwt.verify(token, secret);
    return payload
}