const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://rajeshwar0308:Rajesh123@cluster0.qa5ztsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

const emailSch = require('./models/email');
const emailControl = require('./controllers/EmailController');


app.get('/email', emailControl.read);
app.post('/email/write',emailControl.write);
app.get('/email/:email',emailControl.readEmail);
app.post('/email/update/:email', emailControl.update);
app.delete('/email/delete/:email', emailControl.deleteEmail);

//new comment added by Rajesh
//This line is newly added
const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
