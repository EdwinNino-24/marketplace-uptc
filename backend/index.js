import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { login } from './authService.js';
import { verifyToken } from './jwtService.js';
import { createAccount } from './newUserService.js';
import { activateAccount } from './activationService.js'; 
import { searchAccountRecover, recoverAccount } from './recoveryService.js';
import { enterPasswordRecover } from './passwordResetService.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  login(username, password, (error, result) => {
    if (error) {
      console.error('Error al autenticar usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }
    res.json(result);
  });
});

app.post('/user_profile', (req, res) => {
  const token = req.body.token;
  verifyToken(token, (err, decoded) => {
    if (err) {
      console.error('Error al decodificar el token:', err);
      res.status(401).json({ message: 'Token inválido' });
    } else {
      console.log('Token decodificado:', decoded);
      res.json({ user: decoded.username });
    }
  });
});

app.post('/crear-cuenta', (req, res) => {
  const formData = req.body;
  createAccount(formData, (error, message) => {
    if (error) {
      console.error('Error al crear la cuenta:', error);
      res.status(500).json({ message: 'Error al crear la cuenta' });
    } else {
      console.log(message);
      res.send(message);
    }
  });
});

app.post('/code_activation', (req, res) => {
  const code = req.body;
  activateAccount(code.numericValue, res);
});

app.post('/search_account_recover', (req, res) => {
  const id_user = req.body;
  searchAccountRecover(id_user.inputValue, res);
});

app.post('/recover_account', (req, res) => {
  const { numericValue } = req.body;
  recoverAccount(numericValue, res);
});

app.post('/enter_password_recover', (req, res) => {
  const { newPassword, token } = req.body;
  enterPasswordRecover(newPassword, token, res); 
});

app.listen(5000, () => {
  console.log('Servidor Express corriendo en el puerto 5000');
});

/*import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(5000, () => console.log('Servidor corriendo en el puerto 5000'));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Aquí puedes realizar la lógica de autenticación
  // Verificar si el nombre de usuario y la contraseña son válidos
  // Si son válidos, puedes devolver una respuesta con un token de autenticación
  // Si no son válidos, puedes devolver un error
  res.send('Solicitud de inicio de sesión recibida');
});*/


/*import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(5000, () => console.log("Servidor corriendo en el puerto 5000"));

app.post("/submitForm", (req, res) => {
  const { name, email } = req.body;
  // Aquí puedes procesar los datos recibidos del formulario como desees
  // Por ejemplo, podrías guardarlos en una base de datos
  res.send(`Hola ${name}, tu email ${email} ha sido recibido correctamente.`);
});
*/

/*import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.listen(5000, ()=>console.log("app is running"));

app.get("/getdata", (req,res)=>{
  res.send("hello world")
})*/

/*const db = require('./user_crud'); 

const newUser = {
    ID_USER: 'ramirez.ra06',
    CREATION_DATE_USER: new Date(), 
    CODE_CONFIRMATION_USER: 12345, 
    NAMES_USER: 'RAMIREZ',
    LAST_NAMES_USER: 'RAMIREZ',
    EMAIL_USER: 'ramirez.ra07@uptc.edu.co',
    PASSWORD_USER: 'ramirezcos123',
    CODE_SECURITY_USER: 67890
  };

  /*-------------------------CRUD-USERS----------------------------------*/
  /*
  db.insertUser(newUser, (err, resultado) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      return;
    }
    console.log('Usuario insertado correctamente');
  });
  */

  /*
  db.getUser('ramirez.ra07', (err, usuario) => {
    if (err) {
      console.error('Error al obtener usuario por ID:', err);
      return;
    }
    console.log('Usuario encontrado:', usuario);
  });
  */

  /*
  db.getUsers((err, usuarios) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return;
    }
    console.log('Usuarios:', usuarios);
  });
  */

  /*
  db.getId('ramirez.ra07', (err, usuario) => {
    if (err) {
      console.error('Error al obtener usuario por ID:', err);
      return;
    }
    console.log('Usuario encontrado:', usuario);
  });
  */

  /*
  db.getEmail('ramirez.ra07', (err, usuario) => {
    if (err) {
      console.error('Error al obtener usuario por ID:', err);
      return;
    }
    console.log('Usuario encontrado:', usuario);
  });
  */

  /*
  db.getPassword('ramirez.ra07', (err, usuario) => {
    if (err) {
      console.error('Error al obtener usuario por ID:', err);
      return;
    }
    console.log('Usuario encontrado:', usuario);
  });
  */

  /*
  db.updatePassword('ramirez.ra07', 'raaa', (err, resultado) => {
    if (err) {
      console.error('Error al modificar password del usuario:', err);
      return;
    }
    console.log('Password del usuario modificado correctamente');
  });
  */
 
  /*const publication = {
    ID_USER_SELLER: 'ramirez.ra07',
    CREATION_DATE_PUBLICATION: new Date(), 
    UPDATE_DATE_PUBLICATION: new Date(), 
    TITLE_PUBLICATION: 'Título de la publicación',
    URL_IMAGE_PUBLICATION: 'URL de la imagen de la publicación',
    STATE_PUBLICATION: 'Estado de la publicación',
    TYPE_PUBLICATION: 'Tipo de publicación',
    CATEGORY_PUBLICATION: 'Categoría de la publicación',
    DESCRIPTION_PUBLICATION: 'Descripción de la publicación',
    SELLER_LOCATION: 'Ubicación del vendedor',
    PRICE_PUBLICATION: 100 
  };*/

//const dbp = require('./publication_crud'); 

/*
dbp.insertPublication(publication, (err, resultado) => {
  if (err) {
    console.error('Error al insertar la publicación:', err);
    return;
  }
  console.log('Publicación insertada correctamente');
});
*/

/*
dbp.getPublications((err, publications) => {
  if (err) {
    console.error('Error al obtener publicaciones:', err);
    return;
  }
  console.log('Publicaciones:', publications);
});
*/



