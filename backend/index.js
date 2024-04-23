const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { login } = require('./authService.js');
const { verifyToken } = require('./jwtService.js');
const { createAccount } = require('./newUserService.js');
const { activateAccount } = require('./activationService.js');
const { searchAccountRecover, recoverAccount } = require('./recoveryService.js');
const { enterPasswordRecover } = require('./passwordResetService.js');

const { getPublication, getPublications, getProductsPosts, getServicesPosts } = require('./postsService.js');
const { insertPost } = require('./postService.js');

const { bucket } = require('./firebaseConfig.js');


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
  createAccount(formData, res);
});

app.post('/code_activation', (req, res) => {
  activateAccount(req, res);
});

app.post('/search_account_recover', (req, res) => {
  searchAccountRecover(req, res);
});

app.post('/recover_account', (req, res) => {
  recoverAccount(req, res);
});

app.post('/enter_password_recover', (req, res) => {
  enterPasswordRecover(req, res); 
});


app.get('/publications', getPublications);

app.get('/products_posts', getProductsPosts);

app.get('/services_posts', getServicesPosts);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  }
});

app.get('/publications/:id', getPublication);

const upload = multer({ storage });

app.post('/get_post_images', async (req, res) => {
  try {
      const folderPath = req.body.folderPath; 

      const [files] = await bucket.getFiles({ prefix: folderPath });
      const urls = await Promise.all(
          files.map(async (file) => {
              const [url] = await file.getSignedUrl({
                  action: 'read',
                  expires: '03-01-2500', 
              });
              return url;
          })
      );
      res.json({ image: urls });

  } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Error fetching images' });
  }
});

const { queryDatabase } = require('./databaseService.js');

const fetchPublications = () => {
  return new Promise((resolve, reject) => {
    queryDatabase('SELECT * FROM PUBLICATIONS', (error, results, fields) => {
      if (error) {
        console.error('Error al obtener las publicaciones desde la base de datos:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

app.get('/get_random_images', async (req, res) => {
  try {
    const publications = await fetchPublications();
    const randomImages = await Promise.all(
      publications.map(async (publication) => {
        const folderPath = publication.ID_PUBLICATION;

        const [files] = await bucket.getFiles({ prefix: folderPath });

        if (files.length > 0) {
          // Obtener un índice aleatorio dentro del rango de archivos
          const randomIndex = Math.floor(Math.random() * files.length);
          // Obtener el archivo aleatorio
          const randomFile = files[randomIndex];
          // Obtener la URL firmada del archivo aleatorio
          const [url] = await randomFile.getSignedUrl({
            action: 'read',
            expires: '03-01-2500',
          });
          
          return { folderName: folderPath, imageUrl: url };
        } else {
          // Si no hay imágenes en la carpeta, manejar el caso según tus necesidades
          return { folderName: folderPath, imageUrl: 'URL_POR_DEFECTO' };
        }
      })
    );

    // Una vez que se hayan obtenido todas las imágenes aleatorias, actualizar la base de datos
    randomImages.forEach(({ folderName, imageUrl }) => {
      const query = 'UPDATE PUBLICATIONS SET URL_IMAGE_PUBLICATION = ? WHERE ID_PUBLICATION = ?';
      queryDatabase(query, [imageUrl, folderName], (error) => {
        if (error) {
          console.error('Error al actualizar la URL de imagen:', error);
        } else {
          console.log('URL de imagen actualizada correctamente');
        }
      });
    });

    console.log(randomImages);
    res.json(randomImages);
  } catch (error) {
    console.error('Error al obtener las imágenes aleatorias de las publicaciones:', error);
    res.status(500).json({ message: 'Error al obtener las imágenes aleatorias de las publicaciones' });
  }
});





app.post('/create_post', (req, res) => {
  
  const post = {
    "title": req.body.title,
    "type": req.body.type,
    "category": req.body.category,
    "description": req.body.description,
    "price": req.body.price,  
    "location": req.body.location,
    "token": req.body.token
  }

  insertPost(post, res);
});

app.post('/uploadImages', upload.array('images', 5), async (req, res) => {
  try {

    const id = req.body.id;
    const folderPath = path.join(__dirname, 'uploads', id);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No se han recibido imágenes' });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      const newName = `${Date.now()}-${file.originalname}`;

      const fileSnapshot = await bucket.upload(file.path, {
        destination: `${id}/${newName}`,
      });

      const downloadURL = await fileSnapshot[0].getSignedUrl({
        action: 'read',
        expires: '01-01-3000', 
      });

      uploadedFiles.push(downloadURL[0]);
    }

    for (const file of req.files) {
      fs.unlinkSync(file.path);
    }

    res.json({ message: 'Imágenes subidas exitosamente', uploadedFiles });
  } catch (error) {
    console.error('Error al subir las imágenes:', error);
    res.status(500).json({ message: 'Error al subir las imágenes' });
  }
});

app.listen(5000, () => {
  console.log('Servidor Express corriendo en el puerto 5000');
});





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



