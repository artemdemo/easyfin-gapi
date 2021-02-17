import DataListGRow from '../model/DataListGRow';
import GTransactionRow, {ITransactionRowValues} from '../google-api/GTransactionRow';
import GCategoryRow from '../google-api/GCategoryRow';
import GAccountRow from '../google-api/GAccountRow';
import {Modify} from '../types/utils';

export type TTransaction = Modify<ITransactionRowValues, {
    accountFrom: GAccountRow;
    accountTo?: GAccountRow;
    rootCategory: GCategoryRow;
    category?: GCategoryRow;
}>;

export const enrichTransactions = (
    transactions: DataListGRow<GTransactionRow>,
    accounts: DataListGRow<GAccountRow>,
    categories: DataListGRow<GCategoryRow>,
): TTransaction[] => {
    return transactions.map((transactionRow) => {
        const transactionRowValues = transactionRow.getValues();
        const accountFrom = accounts.find(accountRow => accountRow.getId() === transactionRowValues.accountFrom);
        const accountTo = accounts.find(accountRow => accountRow.getId() === transactionRowValues.accountTo);
        const category = categories.find(categoryRow => categoryRow.getId() === transactionRowValues.category);
        const rootCategory = categories.find(categoryRow => categoryRow.getId() === transactionRowValues.rootCategory);
        return {
            ...transactionRowValues,
            accountFrom,
            accountTo,
            category,
            rootCategory,
        };
    });
}
