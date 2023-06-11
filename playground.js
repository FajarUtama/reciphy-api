const bcrypt = require('bcrypt');
const connection = require('./config/connection')
const mysql = require('mysql');
const express = require('express');
const app = express.Router();
const secretKey = 'secretkey';



        const name = "user1"
        const username = "username1"
        const email = "user@email.com"
        const password = "E3r4t5y6U7"
        const jwt = require('jsonwebtoken');

    
        // // function hashPassword(password) {
        // //     const pass = password;
        // //     const saltRounds = 10;
        // //     const hashedPassword = bcrypt.hashSync(pass, saltRounds);
        // //     return hashedPassword;
        // // }
    
        // // console.log(hashPassword(password));
        // // const hashedPassword = hashPassword(password);
    
        // // const check = "SELECT * FROM user WHERE username = ?"
        // // connection.query(check, [username], (err, rows, fields) => {
        // //     if (err) {
        // //         console.log("error db");
        // //     } if (results.length > 0) {
        // //         console.log("username already taken");
        // //         return;
        // //     }
        // // })
    
        // // const query = "INSERT INTO user (name, username, email, password) values (?, ?, ?, ?)"
    
        // // connection.query(query, [name, username, email, hashedPassword], (err, rows, fields) => {
        // //     if (err) {
        // //         console.log("error db")
        // //     } else {
        // //         console.log("sukses")        
        // //     }
        // // })

        
        //     // Cari pengguna berdasarkan username di database
        //     const getUserQuery = 'SELECT * FROM user WHERE username = ?';
        //     connection.query(getUserQuery, [username], (err, results) => {
        //         if (err) {
        //             console.error('Error kueri:', err);
        //             console.log("error db");
        //             return;
        //         }
        
        //     // Jika login berhasil
        //         if (results.length > 0) {
        //             const user = results[0];
            
        //             // Periksa password menggunakan bcrypt
        //             bcrypt.compare(password, user.password, (err, isMatch) => {
        //                 if (err) {
        //                     console.error('Error memeriksa password:', err);
        //                     console.log("error db")
        //                     return;
        //                 }
                
        //                 if (isMatch) {
        //                     // Jika login berhasil, buat token JWT
        //                     const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
                
        //                     // Kirim token sebagai respon
        //                     console.log(token)
        //                 } else {
        //                     // Jika login gagal
        //                     console.log("salah dalam")
        //                 }
        //             }); 
        //         } else {
        //             // Jika pengguna tidak ditemukan
        //             console.log("salah luar")
        //         }
        //     }); 



            const axios = require('axios');

            // Fungsi untuk mengambil output dari URL
            async function getOutputFromURL() {
              try {
                const response = await axios.get('https://reciphy-production.up.railway.app/predik/bawang');
                const output = response.data;
                console.log(output);
              } catch (error) {
                console.error('Gagal mengambil output:', error.message);
              }
            }
            
            // Panggil fungsi untuk mengambil output
            getOutputFromURL();            
