import React, { useEffect } from 'react';
import ChatDataService from '../services/chat.service';
import usePromise from 'react-promise';

class Rooms extends React.Component {
    
    state = {}

    getData() {
        let arr = []
        console.log('OI')
        ChatDataService.getAll()
            .then(res => {
                res.data.map(mes => {
                if (arr.indexOf(mes.channel) == -1) {
                    arr.push(mes.channel)
                }
            })
        })
        .catch(err => console.log(err.message));
    }

    componentDidMount() {
        this.getData().then((data) => this.setState({rooms: data}))
    }

    render() {
        {console.log(this.state)}
        return<div>
            
        </div>
    }
}

export default Rooms;