const express = require('express');
const {addUser } = require('./modules/Users');  
const {sendWelcomeEmail}=require('./mailservice')

const app = express();

app.use(express.json());

app.post('/addUser', async (req, res) => {
  const data = req.body;
  try {
    await addUser(data);
    sendWelcomeEmail(data.email,data.name,"hvuhuu");
    res.status(200).send('User added successfully');
    
  } catch (error) {
    res.status(500).send('Error adding user: ' + error.message);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
