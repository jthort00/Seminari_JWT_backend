import pkg from "jsonwebtoken";
const { sign, verify } = pkg;   //Importamos las funciones sign y verify de la librería jsonwebtoken
const JWT_SECRET = process.env.JWT_SECRET || "token.010101010101";

//No debemos pasar información sensible en el payload, en este caso vamos a pasar como parametro el ID del usuario
const generateToken = (id:string) => {
    const jwt = sign({id}, JWT_SECRET, {expiresIn: '30s'});
    return jwt;
};

const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
};

const generateRefreshToken = (id: string) => {
    const refreshToken = sign({ id }, JWT_SECRET, { expiresIn: '7d' }); // Refresh token valid for 7 days
    return refreshToken;
};

export { generateToken, verifyToken, generateRefreshToken };