const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT =process.env.PORT || 3000;
require('dotenv').config();

mongoose.connect(process.env.url,{useNewUrlParser: true,
useUnifiedTopology: true}).then(
    () => {
        console.log('Connected to MongoDB');
    }  
).catch(
    (err) => {
        console.log('Error connecting to MongoDB: ', err.message);
    }
);
const db = mongoose.connection.useDb('sample_guides').collection('planets');


app.get('/',(req,res)=>
{
res.send('Hello World');


})

app.get('/data', (req, res) => {

    db.find().toArray(
      (err, result)=>{
        if(err){
          console.log(err);
        }
        res.status(200).json(result);
        console.log(result);
      }
    )
});


app.listen(
  PORT,
  () => { console.log(`Server is live at ${PORT}`); }
);