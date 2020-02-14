import React, { Fragment, useState, useEffect } from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error'

function App() {

    //state del formulario
    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: ''
    })
    const { ciudad, pais } = busqueda

    //state para confirmar la consulta
    const [consultar, guardarConsultar] = useState(false)

    //state para guardar resultado
    const [resultado, guardarResultado] = useState({})

    //state para guardar error de consulta api
    const [error, guardarError] = useState(false)

    useEffect(() => {

        const consultarApi = async() => {
            if (consultar) {
                const appid = '6c4fc9dc557a1dcf8e85d27047348d05'
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                guardarConsultar(false)
                guardarResultado(resultado)
               
                if (resultado.cod !== 200) {
                    guardarError(true)
                } else {
                    guardarError(false)
                }

            }
        }
        consultarApi()

        //deshabilita error de dependencia de useEffect cuando estamos claros que no necesitamos
        //estar pendiente de la veriable
        // eslint-disable-next-line
    }, [consultar])

    let componente;
    if (error) {
        componente = < Error mensaje = "No hay resultados" / >
    } else {
        componente = < Clima resultado = { resultado }
        />
    }
    return ( <
        Fragment >
        <
        Header titulo = 'Clima React App' /
        >
        <
        div className = "contenedor-form" >
        <
        div className = 'row' >
        <
        div className = 'col m6 s12' >
        <
        Formulario busqueda = { busqueda }
        guardarBusqueda = { guardarBusqueda }
        guardarConsultar = { guardarConsultar }
        /> <
        /div> <
        div className = 'col m6 s12' > { componente } <
        /div> <
        /div> <
        /div> <
        /Fragment>
    )
}

export default App;