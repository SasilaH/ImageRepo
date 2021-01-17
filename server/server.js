require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const uploader = require ('./multer/uploader.js')

app.use(express.json());

app.user('/uploads', express.static('uploads'))

app.use(morgan('dev'));
app,use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.user(cors())

//Upload File



//Get all Users
app.get("/api/users", async(req, res) => {
    try {
        const results = await db.query("select * from users");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                user: results.rows,
            },
        });
    } catch (error) {
        console.log(error);
    }
});

//Get a user
app.get("/api/users/:id", async(req, res) => {

    console.log(req.params.id)

    try {
        const results = await db.query("select * from users where id = $1", [req.params.id]); 
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                user: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
});

//Create a user
app.post("/api/users", async(req, res) => {

    console.log(req.body)

    try {
        const results = await db.query(
            "INSERT INTO users (username, password) values($1, $2) returning *", 
            [req.body.username, req.body.password]
        ); 
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                user: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
});

//Update a user
app.put("/api/users/:id",  async(req, res) => {
    try {
        const results = await db.query(
            "UPDATE users SET username = $1, password = $2 where id = $3 returning *",
            [req.body.username, req.body.password, req.params.id]
        );
        res.status(200).json({
            status: "success",
            data: {
                user: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
});

//Detele user
app.delete("/api/users/:id", async(req,res) => {
    try {
        const results = db.query(
            "DELETE FROM users where id = $1",
            [req.params.id]
        );
        res.status(204).json(
            {
                status: "success"
            }
        );
    } catch (error) {
        console.log(error);
    }
})

const port = process.env.PORT || 3001; 
//variable for port from environment variable and default 3001
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});
//once express starts up log in console