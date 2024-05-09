const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()


app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
  res.send('Hello world!!')
})

app.get('/game', (req, res) => {
  connection.query(
    'SELECT * FROM game',
    function(err, results, fields) {
      res.send(results)
    }
  )
})

app.post('/game', (req, res) => {
  connection.query(
      'INSERT INTO `game` (`name`, `detail`, `coverimage`) VALUES (?, ?, ?)',
      [req.body.name, req.body.detail, req.body.coverimage],
       function (err, results, fields) {
        console.log (req.body.name)
          if (err) {
             console.error('Error in POST /game:', err);
              res.status(500).send('Error adding game');
          } else {
              res.status(201).send(results);
          }
      }
  )
})

app.put('/game', (req, res) => {
  connection.query(
      'UPDATE `game` SET `name`=?, `detail`=?, `coverimage`=?',
      [req.body.name, req.body.detail, req.body.coverimage],
       function (err, results, fields) {
          res.send(results)
      }
  )
})

app.delete('/game', (req, res) => {
  connection.query(
      'DELETE FROM `game` WHERE id =?',
      [req.body.id],
       function (err, results, fields) {
          res.send(results)
      }
  )
})

app.listen(process.env.PORT || 3000, () => {
  console.log('CORS-enabled web server listening on port 3000')
})
