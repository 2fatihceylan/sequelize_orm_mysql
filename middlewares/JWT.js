const {sign, verify} = require('jsonwebtoken');


const createTokens = (user) =>{
    const accessToken = sign(
        {
            username: user.username,
            id: user.id
        },
        process.env.JWT_TOKEN_SECRET
    );

    return accessToken;
}


const validateToken = (request, response, next) => {

    const accessToken= request.cookies['access-token'];

    if(!accessToken){
        return response.status(400).json({error: 'User Not Authenicated'});
    }

    try {
        const validToken = verify(
            accessToken,
            process.env.JWT_TOKEN_SECRET
        )

        if(validToken){
            request.authenticated = true;

            return next();
        }
    } catch (error) {
        return response.status(400).json({error: error});
    }
}


module.exports = {createTokens, validateToken}