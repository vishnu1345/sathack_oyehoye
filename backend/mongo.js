require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB:', error);
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const submissionSchema = new mongoose.Schema({
  numberOfTrees: Number,
  treeSpecies: String,
  tempCompatibility: Number,
  soilType: String,
  elevation: Number,
  rainfall: Number,
  files: [String], 
});

const User = mongoose.model('User', userSchema);
const Submission = mongoose.model('Submission', submissionSchema);


module.exports = { User , Submission};
