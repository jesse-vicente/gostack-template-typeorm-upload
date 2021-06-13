import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Category from '../infra/typeorm/entities/Category';

class ListCategoriesService {
  public async execute(): Promise<Category[]> {
    const categoriesRepository = getRepository(Category);

    const categories = await categoriesRepository.find();

    if (!categories) {
      throw new AppError('Categories not found.', 204);
    }

    return categories;
  }
}

export default ListCategoriesService;
