import { PrismaClient } from "@prisma/client";
import { AuthDto } from "../types";
import { signUpSchema } from "../validation";
import * as bcrypt from "bcrypt";


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
                const validatedUserInput = await signUpSchema.validateAsync(payload);
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

    public async signIn() {
        return 'I am signIn route';
    }

    private async hashPassword(password:string): Promise<string> {
        const saltOrRounds= process.env.SALT;
        return await bcrypt.hash(password, Number(saltOrRounds));
    }
}
export default AuthService;