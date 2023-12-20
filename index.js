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

//#region users
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
//#endregion

//#region publishers
const publishers = [
    {
        "id": "",
        "username":"",
        "password": "",
        "email":"",
        "backgroundImg":"",
        "profileImg":"",
        "name":"", 
        "description":"", 
        "joinedDate":1234567890
    }
];

//get all publishers
app.get('/api/publishers', (req, res) => {
    if(publishers.length===0){
        res.status(204).send('empty array');
    }
    res.status(200).send(publishers);
});

//get publisher by id
app.get('/api/publishers/:id', (req, res) => {
    const {id} = req.params;
    const data = publishers.find(x=>x.id===id);
    if(data!==undefined){
        res.status(200).send(data);
    }else{
        res.status(204).send('data not found');
    }
});

//delete publisher 
app.delete('/api/publishers/:id', (req, res)=>{
    const {id} = req.params;
    const idx = publishers.findIndex(x=>x.id===id);
    if(idx===-1){
        res.send('data not found');
    }else{
        res.send({
            message:'data deleted successfully',
            idx: publishers.splice(idx,1)
        })
    }
});

//post publisher 
app.post('/api/publishers', (req, res)=>{
    const {username, email, password, backgroundImg, profileImg, name, description, joinedDate } = req.body;
    const newPublisher = {
        id:crypto.randomUUID(),
        username,
        email,
        password,
        profileImg,
        backgroundImg,
        name,
        description,
        joinedDate
    }
    publishers.push(newPublisher);
    res.status(201).send({
        message:'data added successfully',
        data: newPublisher
    })
});

//put Publisher 
app.put('/api/publishers/:id', (req, res)=>{
    const {id} = req.params;
    const {username, email, password, backgroundImg, profileImg, name, description, joinedDate } = req.body;
    const data = publishers.find(x=>x.id === id);
    const updatedData = {
        id: data.id
    };
    if(username!==undefined){
        updatedData.username = username;
    }
    if(email!==undefined){
        updatedData.email = email;
    }
    if(password!==undefined){
        updatedData.password = password;
    }
    if(profileImg!==undefined){
        updatedData.profileImg = profileImg;
    }
    if(backgroundImg!==undefined){
        updatedData.backgroundImg = backgroundImg;
    }
    if(name!==undefined){
        updatedData.name = name;
    }
    if(description!==undefined){
        updatedData.description = description;
    }
    if(joinedDate!==undefined){
        updatedData.joinedDate = joinedDate;
    }

    const idx = publishers.findIndex(x=>x.id===id);
    publishers.splice(idx, 1, updatedData);
    res.send({
        message: 'data updated successfully',
        data: updatedData
    });
});

//patch publisher
app.patch('/api/publishers/:id', (req, res)=>{
    const {id} = req.params;
    const {username, email, password, backgroundImg, profileImg, name, description, joinedDate } = req.body;
    const data = publishers.find(x=>x.id === id);

    if(username!==undefined){
        data.username = username;
    }
    if(email!==undefined){
        data.email = email;
    }
    if(password!==undefined){
        data.password = password;
    }
    if(profileImg!==undefined){
        data.profileImg = profileImg;
    }
    if(backgroundImg!==undefined){
        data.backgroundImg = backgroundImg;
    }
    if(name!==undefined){
        data.name = name;
    }
    if(description!==undefined){
        data.description = description;
    }
    if(joinedDate!==undefined){
        data.joinedDate = joinedDate;
    }

    res.send({
        message: 'data updated successfully',
        data: data
    });
});
//#endregion

//#region tags
const tags =[
    {
        "id": "",
        "name":""
    }
];


//get all tags
app.get('/api/tags', (req, res) => {
    if(tags.length===0){
        res.status(204).send('empty array');
    }
    res.status(200).send(tags);
});

//get tag by id
app.get('/api/tags/:id', (req, res) => {
    const {id} = req.params;
    const data = tags.find(x=>x.id===id);
    if(data!==undefined){
        res.status(200).send(data);
    }else{
        res.status(204).send('data not found');
    }
});

//delete tag 
app.delete('/api/tags/:id', (req, res)=>{
    const {id} = req.params;
    const idx = tags.findIndex(x=>x.id===id);
    if(idx===-1){
        res.send('data not found');
    }else{
        res.send({
            message:'data deleted successfully',
            idx: tags.splice(idx,1)
        })
    }
});

//post tag 
app.post('/api/tags', (req, res)=>{
    const { name} = req.body;
    const newTag = {
        id:crypto.randomUUID(),
        name
    }
    tags.push(newTag);
    res.status(201).send({
        message:'data added successfully',
        data: newTag
    })
});

//put tag 
app.put('/api/tags/:id', (req, res)=>{
    const {id} = req.params;
    const { name} = req.body;
    const data = tags.find(x=>x.id === id);
    const updatedData = {
        id: data.id
    };
    
    if(name!==undefined){
        updatedData.name = name;
    }

    const idx = tags.findIndex(x=>x.id===id);
    tags.splice(idx, 1, updatedData);
    res.send({
        message: 'data updated successfully',
        data: updatedData
    });
});

//patch tag
app.patch('/api/tags/:id', (req, res)=>{
    const {id} = req.params;
    const { name} = req.body;
    const data = tags.find(x=>x.id === id);

    if(name!==undefined){
        data.name = name;
    }

    res.send({
        message: 'data updated successfully',
        data: data
    });
});
//#endregion

//#region news
const news =[
    {
        "id": "",
        "name":""
    }
];


//get all news
app.get('/api/news', (req, res) => {
    if(news.length===0){
        res.status(204).send('empty array');
    }
    res.status(200).send(news);
});

//get news by id
app.get('/api/news/:id', (req, res) => {
    const {id} = req.params;
    const data = news.find(x=>x.id===id);
    if(data!==undefined){
        res.status(200).send(data);
    }else{
        res.status(204).send('data not found');
    }
});

//delete news 
app.delete('/api/news/:id', (req, res)=>{
    const {id} = req.params;
    const idx = news.findIndex(x=>x.id===id);
    if(idx===-1){
        res.send('data not found');
    }else{
        res.send({
            message:'data deleted successfully',
            idx: news.splice(idx,1)
        })
    }
});

//post news 
app.post('/api/news', (req, res)=>{
    const { name} = req.body;
    const newNews = {
        id:crypto.randomUUID(),
        name
    }
    news.push(newNews);
    res.status(201).send({
        message:'data added successfully',
        data: newNews
    })
});

//put news 
app.put('/api/news/:id', (req, res)=>{
    const {id} = req.params;
    const { name} = req.body;
    const data = news.find(x=>x.id === id);
    const updatedData = {
        id: data.id
    };
    
    if(name!==undefined){
        updatedData.name = name;
    }

    const idx = news.findIndex(x=>x.id===id);
    news.splice(idx, 1, updatedData);
    res.send({
        message: 'data updated successfully',
        data: updatedData
    });
});

//patch news
app.patch('/api/news/:id', (req, res)=>{
    const {id} = req.params;
    const { name} = req.body;
    const data = news.find(x=>x.id === id);

    if(name!==undefined){
        data.name = name;
    }

    res.send({
        message: 'data updated successfully',
        data: data
    });
});
//#endregion

//#region subscriptions
const subscriptions =[
    {
        "id": "",
        "title":"",
        "createdAt":"",
        "linkUrl":"",
        "thumbnailImg":"",
        "newsBody":""
    }
];


// //get all news
// app.get('/api/news', (req, res) => {
//     if(news.length===0){
//         res.status(204).send('empty array');
//     }
//     res.status(200).send(news);
// });

// //get news by id
// app.get('/api/news/:id', (req, res) => {
//     const {id} = req.params;
//     const data = news.find(x=>x.id===id);
//     if(data!==undefined){
//         res.status(200).send(data);
//     }else{
//         res.status(204).send('data not found');
//     }
// });

// //delete news 
// app.delete('/api/news/:id', (req, res)=>{
//     const {id} = req.params;
//     const idx = news.findIndex(x=>x.id===id);
//     if(idx===-1){
//         res.send('data not found');
//     }else{
//         res.send({
//             message:'data deleted successfully',
//             idx: news.splice(idx,1)
//         })
//     }
// });

// //post news 
// app.post('/api/news', (req, res)=>{
//     const { name} = req.body;
//     const newNews = {
//         id:crypto.randomUUID(),
//         name
//     }
//     news.push(newNews);
//     res.status(201).send({
//         message:'data added successfully',
//         data: newNews
//     })
// });

// //put news 
// app.put('/api/news/:id', (req, res)=>{
//     const {id} = req.params;
//     const { name} = req.body;
//     const data = news.find(x=>x.id === id);
//     const updatedData = {
//         id: data.id
//     };
    
//     if(name!==undefined){
//         updatedData.name = name;
//     }

//     const idx = news.findIndex(x=>x.id===id);
//     news.splice(idx, 1, updatedData);
//     res.send({
//         message: 'data updated successfully',
//         data: updatedData
//     });
// });

// //patch news
// app.patch('/api/news/:id', (req, res)=>{
//     const {id} = req.params;
//     const { name} = req.body;
//     const data = news.find(x=>x.id === id);

//     if(name!==undefined){
//         data.name = name;
//     }

//     res.send({
//         message: 'data updated successfully',
//         data: data
//     });
// });
//#endregion

//listener
app.listen(PORT, ()=>{
    console.log(`app listening on port ${PORT}`);
});
