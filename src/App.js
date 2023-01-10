import './App.css';
import Form from './Components/Form';
import { useEffect, useState } from 'react';
import Edit from './Components/Edit';

function App() {

  let [mostrar, setMostrar] = useState(false)
  let [mostrarLoad, setMostrarLoad] = useState(false)
  let [errorMsg, setErrorMsg] = useState(null)
  let [userData, setUserData] = useState([])
  let [mostrarUser, setMostrarUser] = useState(false)
  let [editarUser, setEditarUser] = useState(null)

  function consultarUsuarios() { //fetch sem nada é get por padrão, e retorna promise como sempre

    setMostrarLoad(true)
    setMostrarUser(false)
    fetch('https://react-d1c35-default-rtdb.firebaseio.com/cadastros.json')
      .then((info) => {
        if (info.ok === false) {
          throw new Error('Error 404')
        }
        return info.json()
      }).then((data) => {
        let userArray = []
        for (let a in data) {
          userArray.push({ ...data[a], key: a })
        }
        setUserData(userArray)
        setMostrarLoad(false)
        setMostrarUser(true)
      })
      .catch((err) => {
        setMostrarLoad(false)
        setMostrarUser(false)
        setErrorMsg(err.message)
      })

    // setMostrar(false)
    // axios.get('https://react-d1c35-default-rtdb.firebaseio.com/cadastros.json')
    // .then((info) => {
    //     return info.data
    // }).then((data) => {
    //     let userArray = []
    //     for(let a in data){
    //         userArray.push({...data[a], key:a})
    //     }
    //     setUserData(userArray)
    //     setMostrar(true)
    //     setMostrarUser(true)
    // })
    // .catch((err) => {
    //     setMostrar(true)
    //     setMostrarUser(false)
    //     setErrorMsg(err.message)
    // })
  }

  async function EditarUser(user) {
    await setMostrar(false)
    setMostrar(true)
    setEditarUser(user)
  }

  useEffect(() => { consultarUsuarios() }, [])

  return (
    <div className="App">
      <button onClick={() => { setMostrar((prev) => { return !prev }) }}>{!mostrar ? 'mostrar' : 'esconder'}</button>

      {mostrar && <Edit toggle={() => {
        setMostrar((prev) => { return !prev })
        setEditarUser(null)
      }} setErrorMsg={setErrorMsg} editarUser={editarUser} consultarUsuarios={consultarUsuarios} />}

      <Form consultarUsuarios={consultarUsuarios} editarUser={EditarUser} mostrarUser={mostrarUser} errorMsg={errorMsg} userData={userData} mostrarLoad={mostrarLoad} setMostrarLoad={setMostrarLoad} />
    </div>
  );
}

export default App;
