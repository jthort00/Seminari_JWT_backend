import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handle.js";
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request {
    user?: string | JwtPayload;
}

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || null;
        const jwt = jwtByUser?.split(' ').pop();
        console.log(jwt);
        const isUser = verifyToken(`${jwt}`);
        
        if (!isUser) {
            return res.status(401).send("NO_TIENES_UN_JWT_VALIDO");
        }

        req.user = isUser; // `isUser` now contains `id` and `email`
        next();
    } catch (e) {
        console.error("Error en checkJwt:", e);
        return res.status(401).send("SESSION_NO_VALID");
    }
};

export { checkJwt };
