import { Router } from "express";
import {
  verAprendices,
  verGestores,
  verGestoresInactivo,
  verAprendiz,
  updateUsuarios,
  totalUsuarios,
  inactivarUsuario,
  activarUsuario,
  verAprendizInactivo,
} from "../controllers/admin/usuariosController.js";

import multer from "multer";
import { storage } from "../middleware/cloudinary.js";

const upload = multer({
  storage: storage,
});

const router = Router();

router.get("/verAprendices", verAprendices);
router.get("/verAprendizInactivo", verAprendizInactivo);
router.get("/verGestores", verGestores);
router.get("/verGestoresInactivo", verGestoresInactivo);
router.get("/verAprendiz/:id", verAprendiz);

const input = upload.fields([{ name: "foto" }]);
router.put("/actualizarAprendiz/:id", input, updateUsuarios);
router.get("/totalUsuarios", totalUsuarios);
router.put("/inactivarUsuario/:id", inactivarUsuario);
router.put("/activarUsuario/:id", activarUsuario);

export default router;
