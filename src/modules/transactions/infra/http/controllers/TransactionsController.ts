import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import ListTransactionsService from '@modules/transactions/services/ListTransactionsService';
import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import UpdateTransactionService from '@modules/transactions/services/UpdateTransactionService';
// import FindTransactionService from '@modules/transactions/services/FindTransactionByIdService';
import DeleteTransactionService from '@modules/transactions/services/DeleteTransactionService';

import TransactionsRepository from '../../typeorm/repositories/TransactionsRepository';

export default class TransactionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const { type } = request.query;

    let transactions = [];

    const balance = await transactionsRepository.getBalance();

    if (type) {
      const listTransactions = new ListTransactionsService();

      transactions = await listTransactions.execute(type.toString());
    } else {
      transactions = await transactionsRepository.find();
    }

    return response.json({ transactions, balance });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, value, type, category } = request.body;

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
      title,
      value,
      type,
      category,
    });

    return response.json(transaction);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, value, category, type } = request.body;

    const updateTransaction = new UpdateTransactionService();

    const transaction = await updateTransaction.execute({
      id,
      title,
      value,
      category,
      type,
    });

    return response.json(transaction);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTransaction = new DeleteTransactionService();

    await deleteTransaction.execute(id);

    return response.status(204).send();
  }
}
