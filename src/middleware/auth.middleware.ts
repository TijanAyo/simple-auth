import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

declare global{
    namespace Express {
        interface Request {
            user: any
        }
    }
}

class AuthMiddleware {
    public async authorize(req: Request, res: Response, next: NextFunction) {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload
                req.user = (await prisma.user.findUnique({ where: { id: decoded.id }}))
                next();

            } catch(err) {
                //console.error(err as string)
                return res.status(401).json({
                    message: "Not Authorized(Token Expired), Please login to continue",
                });
            }
        } else {
            return res.status(401).json({
                message: "Not authorized (Token not found)"
            });
        }
    }

}

export default AuthMiddleware;