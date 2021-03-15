import { Router, Request, Response, NextFunction } from 'express';
import EntryService from '../../services/entry.service';
import { Container } from 'typedi';
import { IEntry } from '../../interfaces/entry.interface';

const route = Router();

export default (app: Router) => {
  app.use('/entry', route);

  route.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      console.log('GET ENTRIES');

      try {
        const entryServiceInstance = Container.get(EntryService);
        const entries = await entryServiceInstance.getEntries();
        return res.status(201).json(entries);
      } catch (e) {
        return next(e);
      }
    },
  );

  /**
   * Create a new entry
   */
  route.post(
    '/new',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const entryServiceInstance = Container.get(EntryService);
        const entry = await entryServiceInstance.createEntry(req.body as IEntry);
        return res.status(201).json(entry);
      } catch (e) {
        return next(e);
      }
    },
  );
};