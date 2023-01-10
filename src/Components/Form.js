import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import ShowUsers from './ShowUsers';
import Loader from './Loader/Loader';

function Form(props) {

    return (
        <>
            <br></br>
            <hr></hr>
            <div>
                {props.mostrarUser && <ShowUsers consultarUsuarios={props.consultarUsuarios} editarUser={props.editarUser} mostrarLoad={props.setMostrarLoad} dados={props.userData} />}
                {props.errorMsg}
                {props.mostrarLoad && <Loader />}
            </div>
        </>

    )
}

export default Form