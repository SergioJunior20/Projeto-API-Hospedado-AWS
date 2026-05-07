const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');

// LOGIN
router.post('/login', usuarioController.login);

// GET protegido
router.get('/', auth, usuarioController.getUsuarios);

// CREATE
router.post('/', usuarioController.createUsuario);

// UPDATE protegido
router.put('/:id', auth, usuarioController.updateUsuario);

// DELETE protegido
router.delete('/:id', auth, usuarioController.deleteUsuario);

module.exports = router;