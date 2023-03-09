import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import express from 'express'
import mongoose from 'mongoose'
import Review from './model.js'




const app = express();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
  console.log('connected to mongoose!!');
});

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
const data = [1,2,3,4]


app.get('/', (req, res) => {
  Review.find({})
    .then((reviews) => {
      res.render('index', { data: reviews });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/');
    });
});



app.get('/submit-form', (req, res) => {
  const review = new Review({
    name: req.query.string1,
    rating: req.query.number1,
    review: req.query.string2
  });

  review
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/');
    });
    console.log(review)
});

app.listen(process.env.PORT || 3000);
