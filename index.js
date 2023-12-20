const express = require('express'); //import {Express} from 'express';
const bodyParser = require('body-parser');
const crypto = require('crypto');
//require('dotenv').config();
//const users = require('users.js');
const cors = require('cors');
const app = express(); 
app.use(bodyParser.json());
app.use(cors());
const PORT = 8080
//const PORT = process.env.PORT || 3030;

const users = [
    {
        "id": "",
        "username":"esmer",
        "fullName":"",
        "profileImg":"",
        "email":"",
        "password": "",
        "isSdmin": false
    }
]

//get all users
app.get('/api/users', (req, res) => {
    if(users.length===0){
        res.status(204).send('empty array');
    }
    res.status(200).send(users);
});

//get user by id
app.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const data = users.find(x=>x.id===id);
    if(data!==undefined){
        res.status(200).send(data);
    }else{
        res.status(204).send('data not found');
    }
});

//delete user 
app.delete('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    const idx = users.findIndex(x=>x.id===id);
    if(idx===-1){
        res.send('data not found');
    }else{
        res.send({
            message:'data deleted successfully',
            idx: users.splice(idx,1)
        })
    }
});

//post user 
app.post('/api/users', (req, res)=>{
    const {username, fullName, profileImg, email, password, isAdmin} = req.body;
    const newUser = {
        id:crypto.randomUUID(),
        username,
        fullName,
        profileImg,
        email,
        password,
        isAdmin
    }
    users.push(newUser);
    res.status(201).send({
        message:'data added successfully',
        data: newUser
    })
});

//put user 
app.put('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    const {username, fullName, profileImg, email, password, isAdmin} = req.body;
    const data = users.find(x=>x.id === id);
    const updatedData = {
        id: data.id
    };
    if(username!==undefined){
        updatedData.username = username;
    }
    if(fullName!==undefined){
        updatedData.fullName = fullName;
    }
    if(profileImg!==undefined){
        updatedData.profileImg = profileImg;
    }
    if(email!==undefined){
        updatedData.email = email;
    }
    if(password!==undefined){
        updatedData.password = password;
    }
    if(isAdmin!==undefined){
        updatedData.isAdmin = isAdmin;
    }

    const idx = users.findIndex(x=>x.id===id);
    users.splice(idx, 1, updatedData);
    res.send({
        message: 'data updated successfully',
        data: updatedData
    });
});

//patch user
app.patch('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    const {username, fullName, profileImg, email, password, isAdmin} = req.body;
    const data = users.find(x=>x.id === id);

    if(username!==undefined){
        data.username = username;
    }
    if(fullName!==undefined){
        data.fullName = fullName;
    }
    if(profileImg!==undefined){
        data.profileImg = profileImg;
    }
    if(email!==undefined){
        data.email = email;
    }
    if(password!==undefined){
        data.password = password;
    }
    if(isAdmin!==undefined){
        data.isAdmin = isAdmin;
    }

    res.send({
        message: 'data updated successfully',
        data: data
    });
});

//listener
app.listen(PORT, ()=>{
    console.log(`app listening on port ${PORT}`);
});
