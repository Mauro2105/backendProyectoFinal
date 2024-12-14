import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        // Verificar si el email ya existe
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el nuevo usuario
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        const user =  await User.findById(id);

        if(!user) {
            res.status(404).json({ message: 'El usuario no existe' });
            return
        }

        user.name = name;
        user.email = email;
        user.role = role;

        const update = await user.save();
        res.status(200).json({ message: 'El usuario fue actualizado ', user: update });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user){
            res.status(404).json({ message: 'El usuario no existe'});
            return
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error){
        res.status(500).json({ message: 'Error al eliminar el usuario'});
    }
}