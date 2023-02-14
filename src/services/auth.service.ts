import { PrismaClient } from "@prisma/client";
import { AuthDto, signInDto } from "../types";
import { signUpSchema, signInSchema } from "../validation";
import * as bcrypt from "bcrypt";
import { JwtService } from "./jwt.service";


const prisma = new PrismaClient();
const jwt = new JwtService();
class AuthService {
    public async signUp(payload: AuthDto): Promise<{ message: string, statusCode: number }> {
        try {
            const foundUser = await prisma.user.findUnique({
                where: {
                  email: payload.email
                }
            });
            if (!foundUser) {
                // validate user input
                await signUpSchema.validateAsync(payload);
                // Hash user password
                const hashpassword = await this.hashPassword(payload.password);
                // Create user
                await prisma.user.create({
                    data: {
                        email: payload.email,
                        name: payload.name,
                        password: hashpassword,
                    }
                });
                return { message: `Signup was successful`, statusCode: 200}
            } else {
                return { message: "A user with this email exist.", statusCode: 400};
            }
        } catch (err:any) {
            // Catch error from Zod validation library
            return { message: err.message, statusCode: err.statusCode || 500};
        }
    }

    public async signIn(payload: signInDto) {
        try {
            // Validate the user input
            await signInSchema.validateAsync(payload);
            // Check if the user exist
            const foundUser = await prisma.user.findUnique({ where: { email: payload.email }});
            // if the user exist compare the password that was given with the password provided
            if (!foundUser) return { message: "User not found... Check email and try again", statusCode: 404}  
            const isMatch = await this.comparePassword(payload.password, foundUser.password);
            if (!isMatch) return { message: "Password does not match", statusCode: 401}
            const tokenArgs = { id: foundUser.id, email: foundUser.email };
            const accessToken = await jwt.generateAccessToken(tokenArgs);
            const refreshToken = await jwt.generateRefreshToken(tokenArgs);

            return { "accessToken": accessToken, "refreshToken": refreshToken }

        } catch(err:any) {
            return { message: err.message, statusCode: err.statusCode || 500};
        }
    }

    private async hashPassword(password:string): Promise<string> {
        const saltOrRounds= process.env.SALT;
        return await bcrypt.hash(password, Number(saltOrRounds));
    }

    private async comparePassword(password: string, hash: string): Promise<boolean> {
        // compare user password with hashpassword
        return await bcrypt.compare(password, hash);
    }
}
export default AuthService;