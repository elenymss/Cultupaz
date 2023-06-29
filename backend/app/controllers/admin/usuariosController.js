import dbconnection from "../../database/dbConf.js";
//ver todos los usuarios
export const verAprendices = async (req, res) => {
  try {
    const query =
      "SELECT * FROM usuarios WHERE idTipo =1  AND estadoUsuario = 1 AND habilitado_usuario =1";
    dbconnection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(result);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const verAprendizInactivo = async (req, res) => {
  try {
    const query =
      "SELECT * FROM usuarios WHERE idTipo =1  AND habilitado_usuario = 0";
    dbconnection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(result);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//ver gestores
export const verGestores = async (req, res) => {
  try {
    const query =
      "SELECT * FROM usuarios WHERE idTipo =2 AND habilitado_usuario = 1 AND estadoUsuario = 1";
    dbconnection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(result);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//ver gestores Inactivo
export const verGestoresInactivo = async (req, res) => {
  try {
    const query =
      "SELECT * FROM usuarios WHERE idTipo =2 AND habilitado_usuario = 0 AND estadoUsuario = 1";
    dbconnection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(result);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//ver un usuario
export const verAprendiz = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM usuarios WHERE idUsuario =?";
    dbconnection.query(query, [id], (err, resul) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(resul);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//actualizar datos
export const updateUsuarios = async (req, res) => {
  const { id } = req.params;
  const querySelect = "SELECT foto FROM usuarios WHERE idUsuario = ?";
  dbconnection.query(querySelect, [id], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error al obtener la imagen anterior");
    }

    if (result.length === 0) {
      return res.status(404).json("La img no existe");
    }

    const urlImagenAnterior = result[0].foto;

    try {
      const { nombres, apellidos, telefono, usuario, correo } = req.body;

      if (!nombres || !apellidos || !telefono) {
        return res.status(400).json("Todos los datos son requeridos");
      }

      let urlImage;

      if (req.files && req.files.imgArtesania) {
        const resul = await cloudinary.uploader.upload(
          req.files.imgArtesania[0].path
        );
        urlImage = resul.secure_url;
      }

      const datosVal = {
        nombres,
        apellidos,
        telefono,
        usuario,
        correo,
      };

      if (urlImage) {
        datosVal.foto = urlImage;
        if (urlImagenAnterior) {
          await cloudinary.uploader.destroy(urlImagenAnterior);
        }
      }

      const query = "UPDATE usuarios SET ? WHERE idUsuario = ?";
      dbconnection.query(query, [datosVal, id], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json("No se ha podido actualizar datos");
        }

        if (result.affectedRows === 0) {
          return res.status(404).json("La datos no existe");
        }

        res.status(200).json("datos actualizados correctamente");
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("Error en el servidor");
    }
  });
};

///ver total usuarios
export const totalUsuarios = async (req, res) => {
  try {
    const query = "SELECT COUNT(*) AS totalUsuarios FROM usuarios";
    dbconnection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(result[0]);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//inactivar Usuario
export const inactivarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const query =
      "UPDATE usuarios SET habilitado_usuario  = ? WHERE idUsuario = ?";
    dbconnection.query(query, [0, id], (err, result) => {
      if (err) {
        return res.status(400).json("No fue posible realizar la solicitud");
      }
      res.status(200).json("Usuario inactivado con exito");
    });
  } catch (error) {
    return res.status(500).json("Error en el servidor");
  }
};

//activar usuarios
export const activarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const query =
      "UPDATE usuarios SET habilitado_usuario = ? WHERE idUsuario = ?";
    dbconnection.query(query, [1, id], (err, result) => {
      if (err) {
        return res.status(400).json("No fue posible inactivar usauario");
      }
      res.status(200).json("Usuario inactivado");
    });
  } catch (error) {
    return res.status(500).json("Error en el servidor");
  }
};
