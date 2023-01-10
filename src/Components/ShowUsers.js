import axios from "axios"

function ShowUsers(props) {

    async function deletar(item) {
        props.mostrarLoad(true)
        await axios.delete('https://react-d1c35-default-rtdb.firebaseio.com/cadastros/' + item.key + '.json')
        props.mostrarLoad(false)
        props.consultarUsuarios()
    }

    let list = props.dados.map((item) => {
        return <>
            <li key={item.key}>{item.email}   ---   {item.senha}</li>
            <button onClick={() => { props.editarUser(item) }}>Editar</button>
            <button onClick={() => {
                let confirm = window.confirm('Deseja apagar o usuario ' + item.email + '?')
                if (confirm) {
                    deletar(item)
                }
            }}>Apagar</button>
            <hr></hr>
        </>
    })
    

    return (
        <div>
            <ol>
                {list}
            </ol>
        </div>
    )


}

export default ShowUsers