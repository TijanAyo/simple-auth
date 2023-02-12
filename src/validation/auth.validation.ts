import Joi from "joi";

export const signUpSchema = Joi.object({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    password: Joi.string().min(6).max(20).required()
});

export const signInSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(20).required()
});