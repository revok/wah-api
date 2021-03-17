import { Router, Request, Response, NextFunction } from 'express';
import EntryService from '../../services/entry.service';
import { Container } from 'typedi';
import { IEntry } from '../../interfaces/entry.interface';
import authMiddleWare from '../../middleware/token.middelware';

const route = Router();

export default (app: Router) => {
  app.use('/entry', route);

  /**
   * Retrieve entry list
   */
  route.get(
    '/',
    authMiddleWare,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const granularity = req.query.granularity;
        const entryServiceInstance = Container.get(EntryService);
        const entries = await entryServiceInstance.getEntries(granularity ? granularity.toString() : undefined);
        return res.status(201).json(entries);
      } catch (e) {
        return next(e);
      }
    },
  );

  /**
   * Retrieve entries grouped by value.
   */
  route.get(
    '/grouped',
    authMiddleWare,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const granularity = req.query.granularity;
        const entryServiceInstance = Container.get(EntryService);
        const entries = await entryServiceInstance.getGroupedData(granularity ? granularity.toString() : undefined);
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