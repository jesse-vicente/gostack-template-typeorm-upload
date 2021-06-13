import { Router } from 'express';

import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);

routes.use('/transactions', transactionsRouter);

export default routes;
