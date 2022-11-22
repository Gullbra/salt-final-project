const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(cors())

const dbMiddleware = async (req, res, next) => {
	const client = new MongoClient("mongodb+srv://thobde:hello123@thor.hqeuwbp.mongodb.net/?retryWrites=true&w=majority");
	const clientPromise = client.connect();
	const db = (await clientPromise).db('event-app');
	req.data = db;
	next()
}

app.get('/events', dbMiddleware, async (req, res) => {
	const db = req.data;
	
	const collection = db.collection('events');
  	const dbres = await collection.find({}).toArray();

	res.status(200).json(dbres);
})

app.post('/events', dbMiddleware, async (req, res) => {
	const db = req.data;	
	const collection = db.collection('events');
	const event = { title: req.body.title, desc: req.body.desc };
	const result = await collection.insertOne(event);

	res.status(201).json({...event});
})

app.listen(3000, () => console.log('http://localhost:3000'))
