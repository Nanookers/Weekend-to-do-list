const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const toDo = require('./routes/toDo.router.js');
const pool = require('./modules/pool.js');



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('server/public'));

// routes 
app.use('/toDo', toDo )

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});