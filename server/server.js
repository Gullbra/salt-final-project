const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.static(__dirname + '/static'))
app.use(cors())

const dbMiddleware = async (req, res, next) => {
	const client = new MongoClient(process.env.MONGODB_KEY);
	const clientPromise = client.connect();
	const db = (await clientPromise).db('event-app');
	req.data = db;
	next()
}

app.get('/events', dbMiddleware, (req, res) => {
	const db = req.data;
	
	const collection = db.collection('events');
  	collection.find({}).toArray()
			.then(result => res.status(200).json(result));
})

app.post('/events', dbMiddleware, (req, res) => {
	const db = req.data;	
	const collection = db.collection('events');
	collection.insertOne({...req.body})
		.then(() => res.status(201).json({...req.body}))
		.catch(() => res.status(500).send('There was an error!'))
})

app.delete('/events/:id', dbMiddleware, (req, res) => {
	const db = req.data;	
	const collection = db.collection('events');
	
	collection.deleteOne( {_id: ObjectId(req.params.id)} )
		.then(() => res.status(204).send("Successfully deleted one document."))
		.catch(err => res.status(404).send("No documents matched the query. Deleted 0 documents."))
})

app.patch('/events/:id', dbMiddleware, (req, res) => {
	const db = req.data;	
	const collection = db.collection('events');

	collection.updateOne({_id: ObjectId(req.params.id)}, {$set: {...req.body}})
		.then(() => res.status(204).send("Event edited successfully"))
		.catch((err) => res.status(404).send("There was an error" + err))
})

app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
