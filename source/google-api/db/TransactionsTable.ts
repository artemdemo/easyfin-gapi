export interface ITransactionsTable {
  id: string;
  date: string;
  accountFrom: string;
  accountTo: string;
  transactionType: string;
  amountInDefaultCoin: string;
  defaultCoin: string;
  amountInAccountFromCoin: string;
  accountFromCoin: string;
  exchangeRate: string;
  amountInAccountToCoin: string;
  accountToCoin: string;
  comment: string;
  tags: string;
  category: string;
  rootCategory: string;
  // `parentId` is used to group related transactions.
  // For example when you purchased number of goods together,
  // but you need to place it in different categories.
  // This is only are unique id, not a reference to somewhere.
  // There is no actual parent, just a way to find all related transactions.
  parentId: string;
  // In order to manage family budget I need to keep all transactions in one file,
  // but to allow different family members access to it.
  // In order to distinguish between entries I'm using `userId`,
  // which most likely will be an email.
  userId: string;
}

type TTransactionsTableDefinition = {
  [key in keyof ITransactionsTable]: {
    idx: number;
  };
};

export const TransactionsTableDefinition: Readonly<TTransactionsTableDefinition> = {
  id: { idx: 0 },
  date: { idx: 1 },
  accountFrom: { idx: 2 },
  accountTo: { idx: 3 },
  transactionType: { idx: 4 },
  amountInDefaultCoin: { idx: 5 },
  defaultCoin: { idx: 6 },
  amountInAccountFromCoin: { idx: 7 },
  accountFromCoin: { idx: 8 },
  exchangeRate: { idx: 9 },
  amountInAccountToCoin: { idx: 10 },
  accountToCoin: { idx: 11 },
  comment: { idx: 12 },
  tags: { idx: 13 },
  category: { idx: 14 },
  rootCategory: { idx: 15 },
  parentId: { idx: 16 },
  userId: { idx: 17 },
};
