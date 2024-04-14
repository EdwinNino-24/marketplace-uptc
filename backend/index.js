import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import mysql from 'mysql';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post('/crear-cuenta', (req, res) => {
  const formData = req.body;

  const names = formData.names;
  const lastnames = formData.lastnames;
  const email = formData.email;
  const password = formData.password;
  const code = Math.floor(100000 + Math.random() * 900000);

  console.log('Nombres:', names);
  console.log('Apellidos:', lastnames);
  console.log('Correo electrónico:', email);
  console.log('Contraseña:', password);

  const newUser = {
    ID_NEW_USER: email,
    NAMES_NEW_USER: names,
    LASTNAMES_NEW_USER: lastnames,
    PASSWORD_NEW_USER: password,
    CODE_ACTIVATION_NEW_USER: code
  };
  insertNewUser(newUser, email, code, res, (err) => {
    
  });
});

async function send_mail(to,code) {
  const config = {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: 'servicemarketplaceu@gmail.com',
          pass: 'pmna eyho ijzy gmil'
      }
  }

  const codigoAutenticacion = code;

  const mensaje = {
      from: 'servicemarketplaceu@gmail.com',
      to: to + '@uptc.edu.co',
      subject: 'Confirma tu Cuenta de MARKETPLACE - UPTC',
      text: `Tu código de autenticación que debes ingresar es: ${codigoAutenticacion}`
  }

  const transport = nodemailer.createTransport(config);

  try {
      const info = await transport.sendMail(mensaje);
      console.log('Correo enviado:', info);
  } catch (error) {
      console.error('Error al enviar el correo:', error);
  }
}

app.post('/code_activation', (req, res) => {
  const code = req.body;

  console.log('Código:', code.numericValue);

  getUserAuth(code.numericValue, res);

});

const newUserAuth = {
  ID_NEW_USER: "",
  NAMES_NEW_USER: "",
  LASTNAMES_NEW_USER: "",
  PASSWORD_NEW_USER: "",
  CODE_ACTIVATION_NEW_USER: null
};

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'marketplace_uptc'
});

function openConnection(callback) {
  connection.connect(err => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

function closeConnection(callback) {
  connection.end(err => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}


function insertNewUser(newUser, email, code, res) {
  connection.query('SELECT ID_USER FROM USERS WHERE ID_USER = ?', newUser.ID_NEW_USER, (error, results, fields) => {
    if (error) {
      console.error('Error al verificar el ID_NEW_USER en la tabla USERS:', error);
      return;
    }
    if (results.length > 0) {
      const message = '¡Ya hay una cuenta registrada con el usuario institucional ingresado!';
      console.log(message);
      res.send(message);
      return;
    }
    connection.query('SELECT * FROM NEW_USERS WHERE ID_NEW_USER = ?', newUser.ID_NEW_USER, (error, results, fields) => {
      if (error) {
        console.error('Error al verificar el ID_NEW_USER en la tabla NEW_USERS:', error);
        return;
      }
      if (results.length > 0) {
        connection.query('UPDATE NEW_USERS SET NAMES_NEW_USER = ?, LASTNAMES_NEW_USER = ?, PASSWORD_NEW_USER = ?, CODE_ACTIVATION_NEW_USER = ? WHERE ID_NEW_USER = ?', [newUser.NAMES_NEW_USER, newUser.LASTNAMES_NEW_USER, newUser.PASSWORD_NEW_USER, newUser.CODE_ACTIVATION_NEW_USER, newUser.ID_NEW_USER], (error, results, fields) => {
          if (error) {
            console.error('Error al actualizar el CODE_ACTIVATION_NEW_USER en la tabla NEW_USERS:', error);
            return;
          }
          send_mail(email,code);
          console.log('El ID_NEW_USER ya existe en la tabla NEW_USERS, se ha actualizado el campo CODE_ACTIVATION_NEW_USER');
          res.send("pa dentro");
        });
      } else {
        connection.query('INSERT INTO NEW_USERS SET ?', newUser, (error, results, fields) => {
          if (error) {
            console.error('Error al insertar un nuevo usuario en la tabla NEW_USERS:', error);
            return;
          }
          send_mail(email,code);
          console.log('Nuevo usuario insertado en la tabla NEW_USERS');
          res.send("pa dentro");
        });
      }
    });
  });
}

function getUserAuth(code, res){
  connection.query('SELECT * FROM NEW_USERS WHERE CODE_ACTIVATION_NEW_USER = ?', code, (err, results) => {
    if (results.length === 0) {
      console.log('Usuario no encontrado');
      res.send("¡El código que ingresaste no fue el que te enviamos!");
    }
    else{
      const usuarioEncontrado = results[0];
      console.log('Usuario encontrado:', usuarioEncontrado);
      
      newUserAuth.ID_NEW_USER = usuarioEncontrado.ID_NEW_USER;
      newUserAuth.NAMES_NEW_USER = usuarioEncontrado.NAMES_NEW_USER;
      newUserAuth.LASTNAMES_NEW_USER = usuarioEncontrado.LASTNAMES_NEW_USER;
      newUserAuth.PASSWORD_NEW_USER = usuarioEncontrado.PASSWORD_NEW_USER;
      newUserAuth.CODE_ACTIVATION_NEW_USER = usuarioEncontrado.CODE_ACTIVATION_NEW_USER;

      insertUser();
      deleteNewUser(newUserAuth.ID_NEW_USER);
      res.send("¡Tu cuenta se ha creado exitosamente!");
    }
  });
}

function insertUser() {
  const newRegisterUser = {
    ID_USER: newUserAuth.ID_NEW_USER,
    CREATION_DATE_USER: new Date(),
    CODE_CONFIRMATION_USER: newUserAuth.CODE_ACTIVATION_NEW_USER,
    NAMES_USER: newUserAuth.NAMES_NEW_USER,
    LAST_NAMES_USER: newUserAuth.LASTNAMES_NEW_USER,
    EMAIL_USER: newUserAuth.ID_NEW_USER + "@uptc.edu.co",
    PASSWORD_USER: newUserAuth.PASSWORD_NEW_USER,
    CODE_SECURITY_USER: Math.floor(100000 + Math.random() * 900000)
  };
  connection.query('INSERT INTO USERS SET ?', newRegisterUser, (err, results) => {
    
  });
}

function deleteNewUser(userId) {
  connection.query('DELETE FROM NEW_USERS WHERE ID_NEW_USER = ?', userId, (err, results) => {
    
  });
}

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



