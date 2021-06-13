import { getRepository } from 'typeorm';

// import AppError from '@shared/errors/AppError';

import Category from '@modules/categories/infra/typeorm/entities/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const category = categoryRepository.create({
      title,
    });

    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
