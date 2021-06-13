import { Request, Response } from 'express';

import ImportTransactionsService from '@modules/transactions/services/ImportTransactionsService';

export default class TransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const importTransactions = new ImportTransactionsService();

    const transactions = await importTransactions.execute(request.file.path);

    return response.json(transactions);
  }
}
