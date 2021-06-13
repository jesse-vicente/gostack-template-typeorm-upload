import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Category from '../infra/typeorm/entities/Category';

class DeleteCategoryService {
  public async execute(id: string): Promise<void> {
    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOne(id);

    if (!category) {
      throw new AppError('Category does not exist.');
    }

    await categoryRepository.remove(category);
  }
}

export default DeleteCategoryService;
