import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.listen(5000, ()=>console.log("app is running"));

app.get("/getdata", (req,res)=>{
  res.send("hello world")
})

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



