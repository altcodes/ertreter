const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const userRoute = require('./src/user/route');
const articleRoute = require('./src/article/route');
const commentRoute = require('./src/comment/route');

//connexion a la base de données

app.use(cors());
mongoose.connect('mongodb://localhost/journey', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// les routes 
app.get('/', (req, res) => res.send('Hello World'));
app.use('/users', userRoute);
app.use('/articles', articleRoute);
app.use('/comments', commentRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
