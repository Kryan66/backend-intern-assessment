const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),
});

module.exports = { postSchema };
