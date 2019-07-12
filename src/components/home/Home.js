import React, { Component } from 'react';
import Axios from 'axios';
import "./Home.css"

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            aliens: [],
            newName: ''
        }
    }

    componentDidMount(){
        Axios.get('/api/aliens').then(res => {
            this.setState({
                aliens: res.data
            })
        })
    }

    updateAliens = (id) => {
        const {newName} = this.state;
        Axios.put(`/api/aliens/${id}`, {name: newName}).then(res => {
            console.log("data after update", res.data)
            this.setState({
                aliens: res.data
            })
        })
    }

    render(){
        const mappedAliens = this.state.aliens.map(alien => {
            return <div className='aliens'>
                <h1>{alien.name}</h1>
                <img src={alien.photo} />
                <p>{alien.race}</p>
                <input onChange={(e) => this.setState({newName: e.target.value})}/>
                <button onClick={() => this.updateAliens(alien.id)}>Submit</button>
            </div>
        })
        return (
            <div>
                ALIENS!
                {mappedAliens}
            </div>
        )
    }
}