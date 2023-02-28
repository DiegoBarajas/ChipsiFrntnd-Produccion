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

    const status = [
        'En camino a recoger dispositivo',
        'Dispositivo recogido',
        'Dispositivo en taller',
        'Dispositivo esta siendo reparado',
        'Probando dispositivo',
        'En camino a devolver dispositivo',
        'Llegando al domicilio (5 Min)',
        'Pedido finalizado',
    ]

    const mensajaes = [
    'El repartido va en camino a tu domicilio para recoger tu dispositivo',
    'El repartidor ha recogido tu dispositivo',
    'Tu dispositivo llego al taller',
    'Tu dispositivo ya esta siendo reparado',
    'Estamos probando tu dispositivo para comprobar que funcione al 100',
    'El dispositivo ha sido reparado exitosamente y esta en camino a tu domicilio',
    'El repartidor esta muy cerca para que recibas tu dispositivo',
    'Se te ha entregado el dispositivo, gracias por reparar con nosotros :)']

    const msgPedos = ['Lo sentimos, algo salio mal al comprobar el funcionamiento, volveremos a repararlo para corregirlo', 'Lo sentimos, tu dispositivo no podra llegar hoy, mañana se te notificara'];

    const botonPedo = ()=>{
        if(cliente.status === 5){
            return <button
            onClick={()=>problema(0)}
            >
                Problema al probar funcionamiento
            </button>
        }
    }
    
    const cambiarStatus = async()=>{
        console.log(await axios.put(backend()+'/api/clientes/'+id));

        const formData = new FormData();
        formData.append('nombre', cliente.nombre);
        formData.append('correo', cliente.correo);
        formData.append('telefono', cliente.telefono);
        formData.append('dispositivo', cliente.dispositivo);
        formData.append('problema', cliente.problema);
        formData.append('mensaje', mensajaes[cliente.status]);


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

        window.location.reload();
    }

    const problema = async(num)=>{
        const formData = new FormData();
        formData.append('nombre', cliente.nombre);
        formData.append('correo', cliente.correo);
        formData.append('telefono', cliente.telefono);
        formData.append('dispositivo', cliente.dispositivo);
        formData.append('problema', cliente.problema);
        formData.append('mensaje', msgPedos[num]);


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

    const mostrarStatus = ()=>{
        if(cliente.status===0)
            return 'Pedido registrado';
        else 
            return status[cliente.status-1];
    }

    return (
        <div>
            <h1>Enviar notificacion al cliente</h1>
            <Link to='/'>Volver</Link>

                <h3>{cliente.nombre} </h3>
                <p>{cliente.correo} </p>
                <p>{cliente.telefono} </p>
                <p>{cliente.direccion} {cliente.rango} </p>
                <p>${cliente.precio} MXN</p>
                <p>STATUS: {mostrarStatus()}</p>

                <br/>

                

                <button
                    onClick={cambiarStatus}
                >{status[cliente.status]} </button>
                <br/>
                {botonPedo()}
                <br/><br/>

                <button
                    onClick={()=>problema(1)}
                >Reportar Problema</button><br/>

            <button onClick={eliminar}>Borrar cliente</button>
        </div>
    )
}

export default Notificar