const express = require('express')
const mysql = require('mysql')
const Multer = require('multer')
//const imgUpload = require('../modules/imgUpload')

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'reciphy',
    password: ''
})

module.exports = connection;