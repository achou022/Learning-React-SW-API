import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { navigate } from '@reach/router';
import Axios from 'axios';

export default () =>{
    const [state, setState]=useState({
        categories:{},
        targetID:[],
        bodyInfo:{}
    })
    useEffect(()=>{
        Axios.get('https://swapi.co/api/')
            .then(response=> setState({
                ...state,
                categories: response.data
            }))
            .catch(err=>{
                console.log(err);
                navigate('https://nowiamthemaster.files.wordpress.com/2015/09/obiwanhs-swe.jpg')})
    },[])
    const changeHandler = (e) =>{
        Axios.get(e.target.value)
            .then(response => setState({
                ...state,
                targetID:response.data.results
            }))
            .catch(err=>console.log(err))
    }
    const submitHandler = e => {
        e.preventDefault();
        console.log(e.target.category.value+e.target.id.value)
        Axios.get(e.target.category.value+e.target.id.value)
            .then(response=> setState({
                ...state,
                bodyInfo:response.data
            }))
            .catch(err => {
                console.log(err)
                navigate('https://nowiamthemaster.files.wordpress.com/2015/09/obiwanhs-swe.jpg')})
    }
    return (
        <div style={{background:'black', color:'grey'}}>
            <form onSubmit={submitHandler}>
                <h1>Look for Info on the Starwars API</h1>
                <label>Search for
                    <select name="category" onChange={changeHandler} style={{color:'white', backgroundColor:'black'}}>
                        <option selected>==Select a category==</option>
                        {Object.keys(state.categories).map((key, index)=>(
                            <option key={index} value={state.categories[key]}>{key}</option>
                        ))}
                    </select>
                </label>
                <label>
                    ID:
                    <select name='id' style={{color:'white', backgroundColor:'black'}}>
                        <option>==Select an ID==</option>
                        {state.targetID?state.targetID.map((id, index)=>(
                            <option key={index}>{index+1}</option>
                        )):null}
                    </select>
                </label>
                <Button className="btn btn-primary" style={{margin: '5px'}}>Search</Button>
            </form>
            {Object.keys(state.bodyInfo).map((key, index)=>
                <p key={index}>{key}:{state.bodyInfo[key]}</p>
            )}
            {/* {JSON.stringify(state.bodyInfo)} */}
        </div>
    )
}