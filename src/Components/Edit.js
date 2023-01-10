import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

function Edit(props) {

    let emailRef = useRef();
    let senhaRef = useRef();
    let state;
    if (props.editarUser) {
        state = props.editarUser
    } else {
        state = null
    }

    let [emailSenha, setEmailSenha] = useState(state)

    async function enviarDados(e) {

        e.preventDefault();

        let data = {
            email: emailRef.current.value,
            senha: senhaRef.current.value
        }

        if (state == null) {
            // fetch('https://react-d1c35-default-rtdb.firebaseio.com/cadastros.json', {
            //     method: 'POST',
            //     body: JSON.stringify(data)
            // })

            await axios.post('https://react-d1c35-default-rtdb.firebaseio.com/cadastros.json', data)
        }
        else {
            await axios.put('https://react-d1c35-default-rtdb.firebaseio.com/cadastros/' + props.editarUser.key + '.json', data).catch((msg) => { props.setErrorMsg(msg) })
        }

        props.consultarUsuarios()
        props.toggle()
    }

    useEffect(() => {
        if (props.editarUser) {
            setEmailSenha({ email: props.editarUser.email, senha: props.editarUser.senha })
        }
    }, [props])

    return (
        <form onSubmit={enviarDados}>
            <label>Email</label>
            <input ref={emailRef} type='email' placeholder='Digite seu email' defaultValue={props.editarUser && emailSenha.email}></input>
            <label>Senha</label>
            <input ref={senhaRef} type='password' placeholder='Digite sua senha' defaultValue={props.editarUser && emailSenha.senha}></input>
            <button type='submit'>{!state ? 'Enviar' : 'Alterar'}</button>
            <button type='button' onClick={props.toggle}>Cancelar</button>
            {/* <button type='button' onClick={props.consultarUsuarios}>Atualizar usuarios</button> */}
        </form>
    )
}

export default Edit