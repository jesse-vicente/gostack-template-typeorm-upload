import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';

class FindTransactionByIdService {
  public async execute(
    transactionId: string,
  ): Promise<Transaction | undefined> {
    const transactionRepository = getRepository(Transaction);
    const transaction = await transactionRepository.findOne(transactionId);

    if (!transaction) {
      throw new AppError('Transaction not found.');
    }

    return transaction;
  }
}

export default FindTransactionByIdService;
