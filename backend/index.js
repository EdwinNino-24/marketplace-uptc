const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { login } = require('./authService.js');
const { decodedToken } = require('./jwtService.js');

const { createAccount, resendCodeActivation } = require('./newUserService.js');
const { activateAccount } = require('./activationService.js');

const { searchAccountRecover, recoverAccount, resendCodeRecovery } = require('./recoveryService.js');
const { enterPasswordRecover } = require('./passwordResetService.js');

const { getUser, validateUser, updatePersonalInformation, updatePassword } = require('./userService.js');

const { getPublication, getPublications, getProductsPosts, getServicesPosts, getMyPosts } = require('./postsService.js');
const { insertPost } = require('./postService.js');

const { getTypePosts, getCategories, getLocations } = require('./types.js');

const { fetchRandomImages } = require('./imageHandler.js');

const { bucket } = require('./firebaseConfig.js');


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.post('/login', (req, res) => {
  login(req, res);
});

app.post('/user_profile', (req, res) => {
  res.json({user: decodedToken(req.body.token)});
});

app.post('/crear-cuenta', (req, res) => {
  const formData = req.body;
  createAccount(formData, res);
});

app.post('/code_activation', (req, res) => {
  activateAccount(req, res);
});

app.post('/resend_code_activation', (req, res) => {
  resendCodeActivation(req, res);
});

app.post('/search_account_recover', (req, res) => {
  searchAccountRecover(req, res);
});

app.post('/recover_account', (req, res) => {
  recoverAccount(req, res);
});

app.post('/resend_code_recover', (req, res) => {
  resendCodeRecovery(req, res);
});

app.post('/enter_password_recover', (req, res) => {
  enterPasswordRecover(req, res); 
});


app.post('/personal_information', (req, res) => {
  getUser(req, res);
});

app.post('/change_personal_information', (req, res) => {
  updatePersonalInformation(req, res);
});

app.post('/change_password', (req, res) => {
  updatePassword(req, res);
});


app.get('/publications', getPublications);

app.get('/get_products_posts', (req, res) => {
  getProductsPosts(req, res);
});

app.get('/get_services_posts', (req, res) => {
  getServicesPosts(req, res);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  }
});

app.get('/publications/:id', (req, res) => {
  getPublication(req, res);
});

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


app.get('/get_random_images', async (req, res) => {
  try {
    await fetchRandomImages();
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las imágenes aleatorias de las publicaciones' });
  }
});





app.get('/get_type_offers', (req, res) => {
  getTypePosts(req, res);
});

app.get('/get_categories', (req, res) => {
  getCategories(req, res);
});

app.get('/get_locations', (req, res) => {
  getLocations(req, res);
});



app.post('/verify_current_user', (req, res) => {
  validateUser(req, res);
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

  console.log(post);

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

app.post('/get_my_posts', (req, res) => {
  getMyPosts(req, res);
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



