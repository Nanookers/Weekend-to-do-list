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

app.put('/toDo/:id', (req, res) => {
    console.log('req params', req.params);
    console.log('req body', req.body);

    let idToUpdate = req.params.id
    console.log(req.body);
    let completeStatus = req.body.complete

        let sqlQuery = `
        UPDATE "toDo"
            SET "complete" = $1
            WHERE "id" = $2;
    `;

    let sqlValues = [completeStatus, idToUpdate]
    console.log(sqlValues);
    pool.query(sqlQuery, sqlValues)
    .then((dbRes)=>{
        console.log('successful update from put: serverside');
        res.sendStatus(201)
    }).catch(( dbErr)=>{
        console.log('broke in PUT serverside', dbErr);
        res.sendStatus(500)
    })

})

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});