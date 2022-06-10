const express = require('express');
const cors = require('cors');
const { response } = require('express');


const app = express();
app.use(cors());
app.use(express.json())

const messages =[];
app.post('/messages', (req,res)=>{
    const {body} = req;
    console.log(body);
    messages.push(body);
    res.sendStatus(204);
})

app.get('/messages',(req,res)=>{
    res.json(messages)
})

// long polling
const subscribers = {};

app.get('/long-messages', (req,res)=>{
const ID = Math.ceil(Math.random()*10000);
subscribers[ID] = res;

});

app.post('/long-messages', (req,res)=>{
    const {body} = req;
    Object.entries(subscribers).forEach(([ID,response])=>{
        response.json(body);
        delete subscribers[ID]
    });
    res.sendStatus(204);
    })

// //////////////////////////////////////////////
app.listen(3000,()=>{
    console.log("it works");
})