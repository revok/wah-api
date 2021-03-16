
import { Router } from 'express';
import entryRouter from './routes/entry.routes';
import userRouter from './routes/user.routes';

export default () => {
	const app = Router();
	entryRouter(app);
	userRouter(app);
	return app
}
