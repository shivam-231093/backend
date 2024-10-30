const express = require('express');
const {addUser ,checkUser} = require('./modules/Users');  
const {sendWelcomeEmail}=require('./mailservice')
const cors =require('cors')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { v4: uuidv4 } = require("uuid");


const app = express();
// app.use(cors);
app.use(cors({origin: true}));


app.use(express.json());
app.get('/',(req,res)=>{
  res.send('njndjijjd')
  console.log("kewf")
})

app.post('/addUser', async (req, res) => {
  const data = req.body;
  let randpass = uuidv4().replace(/-/g, '').slice(0, 8);
  console.log(randpass)
  randpass=await bcrypt.hash(randpass, 10)
  console.log(randpass)
  data.password=randpass
  console.log(data.password)
  try {
    
    await addUser(data);
    sendWelcomeEmail(data.email,data.name,randpass);
    res.status(200).send('User added successfully');
    
  } catch (error) {
    res.status(500).send('Error adding user: ' + error.message);
  }
});

app.post('/login', async (req, res) => {
  try {
    await checkUser(req.body, res);  // Pass res to checkUser
  } catch (error) {
    res.status(500).json({ message: 'Server error during login.' });
  }
});

app.post()

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
