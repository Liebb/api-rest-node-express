const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

//Creando un middleware nativo de express
app.use(express.json());
//Habilitamos las solicitudes de cualquier ruta
const whiteList = ['http://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin){
      callback(null, true)
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

app.get('/',(req, res) =>{
  res.send('Respondiendo a la petición');
});
app.get('/new',(req, res) =>{
  res.send('Respondiendo a la petición desde new');
});

routerApi(app);
//Los middleware van siempre después del routing
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Estoy escuchando en el puerto => ${port}`);
})
