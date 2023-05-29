const bcrypt = require('bcrypt');
const connection = require('../config/connection');
const mysql = require('mysql');
const express = require('express')
const app = express.Router();
const secretKey = 'secretkey';
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get("/getDetailRecipe", (req, res) => {
    const id = req.body.id
    const query = "SELECT * FROM recipes where id = ?"
    connection.query(query, [id],(err, results, field) => {
        if(err) {
            res.status(500).send({message: err.sqlMessage})
        } else {
            res.json(results)
        }
    })
    console.log(id)
})

app.get("/getByTitle", (req, res) => {
    const title = req.body.title;
    const query = "SELECT * FROM recipes WHERE title LIKE ?";
    const searchTitle = `%${title}%`; 
    connection.query(query, [searchTitle], (err, results, field) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage });
      } else {
        res.json(results);
      }
    });
});

app.get("/getRecommendation", (req, res) => {
    const recommendations = req.body.recommendations;
    const query = 'SELECT * FROM recipes WHERE title IN (?)';
    connection.query(query, [recommendations], (err, results, field) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage });
      } else {
        res.json(results);
      }
    });
});

app.get("/getByTag", (req, res) => {
    const tag = req.body.tag
    const query = "SELECT * FROM recipes where tag = ?" 
    connection.query(query, [tag],(err, results, field) => {
        if(err) {
            res.status(500).send({message: err.sqlMessage})
        } else {
            res.json(results)
        }
    })
})

app.post("/signup", (req, res) => {
    const name = req.body.name
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    function hashPassword(password) {
        const pass = password;
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(pass, saltRounds);
        return hashedPassword;
    }

    const hashedPassword = hashPassword(password);

    const check = "SELECT * FROM user WHERE username = ?"
    connection.query(check, [username], (err, results, fields) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage})
        } if (results.length > 0) {
            res.status(400).json({ error: 'Username sudah digunakan' });
            return;
        }
    })

    const query = "INSERT INTO user (name, username, email, password) values (?, ?, ?, ?)"

    connection.query(query, [name, username, email, hashedPassword], (err, results, fields) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage})
        } else {
            res.status(200).json({ message: 'Signup berhasil' });        
        }
    })
})

app.post('/login', (req, res) => {
    const jwt = require('jsonwebtoken');
    const username = req.body.username;
    const password = req.body.password;

    const getUserQuery = 'SELECT * FROM user WHERE username = ?';
    connection.query(getUserQuery, [username], (err, results) => {
        if (err) {
            console.error('Error kueri:', err);
            res.status(500).json({ error: 'Terjadi kesalahan server' });
            return;
        }

        if (results.length > 0) {
            const user = results[0];
    
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error memeriksa password:', err);
                    res.status(500).json({ error: 'Terjadi kesalahan server' });
                    return;
                }
        
                if (isMatch) {
                    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
        
                    res.json({ token });
                } else {
                    res.status(401).json({ error: 'Username atau password salah dalam' });
                }
            }); 
        } else {
            res.status(401).json({ error: 'Username atau password salah luar' });
        }
    }); 
}); 

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.status(401).json({ error: 'Token tidak ditemukan' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token tidak valid' });
      }
    req.user = user;

    next();
  });
}

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = app;