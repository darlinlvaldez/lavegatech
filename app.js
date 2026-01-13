// Dependencias
import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import config from './config.js';

// Middlewares base
import session from './src/middlewares/session.js';
import { userLocals, adminLocals } from './src/middlewares/userLocals.js';

// Routes agrupadas
import storeRoutes from './routes/storeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}));

app.use(session);
app.use(userLocals);
app.use(adminLocals);

app.use((req, res, next) => {
  res.locals.req = req;
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.use(express.static(path.join(process.cwd(), 'public')));

app.disable('x-powered-by');

app.use('/', storeRoutes);
app.use('/', adminRoutes);

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
});