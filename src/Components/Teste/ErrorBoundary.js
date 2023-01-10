import React from 'react'

class ErrorBoundary extends React.Component{
    constructor(){
        super()
        this.state = {erro: false}
    }
    componentDidCatch(error){
        this.setState({erro: true})
    }
    render(){
        {if(!this.state.erro){
            return this.props.children
        }else{
            return <h1>Erro</h1>
        }}
    }
}

export default ErrorBoundary