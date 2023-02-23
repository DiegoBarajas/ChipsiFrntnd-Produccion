import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {backend} from '../utils'
import { Link, useParams } from 'react-router-dom';

const Notificar = () => {

    const {id} = useParams()
    const [cliente, setCliente] = useState({});

    useEffect(()=>{
        const getCliente = async()=>{
            const {data} = await axios.get(backend()+'/api/clientes/'+id);
            setCliente(data);
        }

        if(cliente._id === undefined)
            getCliente();
    })

    
    const submit = async(e)=>{
        e.preventDefault();


        const mensaje = document.getElementById('mensaje').value;


        const formData = new FormData();
        formData.append('nombre', cliente.nombre);
        formData.append('correo', cliente.correo);
        formData.append('telefono', cliente.telefono);
        formData.append('dispositivo', cliente.dispositivo);
        formData.append('problema', cliente.problema);
        formData.append('mensaje', mensaje);


        const {data} = await axios.post(backend()+'/api/notificacion', formData)
            .catch((err)=>{
                console.log(err);
                alert('Ha ocurrido un error al conectar con el servidor');
            })
        
        if(data.whatsapp){
            alert('El whatsapp se envio exitosamente');
        }else{
            alert('Hubo un error al mandar el whatsapp, intentalo de nuevo');
        }

        if(data.email){
            alert('El correo se envio exitosamente');
        }else{
            alert('Hubo un error al mandar el correo, intentalo de nuevo');
        }

    }

    const eliminar = async()=>{
        // eslint-disable-next-line no-restricted-globals
        if(confirm('¿Quieres borrar este cliente?')){
            await axios.delete(backend()+'/api/clientes/'+cliente._id);
            alert('Cliente eliminado');

            window.location.href = '/';
        }
    }

    return (
        <div>
            <h1>Enviar notificacion al cliente</h1>
            <Link to='/'>Volver</Link>
            <form onSubmit={submit}>

                <h3>{cliente.nombre} </h3>
                <p>{cliente.correo} </p>
                <p>{cliente.telefono} </p>
                <p>{cliente.direccion} a las {cliente.rango} </p>
                <br/>

                <label>Seleccione el mensaje que se quiere mandar:</label>
                <select id='mensaje'>
                    <option>El repartido va en camino a tu domicilio para recoger tu dispositivo</option>
                    <option>El repartidor ha recogido tu dispositivo</option>
                    <option>Tu dispositivo llego al taller</option>
                    <option>Tu dispositivo ya esta siendo reparado</option>
                    <option>Estamos probando tu dispositivo para comprobar que funcione al 100</option>
                    <option>Lo sentimos, algo salio mal al comprobar el funcionamiento, volveremos a repararlo para corregirlo</option>
                    <option>Lo sentimos, tu dispositivo no podra llegar hoy, mañana se te notificara</option>
                    <option>El dispositivo ha sido reparado exitosamente y esta en camino a tu domicilio</option>
                    <option>El repartidor esta muy cerca para que recibas tu dispositivo</option>
                    <option>Se te ha entregado el dispositivo, gracias por reparar con nosotros :)</option>
                </select><br/><br/>

                <button>Enviar</button>
            </form>

            <button onClick={eliminar}>Borrar cliente</button>
        </div>
    )
}

export default Notificar