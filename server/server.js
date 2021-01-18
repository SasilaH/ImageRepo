require('dotenv').config();
const express = require('express');
const db = require("./db");
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        fileCheck(file, cb);
    }
}).single('img');

//Check File Type
function fileCheck(file, cb) {
    const allowedTypes = /jpeg|jpg|gif|png/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && ext) {
        return cb(null, true);
    } else {
        cb('Only images allowed!')
    }
}

//Upload image
app.post('/api/upload', async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.send(err);
        } else {

            console.log(req);

            if (req.file == undefined) {
                res.send('undefined')
            } else {
                const results = await db.query(
                    "INSERT INTO images (filename, path, destination, originalname, size) values($1, $2, $3, $4, $5) returning *",
                    [req.file.filename, req.file.path, req.file.destination, req.file.originalname, req.file.size]
                );
                res.status(201).json({
                    status: "success",
                });
            }

        }
    });
});

//Delete image
app.delete("/api/delete/:path", async (req, res) => {
    try {
        fs.unlink(`./uploads/${req.params.path}`, (err) => {
            if (err) {
                console.error(err)
                return
            } else {
                const results = db.query(
                    "DELETE FROM images where filename = $1",
                    [req.params.path]
                );
                res.status(204).json(
                    {
                        status: "success"
                    }
                );
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//Get all Users
app.get("/api/users", async (req, res) => {
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
app.get("/api/users/:id", async (req, res) => {

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
app.post("/api/users", async (req, res) => {

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
app.put("/api/users/:id", async (req, res) => {
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
app.delete("/api/users/:id", async (req, res) => {
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