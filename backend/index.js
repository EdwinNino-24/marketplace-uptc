const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { getPublication, getPublications, getProductsPosts, getServicesPosts, getMyPosts, getPostsBySearch } = require('./postsService.js');
const { insertPost, editPost, updateStatePost } = require('./postService.js');

const { bucket } = require('./firebaseConfig.js');


const userRoutes = require('./routes/userRoutes');
const getRoutes = require('./routes/getRoutes');
const registerRoutes = require('./routes/registerRoutes');
const recoverRoutes = require('./routes/recoveryRoutes.js');
const postsRoutes = require('./routes/postsRoutes.js');
const postRoutes = require('./routes/postRoutes.js');


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(getRoutes);
app.use(registerRoutes);
app.use(recoverRoutes);
app.use(postsRoutes);
app.use(postRoutes);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });








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
  console.log('Marketplace UPTC - Backend Desplegado!!!');
});
