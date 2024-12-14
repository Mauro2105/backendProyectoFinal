// Importar las librerías
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import userRoutes from './routes/userRoutes';
import connectDB from './database/db';

// Inicializar el express
const app = express();

// Middlewares configuración para usar CORS y intercambiar los datos con las solicitudes
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Configurar la carpeta de archivos estátios
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api', userRoutes);

// Escuchar peticiones en el puerto 5000
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});