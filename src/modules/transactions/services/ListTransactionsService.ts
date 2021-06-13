import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';

import TransactionsRepository from '../infra/typeorm/repositories/TransactionsRepository';

class ListTransactionsService {
  public async execute(type: string): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (!type) {
      throw new AppError('Type missing.');
    }

    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('Invalid type.');
    }

    const transactions = await transactionsRepository.find({
      where: {
        type,
      },
    });

    if (!transactions) {
      throw new AppError('Transactions not found.', 204);
    }

    return transactions;
  }
}

export default ListTransactionsService;
