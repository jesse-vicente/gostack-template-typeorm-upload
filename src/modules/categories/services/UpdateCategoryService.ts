import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Category from '@modules/categories/infra/typeorm/entities/Category';

import UpdateCategoryDTO from '../dtos/UpdateCategoryDTO';

class UpdateCategoryService {
  public async execute({
    id,
    title,
  }: UpdateCategoryDTO): Promise<Category | undefined> {
    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOne(id);

    if (!category) {
      throw new AppError('Category not found.');
    }

    Object.assign(category, { title });

    return categoryRepository.save(category);
  }
}

export default UpdateCategoryService;
