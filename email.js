const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
    email: {
      type: String,
    },
  });
  
  module.exports = mongoose.model('Email', emailSchema);