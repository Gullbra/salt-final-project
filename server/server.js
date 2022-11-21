const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express()

const dbMiddleware = async (req, res, next) => {
	const client = new MongoClient("mongodb+srv://thobde:hello123@thor.hqeuwbp.mongodb.net/?retryWrites=true&w=majority");
	const clientPromise = client.connect();
	const db = (await clientPromise).db('event-app');
	req.data = db;
	next()
}

app.get('/events', cors(), dbMiddleware, async (req, res) => {
	const db = req.data;
	
	const collection = db.collection('events');
  const dbres = await collection.find({}).toArray();

	res.status(200).json(dbres);
})

app.listen(9000, () => console.log('http://localhost:9000'))