import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.index);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.put('/:id', categoriesController.update);
categoriesRouter.delete('/:id', categoriesController.delete);

export default categoriesRouter;
