//import { useState, useEffect } from 'react'
import React, { Fragment, useState, useContext } from "react";
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";
import config from '../config/config';
import { useUser, useUserUpdate } from "../context/UserContext"; 

const Login = () => {
    //const context_user = useUser()
    const context_userUpdate = useUserUpdate()

    const [data, setData] = useState({
        user: '',
        password: ''
    })

    const history = useHistory();

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const save = (event) => {
        event.preventDefault()
        fetch(`${config.BACKEND}/user/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.error == null) {
                context_userUpdate(data.msj)
                setData({
                    user: '',
                    password: '',
                })
                toast.success(`Welcome ${data.msj.name}`, {
                    onClose: () => {
                        history.replace("/profile")
                    }
                })
            }else{
                toast.error(data.msj)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <Fragment>
            <div className="d-flex justify-content-center">
            <div className="card w-75">
            <main className="container">
                <h1>Login</h1>
                <form onSubmit={save}>
                    <input type="hidden" name="codigo" id="codigo" onChange={handleInputChange}></input>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">User</label>
                        <input type="text" name="user" id="user" onChange={handleInputChange} className="form-control" value={data.user}></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" onChange={handleInputChange} className="form-control" value={data.password}></input>
                    </div>
                   
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </main>
            </div>
            </div>
            
            
        </Fragment>
    )
}

export default Login;
