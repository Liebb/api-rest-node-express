const boom = require('@hapi/boom');

//Este es un middleware dinámico
function validatorHandler(schema, property){
  //Creando middleware dinámico
  return (req, res, next) => {
    const data = req[property];
    //AbortEarly me envía todos los errores en conjunto
    const {error} = schema.validate(data, { abortEarly: false});
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}
module.exports = validatorHandler;
