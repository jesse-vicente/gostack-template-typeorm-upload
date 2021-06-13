import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import TransactionsController from '../controllers/TransactionsController';
import ImportTransactionsController from '../controllers/ImportTransactionsController';

const upload = multer(uploadConfig);
const transactionsRouter = Router();

const transactionsController = new TransactionsController();
const importTransactionsController = new ImportTransactionsController();

transactionsRouter.get('/', transactionsController.index);
transactionsRouter.post('/', transactionsController.create);
transactionsRouter.put('/:id', transactionsController.update);
transactionsRouter.delete('/:id', transactionsController.delete);

transactionsRouter.post(
  '/import',
  upload.single('file'),
  importTransactionsController.create,
);

export default transactionsRouter;
