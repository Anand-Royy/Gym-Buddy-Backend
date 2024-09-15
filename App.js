import express from 'express';
import connectDB from './db/connect.js';
import Routine from './models/Routine.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
dotenv.config();

app.post('/api/routines', async (req, res) => {
  try {
    const { length, name, fields } = req.body; // Get data from the request body
    const id = length;
    const exercises = fields;
    const routineName = name;
    console.log(req.body);
    console.log(id);
    console.log(exercises);
    console.log(routineName);
    const newRoutine = new Routine({
      id,
      exercises,
      routineName,
    });
    const r = await newRoutine.save();
    console.log(r);
    res.status(201).json({ success: true, data: newRoutine });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/routines/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const routine = await Routine.findOne({ id });
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(200).json(routine);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Example route to get all routines
app.get('/api/routines', async (req, res) => {
  try {
    const routines = await Routine.find();
    res.status(200).json({ success: true, data: routines });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.get('/', (req, res) => {
  res.send('hello');
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
