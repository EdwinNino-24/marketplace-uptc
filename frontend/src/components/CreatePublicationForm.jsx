import React, { useState } from 'react';

import '../styles/CreatePublicationForm.css';
import '../styles/Notification.css';

import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Modal from 'react-modal';

const CreatePublicationForm = () => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const [numericValue, setNumericValue] = useState('');

    const [images, setImages] = useState([]);

    const uploadImages = async (id) => {
        try {
            const formData = new FormData();
            images.forEach((image, index) => {
                formData.append('images', image);
            });

            formData.append('id', id);

            const response = await fetch('http://localhost:5000/uploadImages', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            } else {
                console.error('Error al subir las imágenes:', response.statusText);
            }
        } catch (error) {
            console.error('Error al subir las imágenes:', error.message);
        }
    };

    const onDrop = (acceptedFiles) => {
        console.log(formData);
        const newImages = acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setImages([...images, ...newImages]);
    };

    const removeImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const formatToColombianPesos = (value) => {
        const formattedValue = Number(value).toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP'
        });

        return formattedValue;
    }

    const [formData, setFormData] = useState({
        title: '',
        type: '',
        category: '',
        description: '',
        price: '',
        location: '',
        token: localStorage.getItem('token')
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        });
    };

    const handleNumericChange = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        value = value.slice(0, 10);
        setFormData({
            ...formData,
            price: value
        });
        setNumericValue(value);
    };


    const handleSubmit = async (event) => {
        if (images.length > 0) {
            event.preventDefault();

            try {
                const response = await fetch('http://localhost:5000/create_post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData) // Utiliza el objeto formData
                });

                if (response.ok) {
                    const data = await response.json();
                    const id_post = data.id_post;
                    uploadImages(id_post);
                    setMensaje("¡La publicación se ha creado exitosamente!");
                    setModalCreatePostIsOpen(true);
                } else {
                    console.error('Error al enviar el formulario:', response.statusText);
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error.message);
            }
        } else {
            console.log('No sea nuv, cargue una imagen');
        }
    };

    const [canPublish, setCanPublish] = useState(false);

    const handleImageChange = (event) => {
        if (images.length === 0) {
            setModalIsOpen(true);
        }
        const hasImages = images.length > 0;
        setCanPublish(hasImages);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOK = () => {
        setModalIsOpen(false);
    };

    const customStyles = {
        content: {
            width: '50%', // Cambia el porcentaje según tu preferencia
            height: '30%', // Cambia el porcentaje según tu preferencia
            margin: 'auto', // Para centrar el modal horizontalmente
            backgroundColor: 'white', // Color de fondo del modal
        },
    };

    const [mensaje, setMensaje] = useState('');
    const [modalCreatePostIsOpen, setModalCreatePostIsOpen] = useState(false);
    const handleConfirmationCreatePost = () => {
        setModalCreatePostIsOpen(false);
        window.location.href = '/my-publications-page';
    };

    return (
        <div className="bg_create_publication">
            <header className="header">
                <h2 className="title_create_publication">MARKETPLACE - UPTC</h2>
            </header>
            <div className='body_create_publication'>
                <div className='wrapperCreatePublication'>
                    <form onSubmit={handleSubmit}>
                        <div className='title_new_create_publication'>
                            <FaArrowAltCircleLeft className='iconBack' color='black' size='50px' onClick={handleBack} />
                            <h1>CREA UNA NUEVA PUBLICACIÓN</h1>
                        </div>
                        <div className='box-create-publication'>
                            <div className='panel-left'>
                                <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                                    <input {...getInputProps()} />
                                    <p className='box_images'>¡Arrastra y suelta tus imágenes aquí, o haz clic para cargarlas!</p>
                                </div>
                                <div className="image_preview">
                                    {images.map((image, index) => (
                                        <div key={index} className="image_container">
                                            <img src={image.preview} className='preview_image' alt={`Imagen ${index}`} />
                                            <button className="button_remove" onClick={() => removeImage(index)}>Eliminar</button>
                                        </div>
                                    ))}
                                </div>
                                {images.length === 0 && (
                                    <p className="box_images2">Al menos una imagen es obligatoria</p>
                                )}
                            </div>
                            <div className='panel-right'>
                                <input type="text" className="title_publication"
                                    onChange={handleChange} name='title' value={formData.title}
                                    placeholder='Título de la Publicación' required />
                                <select required className="combo_box"
                                    onChange={handleChange} name='type'
                                    placeholder="Selecciona tu Tipo de Publicación" value={formData.type}>
                                    <option value="" disabled>Selecciona el Tipo</option>
                                    <option value="Producto">Producto</option>
                                    <option value="Servicio">Servicio</option>
                                </select>
                                <select required className="combo_box"
                                    value={formData.category} onChange={handleChange} name='category'>
                                    <option value="" disabled>Selecciona la Categoría</option>
                                    <option value="Ropa">Ropa</option>
                                    <option value="Tecnología">Tecnología</option>
                                    <option value="Accesorios">Accesorios</option>
                                    <option value="Tutorías">Tutorías</option>
                                    <option value="Comida">Comida</option>
                                    <option value="Otros">Otros</option>
                                </select>
                                <textarea
                                    required
                                    className='area_description'
                                    style={{ resize: 'none' }}
                                    placeholder='Ingresa una breve descripción de tu producto o servicio.'
                                    value={formData.description} onChange={handleChange} name='description'
                                />
                                <input
                                    className='price_publi1'
                                    type="text"
                                    value={formData.price}
                                    onChange={(e) => {
                                        handleNumericChange(e);
                                    }}
                                    name='price'
                                    placeholder='Define el precio'
                                    required
                                />
                                <input
                                    className='price_publi2'
                                    type="text"
                                    value={formatToColombianPesos(numericValue)}
                                    onChange={handleNumericChange}
                                    disabled
                                />
                                <select required className="combo_box"
                                    value={formData.location} onChange={handleChange} name='location'>
                                    <option value="" disabled>Selecciona la Sede o Seccional</option>
                                    <option value="Central">Sede Central</option>
                                    <option value="Duitama">Seccional Duitama</option>
                                    <option value="Sogamoso">Seccional Sogamoso</option>
                                    <option value="Aguazul">Seccional Aguazul</option>
                                    <option value="Chiquinquirá">Seccional Chiquinquirá</option>
                                </select>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={() => setModalIsOpen(true)}
                                    contentLabel="Notificación"
                                    style={customStyles}
                                >
                                    <div className='notification'>
                                        <h1 className='title_notification'>Atención</h1>
                                        <h2 className='subtitle_notification'>¡Cargue al menos una imagen para crear tu publicación!</h2>
                                        <div className='button_notification'>
                                            <button className="ok_notification" onClick={handleOK}>Continuar</button>
                                        </div>
                                    </div>
                                </Modal>
                                <Modal
                                    isOpen={modalCreatePostIsOpen}
                                    onRequestClose={() => setModalCreatePostIsOpen(true)}
                                    contentLabel="Notificación"
                                    style={customStyles}
                                >
                                    <div className='notification'>
                                        <h1 className='title_notification'>Atención</h1>
                                        <h2 className='subtitle_notification'>{mensaje}</h2>
                                        <div className='button_notification'>
                                            <button className="ok_notification" onClick={handleConfirmationCreatePost}>Continuar</button>
                                        </div>
                                    </div>
                                </Modal>
                                <button className="button_publicate" onMouseOver={handleImageChange} type='submit' disabled={!canPublish}>PUBLICAR</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default CreatePublicationForm
