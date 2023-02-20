import Joi from "joi";

export const postArticleSchema = Joi.object({
    title: Joi.string().required().min(5).max(200),
    content: Joi.string().required()
});

export const updateArticleSchema = Joi.object({
    title: Joi.string().min(5).max(200),
    content: Joi.string()
});