const bcrypt = require('bcrypt');
const connection = require('../config/connection')
const mysql = require('mysql');
const express = require('express')
const app = express.Router();
const secretKey = 'secretkey';

// app.get('/api/data', (req, res) => {
//     // Melakukan query ke database
//     const query = 'SELECT * FROM user';
//     connection.query(query, (error, results) => {
//       if (error) {
//         console.error('Error executing query:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         // Mengirim data sebagai respons
//         res.json(results);
//       }
//     });
// });

app.get("/getAllUser", (req, res) => {
    const query = "SELECT * FROM user"
    connection.query(query, (err, rows, field) => {
        if(err) {
            res.status(500).send({message: err.sqlMessage})
        } else {
            res.json(rows)
        }
    })
})

app.post("/signup", (req, res) => {
    const name = req.body.name
    const username = req.body.username
    const email = req.body.amount
    const password = req.body.date

    function hashPassword(password) {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        return hashedPassword;
    }

    const hashedPassword = hashPassword(password);

    const check = "SELECT * FROM user WHERE username = ?"
    connection.query(check, [username], (err, rows, fields) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage})
        } if (results.length > 0) {
            res.status(400).json({ error: 'Username sudah digunakan' });
            return;
        }
    })

    const query = "INSERT INTO user (name, username, email, password) values (?, ?, ?, ?)"

    connection.query(query, [name, username, email, hashedPassword], (err, rows, fields) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage})
        } else {
            res.status(200).json({ message: 'Signup berhasil' });        
        }
    })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Cari pengguna berdasarkan username di database
    const getUserQuery = 'SELECT * FROM user WHERE username = ?';
    connection.query(getUserQuery, [username], (err, results) => {
        if (err) {
            console.error('Error kueri:', err);
            res.status(500).json({ error: 'Terjadi kesalahan server' });
            return;
        }

    // Jika login berhasil
        if (results.length > 0) {
            const user = results[0];
    
            // Periksa password menggunakan bcrypt
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error memeriksa password:', err);
                    res.status(500).json({ error: 'Terjadi kesalahan server' });
                    return;
                }
        
                if (isMatch) {
                    // Jika login berhasil, buat token JWT
                    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
        
                    // Kirim token sebagai respon
                    res.json({ token });
                } else {
                    // Jika login gagal
                    res.status(401).json({ error: 'Username atau password salah' });
                }
            }); 
        } else {
            // Jika pengguna tidak ditemukan
            res.status(401).json({ error: 'Username atau password salah' });
        }
    }); 
}); 

// Middleware untuk memeriksa validitas token setiap kali request dilakukan
function authenticateToken(req, res, next) {
    // Mendapatkan token dari header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      // Jika token tidak ada, kirim respon dengan status 401 Unauthorized
      return res.status(401).json({ error: 'Token tidak ditemukan' });
    }
  
    // Memverifikasi token
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        // Jika token tidak valid, kirim respon dengan status 403 Forbidden
        return res.status(403).json({ error: 'Token tidak valid' });
      }
      // Menyimpan data pengguna dari token ke dalam objek req.user
    req.user = user;

    // Lanjut ke handler berikutnya
    next();
  });
}

// Contoh penggunaan middleware authenticateToken pada sebuah protected route
app.get('/protected', authenticateToken, (req, res) => {
  // Jika token valid, kirim respon dengan data pengguna
  res.json({ user: req.user });
});

module.exports = app;