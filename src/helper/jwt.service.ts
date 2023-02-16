import * as jwt from "jsonwebtoken";

class JwtService {

    public async generateToken(params: { id: string, email: string }): Promise<string> {
        const secret = process.env.ACCESS_TOKEN_SECRET as string;
        return jwt.sign(params, secret, { expiresIn: '50s'});
    }
}

export default JwtService;