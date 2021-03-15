
import { Router } from 'express';
import entryRouter from './routes/entry.routes';

export default () => {
	const app = Router();
	entryRouter(app);
	return app
}