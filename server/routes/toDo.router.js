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
module.exports = router;