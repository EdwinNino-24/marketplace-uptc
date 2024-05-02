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

const { getPublication, getPublications, getProductsPosts, getServicesPosts, getMyPosts, getPostsBySearch } = require('./postsService.js');
const { insertPost, editPost, updateStatePost } = require('./postService.js');

const { getTypePosts, getCategories, getLocations, getStates } = require('./types.js');

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
  getUser(req, res);
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

app.get('/get_products_posts', async (req, res) => {
  try {
    await fetchRandomImages();
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las imágenes aleatorias de las publicaciones' });
  }

  await getProductsPosts(req, res);
});

app.get('/get_services_posts', async (req, res) => {
  try {
    await fetchRandomImages();
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las imágenes aleatorias de las publicaciones' });
  }

  await getServicesPosts(req, res);
});

app.post('/get_posts_by_search', async (req, res) => {
  await getPostsBySearch(req, res);
});



app.get('/publications/:id', (req, res) => {
  getPublication(req, res);
});


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


app.get('/get_type_offers', (req, res) => {
  getTypePosts(req, res);
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

app.get('/get_states', (req, res) => {
  getStates(req, res);
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

  insertPost(post, res);

});

app.post('/edit_post', (req, res) => {
  editPost(req, res);
});

app.post('/update_publication_state', (req, res) => {
  updateStatePost(req, res);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post('/delete_folder', async (req, res) => {
  const folderPath = req.body.folderPath;

  try {
    const [files] = await bucket.getFiles({ prefix: folderPath });
    const deletePromises = files.map(file => file.delete());
    await Promise.all(deletePromises);
    res.status(200).json({ message: 'Todos los archivos han sido eliminados' });
  } catch (error) {
    console.error('Error al eliminar archivos:', error);
    res.status(500).json({ message: 'Error al eliminar archivos' });
  }
});

app.post('/uploadImages', upload.array('images', 100), async (req, res) => {

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
      const newName = `${file.originalname}`;

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

app.post('/get_my_posts', async (req, res) => {
  try {
    await fetchRandomImages();
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las imágenes aleatorias de las publicaciones' });
  }

  await getMyPosts(req, res);
});





app.post('/uploadEditImages', upload.array('images', 100), async (req, res) => {
  const { id, removedUrls } = req.body;

  // Convertir removedUrls de JSON string a objeto JavaScript, si es necesario
  const urlsToDelete = JSON.parse(removedUrls || '[]');

  try {
    // Subir nuevos archivos y obtener URLs
    const uploadPromises = req.files.map(async file => {
      const newName = `${file.originalname}`; // Mantener el nombre original
      const destination = `${id}/${newName}`;
      const fileSnapshot = await bucket.upload(file.path, { destination });
      const [downloadURL] = await fileSnapshot[0].getSignedUrl({
        action: 'read',
        expires: '01-01-3000',
      });
      fs.unlinkSync(file.path); // Eliminar el archivo localmente después de subirlo
      return downloadURL;
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    // Eliminar imágenes antiguas
    const deletePromises = urlsToDelete.map(async (url) => {
      const fileName = url.split('/').pop().split('?')[0]; // Asumiendo que el nombre del archivo está al final de la URL
      await bucket.file(`${id}/${fileName}`).delete();
    });

    await Promise.all(deletePromises);

    res.json({ message: 'Imágenes subidas y actualizadas exitosamente', uploadedFiles });
  } catch (error) {
    console.error('Error al subir o eliminar imágenes:', error);
    res.status(500).json({ message: 'Error al subir o eliminar imágenes' });

    // Asegurar que todos los archivos temporales sean eliminados si algo falla
    req.files.forEach(file => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
  }
});







app.listen(5000, () => {
  console.log('Servidor Express corriendo en el puerto 5000');
});
