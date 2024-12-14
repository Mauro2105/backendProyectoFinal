"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importar las librerías
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db_1 = __importDefault(require("./database/db"));
// Inicializar el express
const app = (0, express_1.default)();
// Middlewares configuración para usar CORS y intercambiar los datos con las solicitudes
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
// Conectar a la base de datos
(0, db_1.default)();
// Configurar la carpeta de archivos estátios
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Rutas
app.use('/api', userRoutes_1.default);
// Escuchar peticiones en el puerto 5000
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
