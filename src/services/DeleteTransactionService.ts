import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<any> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    const isTransactionExists = await transactionRepository.findOne({
      where: { id },
    });

    if (!isTransactionExists) {
      throw new AppError('ID could not be found', 400);
    }
    await transactionRepository.remove(isTransactionExists);
  }
}

export default DeleteTransactionService;
