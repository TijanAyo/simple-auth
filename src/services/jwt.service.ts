import * as jwt from "jsonwebtoken";
export class JwtService {

    public async generateAccessToken(params: { id: string, email: string }): Promise<string> {
        const secret = process.env.ACCESS_TOKEN_SECRET as string;
        return jwt.sign(params, secret, { expiresIn: '30s'});
    }

    public async generateRefreshToken(user: { id: string, email: string}) {
        const secret = process.env.REFRESH_TOKEN_SECRET as string;
        return jwt.sign(user, secret);
    }

    public async verfiyToken() {}
}