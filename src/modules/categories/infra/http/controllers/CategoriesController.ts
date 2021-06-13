import { Request, Response } from 'express';

import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
// import FindCategoryService from '@modules/categories/services/FindCategoryByIdService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

export default class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = new ListCategoriesService();

    const categories = await listCategories.execute();

    return response.json(categories);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute({
      title,
    });

    return response.json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title } = request.body;

    const updateCategory = new UpdateCategoryService();

    const category = await updateCategory.execute({
      id,
      title,
    });

    return response.json(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategory = new DeleteCategoryService();

    await deleteCategory.execute(id);

    return response.status(204).send();
  }
}
