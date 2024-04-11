import React, { useState } from 'react';
import './EditPublicationForm.css';
import { FaUser, FaLock, FaAddressCard } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { useDropzone } from 'react-dropzone';

const LoginForm = () => {

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

  return (
    <div class="oe">
        <div className='wrapperEditPublicationForm'>
            <form action="">
                <h1>EDITA TU PUBLICACIÓN</h1>
                <div className='box-edit-publication'>
                    <div className='panel-left'>
                        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                            <input {...getInputProps()} />
                            <p className='rac'>Arrastra y suelta tus imágenes aquí, o haz clic para cargarlas.</p>
                        </div>
                        <div className="image-preview">
                            {images.map((image, index) => (
                            <div key={index} className="image-container">
                                <img src={image.preview} className='image-pre' alt={`Imagen ${index}`} />
                                <button className="ae" onClick={() => removeImage(index)}>Eliminar</button>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className='panel-right'>
                    <input type="text" className="title-publication" placeholder='Edita tu Título de la Publicación' required />
                    <select required id="comboBox" className="combobox" placeholder="Vuelve a seleccionar tu tipo de publicación" value={selectedOption} onChange={handleOptionChange}>
                        <option value="" disabled selected>Edita el Tipo</option>
                        <option value="Producto">Producto</option>
                        <option value="Servicio">Servicio</option>
                    </select>
                    <select required id="comboBox" className="combobox" value={selectedOption} onChange={handleOptionChange}>
                        <option value="" disabled selected>Edita la Categoría</option>
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
                        className='description-area'
                        style={{ resize: 'none' }}
                        placeholder='Edita la breve descripción de tu producto o servicio.'
                    />
                    <input
                        id="numericInput"
                        className='title-publication'
                        type="text"
                        value={numericValue}
                        onChange={handleNumericChange}
                        placeholder='Edita el precio de tu producto o servicio.'
                    />
                    <select required id="comboBox" className="combobox" value={selectedOption} onChange={handleOptionChange}>
                        <option value="" disabled selected>Edita la Sede o Seccional</option>
                        <option value="Sede Central">Sede Central</option>
                        <option value="Seccional Duitama">Seccional Duitama</option>
                        <option value="Seccional Sogamoso">Seccional Sogamoso</option>
                        <option value="Seccional Aguazul">Seccional Aguazul</option>
                        <option value="Seccional Chiquinquirá">Seccional Chiquinquirá</option>
                    </select>
                    </div>
                    <a href="/login">
                        <button className="button-create" type='submit'>GUARDAR CAMBIOS</button>
                    </a>
                    
                    
                </div>
            </form>
      
        </div>
    </div>
  )
}

export default LoginForm
