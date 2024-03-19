import { services } from './services';
import { Request, Response, NextFunction } from 'express';

export const controllers = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(`NERDX::${new Date()}::Getting all projects`);
            const data = await services.getAll();
            res.status(200).json(data);
        } catch (error: any) {
            next(error.message);
        }
    },
    getById: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const data = await services.getById(id);
            res.status(200).json(data);
        } catch (error: any) {
            next(error.message);
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const { project } = req.body;
        try {
            const data = await services.add(project);
            res.status(200).json(data);
        } catch (error: any) {
            next(error.message);
        }
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const { project } = req.body;
        try {
            const data = await services.update(project);
            res.status(200).json(data);
        } catch (error: any) {
            next(error.message);
        }
    },
    archive: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const data = await services.archive(id);
            res.status(200).json(data);
        } catch (error: any) {
            next(error.message);
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const data = await services.delete(id);
            res.status(200).json(data);
        } catch (error: any) {
            next(error.message);
        }
    },
};
