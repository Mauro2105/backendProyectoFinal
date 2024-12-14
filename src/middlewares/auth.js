"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuperAmdin = void 0;
// Verificar que el usuario sea superadmin
const isSuperAmdin = (req, res, next) => {
    const { role } = req.body;
    if (role !== 'superadmin') {
        res.status(403).json({ message: 'Acceso denegado' });
        return;
    }
    next();
};
exports.isSuperAmdin = isSuperAmdin;
