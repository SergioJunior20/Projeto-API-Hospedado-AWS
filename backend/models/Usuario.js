const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },

  idade: {
    type: Number
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  senha: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);