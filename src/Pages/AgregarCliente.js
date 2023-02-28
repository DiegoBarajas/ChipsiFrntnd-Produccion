import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import { backend } from '../utils';

const AgregarCliente = () => {

    const submit = async(e)=>{
        e.preventDefault();

        const id_usuario = document.getElementById('id_usuario').value;
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const dispositivo = document.getElementById('dispositivo').value;
        const problema = document.getElementById('problema').value;
        const direccion = document.getElementById('direccion').value;
        const rango = 'De '+document.getElementById('rango1').value +' a '+document.getElementById('rango2').value;
        const precio = document.getElementById('precio').value;


        const formData = new FormData();
        formData.append('id_usuario', id_usuario)
        formData.append('nombre', nombre);
        formData.append('correo', correo);
        formData.append('telefono', telefono);
        formData.append('dispositivo', dispositivo);
        formData.append('problema', problema);
        formData.append('direccion', direccion);
        formData.append('rango', rango);
        formData.append('precio', precio);

        const {data} = await axios.post(backend()+'/api/clientes/', formData)
            .catch((err)=>{
                console.log(err);
                alert('Ha ocurrido un error al conectar con el servidor');
            })
        
        if(data._id !== undefined){
            alert('El cliente se registró exitosamente');

            document.getElementById('nombre').value = '';
            document.getElementById('correo').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('dispositivo').value = '';
            document.getElementById('problema').value = '';
            document.getElementById('direccion').value = '';
            document.getElementById('rango1').value = '';
            document.getElementById('rango2').value = '';
            document.getElementById('precio').value = '';

            window.location.href = '/notificar/'+data._id
        }else{
            alert('Hubo un error al registrar al cliente, intentalo de nuevo');
        }

    }

    return (
        <div>
            <h1>Enviar notificacion al cliente</h1>
            <Link to='/'>Volver</Link>
            <form onSubmit={submit}>

                <label>Repartidor</label>
                <input
                    type='text'
                    placeholder='Repartidor'
                    id='id_usuario'
                    required
                /><br/>

                <label>Nombre</label>
                <input
                    type='text'
                    placeholder='Nombre'
                    id='nombre'
                    required
                /><br/>
                
                <label>Correo</label>
                <input
                    type='email'
                    placeholder='Correo'
                    id='correo'
                    required
                /><br/>
                
                <label>Telefono</label>
                <input
                    type='number'
                    minLength='10'
                    placeholder='Telefono'
                    id='telefono'
                    required
                /><br/>
                
                <label>Dispositivo</label>
                <input
                    type='text'
                    placeholder='Dispositivo'
                    id='dispositivo'
                    required
                /><br/>
                
                <label>Problema</label>
                <input
                    type='text'
                    placeholder='Problema'
                    id='problema'
                    required
                /><br/>

                <label>direccion</label>
                <input
                    type='text'
                    placeholder='direccion'
                    id='direccion'
                    required
                /><br/>
                
                <label>Rango de horas</label><br/>
                <label> De: </label>
                <input
                    type='time'
                    placeholder='rango'
                    id='rango1'
                    required
                />
                <label> a: </label>
                <input
                    type='time'
                    placeholder='rango'
                    id='rango2'
                    required
                /><br/>

                <label>Precio $</label>
                <input
                    type='number'
                    placeholder='Precio MXN'
                    id='precio'
                    required
                /><br/> 

                <button>Enviar</button>
            </form>
        </div>
    )
}

export default AgregarCliente