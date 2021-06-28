const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Data = require('./models/Data');
const dataRouter = require('./routes/data');
const app = express();

//connect to mongodb
mongoose.connect('mongodb+srv://minhnngbh18582:minh0964580237@cluster0.l9tp6.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//set template engine
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//route for main page
app.get('/', async (req, res) => {
    let dataItem = await Data.find().sort({timeCreated: 'desc'}) ;
    res.render('index', { dataItem: dataItem });
});

app.use(express.static("public"));
app.use('/data', dataRouter);

app.listen(process.env.PORT || 5000);