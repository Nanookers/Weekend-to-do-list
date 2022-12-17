const express = require('express'); 
const router = express.Router();

const pool = require('../modules/pool.js');

// building out the GET
router.get('/', ( req, res ) => {
    let sqlQuery = `
    SELECT * FROM "toDo"
        ORDER BY "id";
    `;
    pool.query (sqlQuery)
    .then((dbRes) => {
        let chores = dbRes.rows
        // Send the response in rows
        res.send( chores )
    }).catch ((dbErr) => {
        console.log('GET route broke', dbErr)
        res.sendStatus(500)
    })
});

// Post in the works
router.post('/', ( req, res ) => {
    let newChore = req.body;

    let sqlQuery = `
        INSERT INTO "toDo" ("task", "notes", "complete")
            VALUES ($1, $2, $3);
    `;
    let sqlValues = [newChore.task, newChore.notes, newChore.complete];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(201)
    })
    .catch((dbErr) => {
        console.log(`error in posting to db`, dbErr);
        res.sendStatus(500);
    });
})

//Delete Works
router.delete('/:id', (req, res) => {
    let idToDelete = req.params.id

    let sqlQuery = `
        DELETE FROM "toDo"
            WHERE "id" = $1;
    `;

    let sqlValues = [idToDelete]

    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        console.log('SUCCESS DELETE: SERVERSIDE');
        res.sendStatus(201)
    }).catch((dbErr) => {
        console.log('DELETE BROKE!');
        res.sendStatus(500);
    })
})
//finish the put button next
router.put('/:id', (res, req) => {
    let idToUpdate = req.params.id
    console.log(idToUpdate);
    let choreFinished = req.body.complete
    console.log(choreFinished);
    
    let sqlQuery = `
        UPDATE "toDo"
        SET "complete" = $1
        WHERE "id" = $2;
    `;

    let sqlValues = [newTransfer, idToUpdate]
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

module.exports = router;