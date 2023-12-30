import jwt from 'jsonwebtoken';

export const createToken = (data) => { 
    let token = jwt.sign({data: data}, 'printerest', {algorithm: 'HS256'});
    return token;
}

export const getToken = () => { 
    
}

export const decodeToken = (token) => { 
    return jwt.decode(token)
}