const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    rules: {
        escapeHTML: {
            validate (value,helpers) {
                const clean = sanitizeHtml(value,{
                    allowedTags: [],
                    allowedAttributes: {}
                });
                if (clean !== value) return helpers.error('string.escapeHTML', {value})
                return clean;
            }
        },
        phoneValidate: {
            validate (value,helpers) {
                const phoneRegex = new RegExp('[0-9 +-]*');
                if (phoneRegex.test(value)) return value
                else return helpers.error('string.phoneValidate', {value});
            }
        }
    },
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML',
        'string.phoneValidate': '{{#label}} must be a phone number with optional "+" / "-" / " "'
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.messageSchema = Joi.object({
    name: Joi.string().required().escapeHTML().min(2).max(100),
    email: Joi.string().required().escapeHTML().email().max(200),
    phone: Joi.string().escapeHTML().min(6).max(50).phoneValidate().allow(null,''),
    messageDetail: Joi.string().required().escapeHTML().max(1000)
})