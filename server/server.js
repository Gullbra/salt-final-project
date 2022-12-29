const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.static(__dirname + '/static'))
app.use(cors())

const client = new MongoClient(process.env.MONGODB_KEY);

const dbConnect = async (req, res, next) => {
  console.log('Establishing connection and fetching database...')
  client.connect()
    .then(clientConnection => {
      console.log('...connection established')
      return clientConnection.db('event-handler')
    })
    .then(db => {
      console.log('...database fetched')
      req.db = db
      return next()
    })
    .catch(err => {
      console.log(err.message)
      return res.status(502).send(err.message)
    })
    .finally(() => console.log('Connection and access attempt ended\n'))
}

const dbClose = () => {
  client.close();
  console.log("Connection closed\n")
  // TODO
  // add function taking dbClose as a callback after 5 seconds
}

app.route('/api/events')
  .all(dbConnect)
  .get((req, res, next) => {
    // const searchObj = {}
    // if (req.query && req.query.title) {
    //     searchObj.title = new RegExp('^' + req.query.title, 'i') ;
    // }
    // if (req.query && req.query.location) {
    //     searchObj.location = new RegExp('^' + req.query.location, 'i') ;
    // }
    const pageLimit = 2

    req.db.collection('events')
      .find({}).skip((req.query.page - 1)*pageLimit).limit(pageLimit).toArray()
      .then(result => res.status(200).json(result))
      .finally(() => next())
  })
  .post((req, res, next) => {
    req.db.collection('events')
      .insertOne({...req.body})
      .then(() => res.status(201).json({...req.body}))
      .catch(() => res.status(500).send('There was an error!'))
      .finally(() => next())
  })
  .all(dbClose)

app.route('/api/events/:id')
  .all(dbConnect)
  .get((req, res, next) => {
    req.db.collection('events')
      .find({ _id : req.params.id }).toArray()
      .then(result => res.status(200).json(result))
      .finally(() => next())
  })
  .delete((req, res, next) => {
    req.db.collection('events')
      .deleteOne( {_id: ObjectId(req.params.id)} )
      .then(() => res.status(204).send("Successfully deleted one document."))
      .catch(err => res.status(404).send("No documents matched the query. Deleted 0 documents."))
      .finally(() => next())
  })
  .patch((req, res, next) => {
    req.db.collection('events')
      .updateOne({_id: ObjectId(req.params.id)}, {$set: {...req.body}})
      .then(() => res.status(204).send("Event edited successfully"))
      .catch((err) => res.status(404).send("There was an error" + err))
      .finally(() => next())
  })
  .all(dbClose)

app.route('/api/users/:userid/events')
  .all(dbConnect)
  .get((req, res, next) => {
    req.db.collection('events')
      .find({ userID : req.params.userid }).toArray()
      .then(result => res.status(200).json(result))
      .finally(() => next())
  })
  .all(dbClose)

app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))