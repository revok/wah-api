import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { Container } from 'typedi';
import { IUser } from '../../interfaces/user.interface';
import { default as authMiddleWare, default as withAuth } from '../../middleware/token.middelware';
import UserService from '../../services/user.service';

const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  route.get(
    '/',
    authMiddleWare,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userServiceInstance = Container.get(UserService);
        const entries = await userServiceInstance.getUsers();
        return res.status(201).json(entries);
      } catch (e) {
        return next(e);
      }
    },
  );

  /**
   * POST route to register a user.
   * This endpoint is actually kind of an easter egg, but it's useful for debugging.
  */
  route.post(
    '/new',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userServiceInstance = Container.get(UserService);
        const user = await userServiceInstance.createUser(req.body as IUser);
        return res.status(201).json(user);
      } catch (e) {
        return next(e);
      }
    },
  );

  route.get('/validateToken', withAuth, function(req, res) {
    res.sendStatus(200);
  });

  /**
   * Authenticate a user.
   */
  route.post('/login', async function(req, res) {
    const { username, password } = req.body;

    const userServiceInstance = Container.get(UserService);
    const isAuthenticated = await userServiceInstance.authenticate(req.body as IUser);

    if (!isAuthenticated) {
      res.status(401)
      .json({
        error: 'Incorrect email or password'
      });
    }

     // Issue token
     const payload = { username };
     const token = jwt.sign(payload, process.env.SECRET, {
       expiresIn: '24h'
     });

     res
       .cookie('token', token, { httpOnly: true })
       .status(200)
       .json({ token });
  });
};


