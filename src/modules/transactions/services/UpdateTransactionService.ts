import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Category from '@modules/categories/infra/typeorm/entities/Category';
import Transaction from '../infra/typeorm/entities/Transaction';

import UpdateTransactionDTO from '../dtos/UpdateTransactionDTO';

class UpdateTransactionService {
  public async execute({
    id,
    title,
    value,
    category,
    type,
  }: UpdateTransactionDTO): Promise<Transaction | undefined> {
    const transactionsRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);

    const transaction = await transactionsRepository.findOne(id);

    let transactionCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!transaction) {
      throw new AppError('Transaction not found.');
    }

    if (!transactionCategory) {
      transactionCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(transactionCategory);
    }

    Object.assign(transaction, {
      title,
      value,
      category: transactionCategory,
      type,
    });

    return transactionsRepository.save(transaction);
  }
}

export default UpdateTransactionService;
