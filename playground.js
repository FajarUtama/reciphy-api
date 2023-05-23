const bcrypt = require('bcrypt');
const connection = require('./config/connection')
const mysql = require('mysql');
const express = require('express')
const app = express.Router();


    // const name = 'admin'
    // const username = 'test'
    // const email = 'admin@admin.com'
    // const password = 'E3r4t5y6U7'
    // let exist = false

    // const check = "SELECT * FROM user WHERE username =?"
    // connection.query(check, [username], (err, results, fields) => {
    //     //console.log(check, username)
    //     //console.log(results)
    //     if (err) {
    //         console.log(results)
    //     } if (results.length > 0) {
    //         console.log('exist')
    //         return;
    //     } else {
    //         console.log('can use')
    //     }
    // })


    // const query = "INSERT INTO user (name, username, email, password) values (?, ?, ?, ?)"

    // connection.query(query, [name, username, email, password], (err, rows, fields) => {
    //     if (err) {
    //         res.status(500).send({message: err.sqlMessage})
    //     } else {
    //         res.send({message: "SignUp Successful"})
    //     }
    // })


    // if (err) {
    //     console.error('Error kueri:', err);
    //     res.status(500).json({ error: 'Terjadi kesalahan server' });
    //     return;
    //   }
  
    //   // Jika username sudah digunakan, kirim respon dengan pesan error
    //   if (results.length > 0) {
    //     res.status(400).json({ error: 'Username sudah digunakan' });
    //     return;
    //   }
  



    // const check = "SELECT * FROM user WHERE username = ?"
    // connection.query(check, [username], (err, rows, fields) => {
    //     if (err) {
    //         res.status(500).send({message: err.sqlMessage})
    //     } if (results.length > 0) {
    //         res.status(400).json({ error: 'Username sudah digunakan' });
    //         return;
    //     }
    // })

    // Generate salt dengan tingkat keamanan 10
    // function hashPassword(password) {
    //     const saltRounds = 10;
    //     const hashedPassword = bcrypt.hashSync(password, saltRounds);
    //     return hashedPassword;
    // }
      
    // const plainPassword = "password123";
    // const hashedPassword = hashPassword(plainPassword);
    // console.log(hashedPassword); // Output: Hasil enkripsi bcrypt


    // const query = "INSERT INTO user (name, username, email, password) values (?, ?, ?, ?)"

    // connection.query(query, [name, username, email, password], (err, rows, fields) => {
    //     if (err) {
    //         res.status(500).send({message: err.sqlMessage})
    //     } else {
    //         res.status(200).json({ message: 'Signup berhasil' });        
    //     }
    // })

    const name = 'test1'
    const username = 'admin'
    const email = 'email@email.com'
    const password = 'E3r4t5y6U7'

    // Cari pengguna berdasarkan username di database
    const getUserQuery = 'SELECT * FROM user WHERE username = ?';
    connection.query(getUserQuery, [username], (err, results) => {
        if (err) {
            console.error('Error kueri:', err);
            console.log('error server')
            return;
        }

    // Jika login berhasil
        if (results.length > 0) {
            const user = results[0];
            // Periksa password menggunakan bcrypt
            bcrypt.compare(password, user.password, (err, isMatch) => {
                console.log(user.password)
                console.log(password)
                if (err) {
                    console.error('Error memeriksa password:', err);
                    console.log('error server')
                    return;
                }
        
                if (isMatch) {
                    // Jika login berhasil, buat token JWT
                    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
        
                    // Kirim token sebagai respon
                    //res.json({ token });
                    console.log(token)
                } else {
                    // Jika login gagal
                    console.log('username atau password salah dalam')
                }
            }); 
        } else {
            // Jika pengguna tidak ditemukan
            console.log('username atau password salah luar')
        }
    }); 
    

    // const isMatch = bcrypt.compareSync(plainPassword, password);
    // if (isMatch == true){
    //     // Buat token JWT
    //     const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    //     // Kirim token sebagai respon
    //     console.log(token)
    // }


    // Cek ke database apakah username dan password valid
    // const loginQuery = 'SELECT * FROM user WHERE username = ? AND password = ?';
    // connection.query(loginQuery, [username, plainPassword], (err, results) => {
    //   if (err) {
    //     console.log("Error DB")
    //     return;
    //   }
    //   const password = results[0].password;
    //   console.log(password)
    // Jika login berhasil
    // if (results.length > 0) {
        
        
    //     const isMatch = bcrypt.compareSync(plainPassword, password);
    //     if (isMatch == true){
    //         // Buat token JWT
    //         const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    //         // Kirim token sebagai respon
    //         console.log(token)
    //     }
        
    // } else {
    //     // Jika login gagal
    //     console.log("Username atau Password salah")
    // }
    // });