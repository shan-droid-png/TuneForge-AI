import { Router } from 'express';
import healthRoutes from './health.routes.js';

const apiRouter = Router();

// Health check endpoint mounted at /api/v1/health
apiRouter.use('/health', healthRoutes);

// Future domain routes (auth, lyrics, prompts, projects, music) will be mounted here.

export default apiRouter;
