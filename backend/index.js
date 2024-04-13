import express from 'express';
import cors from 'cors';

const app = express();

// Middleware para permitir solicitudes desde cualquier origen
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta para manejar la solicitud POST del formulario
app.post('/crear-cuenta', (req, res) => {
  // Aquí puedes manejar la lógica para procesar los datos del formulario
  const formData = req.body;
  console.log(formData); // Puedes imprimir los datos del formulario en la consola
  // Luego, puedes enviar una respuesta al cliente, por ejemplo:
});

// Iniciar el servidor en el puerto 5000
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



