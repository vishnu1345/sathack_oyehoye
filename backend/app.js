const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { User } = require('./mongo.js');

app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET','POST'],
    credentials: true,
  })
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.options('*', cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ email: newUser.email });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/ngo', upload.array('files'), async (req, res) => {
  try {
    const {
      numberOfTrees,
      treeSpecies,
      tempCompatibility,
      soilType,
      elevation,
      rainfall,
    } = req.body;

    const filePaths = req.files.map((file) => file.path);

    const newSubmission = new Submission({
      numberOfTrees,
      treeSpecies,
      tempCompatibility,
      soilType,
      elevation,
      rainfall,
      files: filePaths,
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Submission saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving data' });
  }
});