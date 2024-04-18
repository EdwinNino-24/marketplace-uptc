import React, { useState } from 'react';
import '../styles/EditPublicationForm.css';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";

const EditPublication = () => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [numericValue, setNumericValue] = useState('');

    const handleNumericChange = (event) => {
        const value = event.target.value;
        const regex = /^[0-9\b]+$/;
        if (value === '' || regex.test(value)) {
            setNumericValue(value);
        }
    };

    const [images, setImages] = useState([]);

    const onDrop = (acceptedFiles) => {
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
        // Formatear el valor a pesos colombianos
        const formattedValue = Number(value).toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP'
        });
        
        return formattedValue;
    }
    
    return (
        <div class="bg_create_publication">
            <header className="header_create_publication">
                <h2 className="title_create_publication">MARKETPLACE - UPTC</h2>
            </header>
            <div className='body_create_publication'>
                <div className='wrapperCreatePublication'>
                    <form action="">
                        <div className='title_new_create_publication'>
                            <FaArrowAltCircleLeft className='iconBack' color='black' size='50px' onClick={handleBack} />
                            <h1>EDITA TU PUBLICACIÓN</h1>
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
                                            <button className="button_publicate" onClick={() => removeImage(index)}>Eliminar</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='panel-right'>
                                <input type="text" className="title_publication" placeholder='Título de la Publicación' required />
                                <select required id="comboBox" className="combo_box" placeholder="Selecciona tu Tipo de Publicación" value={selectedOption} onChange={handleOptionChange}>
                                    <option value="" disabled selected>Selecciona el Tipo</option>
                                    <option value="Producto">Producto</option>
                                    <option value="Servicio">Servicio</option>
                                </select>
                                <select required id="comboBox" className="combo_box" value={selectedOption} onChange={handleOptionChange}>
                                    <option value="" disabled selected>Selecciona la Categoría</option>
                                    <option value="Ropa">Ropa</option>
                                    <option value="Tecnología">Tecnología</option>
                                    <option value="Accesorios">Accesorios</option>
                                    <option value="Tutorías">Tutorías</option>
                                    <option value="Comida">Comida</option>
                                    <option value="Otros">Otros</option>
                                </select>
                                <textarea
                                    required
                                    id="myTextarea"
                                    className='area_description'
                                    style={{ resize: 'none' }}
                                    placeholder='Ingresa una breve descripción de tu producto o servicio.'
                                />
                                <input
                                    id="numericInput"
                                    className='price_publi1'
                                    type="text"
                                    value={numericValue}
                                    onChange={handleNumericChange}
                                    placeholder='Define el precio'
                                    required
                                />
                                <input
                                    id="numericInput"
                                    className='price_publi2'
                                    type="text"
                                    value={formatToColombianPesos(numericValue)}
                                    onChange={handleNumericChange}
                                    disabled
                                />
                                <select required id="comboBox" className="combo_box" value={selectedOption} onChange={handleOptionChange}>
                                    <option value="" disabled selected>Selecciona la Sede o Seccional</option>
                                    <option value="Sede Central">Sede Central</option>
                                    <option value="Seccional Duitama">Seccional Duitama</option>
                                    <option value="Seccional Sogamoso">Seccional Sogamoso</option>
                                    <option value="Seccional Aguazul">Seccional Aguazul</option>
                                    <option value="Seccional Chiquinquirá">Seccional Chiquinquirá</option>
                                </select>
                                <a href="/login">
                                    <button className="button_publicate" type='submit'>PUBLICAR</button>
                                </a>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default EditPublication
