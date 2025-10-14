import bcrypt from 'bcrypt';
import admin from '../../models/admin/auth.js';
import { renderError, ERROR_MESSAGES } from '../../utils/error.js';

const adminAuth = {};

adminAuth.login = async (req, res) => {
  try {
    if (req.validationError) {
      return renderError(res, 'admin/login', null, {
        username: req.body.username,
        validationErrors: req.validationError.fields
      });
    }

    const { username, password } = req.body;

    const foundAdmin = await admin.findByUsername(username);
    if (!foundAdmin) {
      return renderError(res, 'admin/login', ERROR_MESSAGES.USER_NOT_FOUND, {
        username, validationErrors: { username: ERROR_MESSAGES.USER_NOT_FOUND }
      });
    }

    const isMatch = await bcrypt.compare(password, foundAdmin.password);

    if (!isMatch) {
      return renderError(res, 'admin/login', ERROR_MESSAGES.WRONG_PASSWORD, {
        username, validationErrors: { password: ERROR_MESSAGES.WRONG_PASSWORD }
      });
    }

    if (!foundAdmin.is_active) {
      return renderError(res, 'admin/login', ERROR_MESSAGES.ACCOUNT_BLOCKED, {
        username, validationErrors: { username: ERROR_MESSAGES.ACCOUNT_BLOCKED }
      });
    }

    req.session.admin = { id: foundAdmin.id, username: foundAdmin.username, rol: foundAdmin.rol };

    return res.redirect('/api/admin/panel');

  } catch (error) {
    console.error(error);
    return renderError(res, 'admin/login', ERROR_MESSAGES.LOGIN_ERROR, {
      username: req.body.username, validationErrors: {} });
  }
};

adminAuth.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión del admin:', err);
      return res.status(500).send(ERROR_MESSAGES.SERVER_ERROR);
    }
    res.clearCookie('connect.admin.sid');
    res.redirect('/admin/login');
  });
};

adminAuth.listarAdmins = async (req, res) => {
  try {
    const admins = await admin.obtenerAdmins();

    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener administradores" });
  }
};

adminAuth.crearAdmin = async (req, res) => {
  try {
    const { username, password, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await admin.agregarAdmin({ username, password: hashedPassword, rol });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear administrador" });
  }
};

adminAuth.editarAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, rol } = req.body;

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await admin.actualizarAdmin(id, { username, password: hashedPassword, rol });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar administrador" });
  }
};

adminAuth.borrarAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (parseInt(id) === req.session.admin.id) {
      return res.status(400).json({ error: "No puedes eliminar tu propia cuenta." });
    }

    const [result] = await admin.eliminarAdmin(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar administrador" });
  }
};

adminAuth.cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;
    const success = await admin.estadoAdmin(id, is_active);

    res.json({ success });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar estado del administrador' });
  }
};

export default adminAuth;