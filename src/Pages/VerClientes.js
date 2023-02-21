import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { backend } from '../utils';

const VerClientes = () => {

    const [clientes, setClientes] = useState([]);

    useEffect(()=>{
        const getClientes = async()=>{
            const {data} = await axios.get(backend()+'/api/clientes/');
            setClientes(data);

            console.log(data)
        }

        if(clientes.length === 0)
            getClientes();

    })

    return (
        <div>
            <h1>Todos los Clientes</h1>
            <Link to='/notificar/agregar'>Agregar Cliente</Link>
            {
                clientes.map((c)=>{
                    return <Link to={'/notificar/'+c._id}>
                        <div>
                            <hr/>
                            <h2>{c.id_usuario} </h2>
                            <h4>{c.nombre}</h4>
                            <p>{c.dispositivo} </p>
                            <p>{c.problema} </p>
                            <p>{c.correo} </p>
                            <p>{c.telefono} </p>
                            <p>{c.direccion} a las {c.rango} </p>
                            <p>{c.createdAt} </p>

                            <hr/><br/>
                        </div>
                    </Link>
                })
            }
        </div>
    )
}

export default VerClientes