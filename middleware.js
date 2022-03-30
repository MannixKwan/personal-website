const {messageSchema} = require('./schema.js');

module.exports.validateMessage = (req,res,next) => {
    const { error } = messageSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        res.status(400).send({
            status: 400,
            success: false,
            message: msg
        })
    } else {
        next()
    };
}