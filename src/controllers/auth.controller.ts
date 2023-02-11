import { Request, Response } from "express";
import AuthService from "../services/auth.service";

const authService = new AuthService();

class AuthController {

    public async signUp(req: Request, res: Response) {
        const response = await authService.signUp(req.body);
        return res.json(response);
    }

    public async signIn(req: Request, res: Response) {
        const response = await authService.signIn();
        return res.json(response);
    }
}
export default AuthController;