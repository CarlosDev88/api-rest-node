const { Router } = require("express");
const router = Router();
const Usuario = require("../models/Usuario");

router.post("/", async (req, res) => {
  try {
    const isUser = await Usuario.findOne({ email: req.body.email });

    if (isUser) {
      return res.send(`El correo ${req.body.email} ya esta registrado`);
    }

    let usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaCreacion = new Date();
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();

    res.send(usuario);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Usuario.find();
    res.send(users);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.put("/:usuarioId", async (req, res) => {
  try {
    let usuario = await Usuario.findById(req.params.usuarioId);

    if (!usuario) {
      return res.send(`El Usuario no existe`);
    }

    const isEmail = await Usuario.findOne({
      email: req.body.email,
      _id: { $ne: usuario._id },
    });

    if (isEmail) {
      return res.send(`El email ya existe`);
    }

    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();

    res.send(usuario);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

module.exports = router;
