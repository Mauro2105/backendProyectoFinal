import { Request, Response, NextFunction } from "express";

// Verificar que el usuario sea superadmin
export const isSuperAmdin = (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body;

    if (role !== 'superadmin'){
        res.status(403).json({ message: 'Acceso denegado'})
        return
    }

    next();
};