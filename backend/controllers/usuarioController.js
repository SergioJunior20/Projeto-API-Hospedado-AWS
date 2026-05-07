const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// GET
exports.getUsuarios = async (req, res) => {
  try {

    const usuarios = await Usuario.find().select('-senha');

    const usuariosFormatados = usuarios.map(usuario => ({
      _id: usuario._id,
      nome: usuario.nome,
      idade: usuario.idade,
      email: usuario.email
    }));

    res.json(usuariosFormatados);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// POST
exports.createUsuario = async (req, res) => {
  try {

    const { nome, idade, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const novo = new Usuario({
      nome,
      idade,
      email,
      senha: senhaHash
    });

    const salvo = await novo.save();

    res.json({
      _id: salvo._id,
      nome: salvo.nome,
      idade: salvo.idade,
      email: salvo.email
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// PUT
exports.updateUsuario = async (req, res) => {
  try {

    delete req.body.senha;

    const atualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!atualizado) {
      return res.status(404).json({
        msg: 'Usuário não encontrado'
      });
    }

    res.json({
      _id: atualizado._id,
      nome: atualizado.nome,
      idade: atualizado.idade,
      email: atualizado.email
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// DELETE
exports.deleteUsuario = async (req, res) => {
  try {

    const deletado = await Usuario.findByIdAndDelete(req.params.id);

    if (!deletado) {
      return res.status(404).json({
        msg: 'Usuário não encontrado'
      });
    }

    res.json({
      message: 'Deletado com sucesso'
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {

    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({
        msg: 'Usuário não encontrado'
      });
    }

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaValida) {
      return res.status(401).json({
        msg: 'Senha inválida'
      });
    }

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      usuario: {
        _id: usuario._id,
        nome: usuario.nome,
        idade: usuario.idade,
        email: usuario.email
      }
    });

  } catch (err) {
    res.status(500).json({
      erro: err.message
    });
  }
};