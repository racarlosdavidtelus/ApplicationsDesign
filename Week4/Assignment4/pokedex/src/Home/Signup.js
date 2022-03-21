//import { useState, useEffect } from 'react'
import React, { Fragment, useState } from "react";
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";
import config from '../config/config';
import Navbar from './Navbar';

const Signup = () => {

    const [data, setData] = useState({
        name: '',
        password: '',
        pokemon_trainer_nickname: '',
        region_of_origin: '',
        gender: '',
        age: '',
        email: '',
        trainer_class: '',
        profile_photo: {}
    })

    const [photo, setPhoto] = useState()

    const history = useHistory();

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const handleonFileChange = (event) => {
        setPhoto(event.target.files[0] );
    }

    function extraerBase64() {
        return new Promise(resolve => {
            try{
                const reader = new FileReader();
                reader.readAsDataURL(photo);
                reader.onload = () => {
                    const base64String = reader.result;//.replace("data:", "").replace(/^.+,/, "");
                    //setData({
                        //...data,
                        //profile_photo: base64String
                    //});
                    resolve({
                        name: photo.name,
                        tipoFile: photo.name.match(/\.([^.]+)$/)[1],
                        sizeFile: photo.size,
                        base: base64String
                    });
                };
                reader.onerror = error => {
                  resolve({
                    base:null
                  })
                }
              } catch (e){
                  return null;
              }
        });
    }

    const save = (event) => {
        event.preventDefault(); 
        //onFileUpload()
        //const result = await extraerBase64(photo);
        //console.log(result);
        /*
        const reader = new FileReader();
       
        reader.onload = function () {
            const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
            //console.log(base64String);
            const img_profile  = {
                name: photo.name,
                tipoFile: photo.name.match(/\.([^\.]+)$/)[1],
                sizeFile: photo.size,
                base64: base64String
            }
            setData({
                ...data,
                profile_photo: img_profile
            });
        }
        reader.readAsDataURL(photo);
        */
        
        fetch(`${config.BACKEND}/user/signup`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => { console.log("fetxhs")
            if (data.error == null) {
                setData({
                    name: '',
                    password: '',
                    pokemon_trainer_nickname: '',
                    region_of_origin: '',
                    gender: '',
                    age: '',
                    email: '',
                    trainer_class: ''
                })
                toast.success('User Created', {
                    onClose: () => {
                        history.replace("/login")
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

    const onFileUpload = (event) => {
        event.preventDefault();
        extraerBase64()
        .then((miFile) => {
            setData({
                ...data,
                profile_photo: miFile
            });
        });
        console.log(data)
    }

    return (
        <Fragment>
            <Navbar></Navbar>
            <br></br>
            <div className="d-flex justify-content-center">
            <div className="card w-75">
            <main className="container">
                <h1>Signup</h1>
                <form onSubmit={save}>
                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" id="name" onChange={handleInputChange} className="form-control" value={data.name}></input>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" onChange={handleInputChange} className="form-control" value={data.password}></input>
                        </div>
                    </div>

                    <div className="form-group col-md-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" name="email" id="email" onChange={handleInputChange} className="form-control" value={data.email}></input>
                    </div>

                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" name="age" id="age" onChange={handleInputChange} className="form-control" value={data.age}></input>
                        </div>
                        <div className="form-group col-md-9">
                            <label htmlFor="photo" className="form-label">Photo</label>
                            <br></br> 
                            <input type="file" onChange={handleonFileChange} />
                            <button className="btn btn-primary" onClick={onFileUpload}>Upload Photo</button>
                        </div>    
                    </div>
                    
                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="pokemon_trainer_nickname" className="form-label">Pokemon trainer nickname</label>
                            <input type="text" name="pokemon_trainer_nickname" id="pokemon_trainer_nickname" onChange={handleInputChange} className="form-control" value={data.pokemon_trainer_nickname}></input>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="region_of_origin" className="form-label">Region of origin</label>
                            <input type="text" name="region_of_origin" id="region_of_origin" onChange={handleInputChange} className="form-control" value={data.region_of_origin}></input>
                        </div>
                    </div> 
                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <div className="input-group">
                                <select name="gender" id="gender" onChange={handleInputChange} className="form-control" value={data.gender}>
                                    <option key="select" value="select">Select gender</option>
                                    <option key="male" value="male">Male</option>
                                    <option key="female" value="female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                        <label htmlFor="trainer_class" className="form-label">Trainer class</label>
                        <div className="input-group">
                            <select name="trainer_class" id="trainer_class" onChange={handleInputChange} className="form-control" value={data.trainer_class}>
                                <option key="select" value="select">Select trainer class</option>
                                <option key="battle" value="battle">Battle</option>
                                <option key="show" value="show">Show</option>
                            </select>
                        </div>
                        </div>
                    </div> 


                    <br></br>      
                             
                    <br></br>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </div>
                </form>
            </main>
            </div>
            </div>

            
            
            
        </Fragment>
    )
}

export default Signup;
