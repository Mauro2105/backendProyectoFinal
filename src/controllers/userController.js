"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Crear un nuevo usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    try {
        // Verificar si el email ya existe
        const user = yield User_1.default.findOne({ email });
        if (user) {
            res.status(400).json({ message: 'El email ya está registrado' });
        }
        // Encriptar la contraseña
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Crear el nuevo usuario
        const newUser = new User_1.default({
            name,
            email,
            password: hashedPassword,
            role,
        });
        yield newUser.save();
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});
exports.createUser = createUser;
// Obtener todos los usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select('-password');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});
exports.getUsers = getUsers;
// Actualizar un usuario
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        const user = yield User_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: 'El usuario no existe' });
            return;
        }
        user.name = name;
        user.email = email;
        user.role = role;
        const update = yield user.save();
        res.status(200).json({ message: 'El usuario fue actualizado ', user: update });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
});
exports.updateUser = updateUser;
// Eliminar un usuario
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'El usuario no existe' });
            return;
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
});
exports.deleteUser = deleteUser;
