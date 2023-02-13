import { PrismaClient } from "@prisma/client";
import { AuthDto, signInDto } from "../types";
import { signUpSchema, signInSchema } from "../validation";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();
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
            if (!foundUser) {
                return { message: "User not found... Check email and try again", statusCode: 404}
            }
            const isMatch = await this.comparePassword(payload.password, foundUser.password);
            if (!isMatch) {
                return { message: "Password does not match", statusCode: 404}
            }
            const tokenArgs = { id: foundUser.id, email: foundUser.email };
            const token = await this.signToken(tokenArgs);
            return 'I am signIn route';

        } catch(err:any) {
            return { message: err.message, statusCode: err.statusCode || 500};
        }
    }

    private async hashPassword(password:string): Promise<string> {
        const saltOrRounds= process.env.SALT;
        return await bcrypt.hash(password, Number(saltOrRounds));
    }

    private async signToken(args: { id: string, email: string}): Promise<string> {
        // Send the user accessToken and refreshToken
        const payload = args;
        const secret = process.env.JWT_SECRET as string;
        return jwt.sign(payload, secret, { expiresIn: '1h' });;
    }

    private async comparePassword(password: string, hash: string): Promise<boolean> {
        // compare user password with hashpassword
        return await bcrypt.compare(password, hash);
    }
}
export default AuthService;