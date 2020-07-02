import parseISO from "date-fns/parseISO";

export enum ECoin {
    ils = 'ILS',
    usd = 'USD',
    eur = 'EUR',
    rub = 'RUB',
}

export enum ETransactionType {
    income = 'income',
    expense = 'expense',
    transferFromAccount = 'transferFromAccount',
}

const getFloatMaybe = (valueStr: string): number|undefined => {
    return valueStr !== '' ? parseFloat(valueStr) : undefined;
};

const getStringMaybe = (valueStr: string): string|undefined => {
    return valueStr !== '' ? valueStr : undefined;
};

const getCoinMaybe = (valueStr: string): ECoin|undefined => {
    return valueStr !== '' ? ECoin[valueStr] : undefined;
};

const getExchangeRate = (valueStr: string): number => {
    return valueStr !== '' ? parseFloat(valueStr) : 1
};

const getTags = (valueStr: string): string[] => {
    return valueStr !== '' ? valueStr.split(',') : [];
};

export type TTransactionRowValues = {
    date: Date;
    accountFrom: string;
    accountTo?: string;
    transactionType: ETransactionType;
    amountInDefaultCoin: number;
    defaultCoin: ECoin;
    amountInAccountFromCoin?: number;
    accountFromCoin?: ECoin;
    exchangeRate?: number;
    amountInAccountToCoin?: number;
    accountToCoin?: ECoin;
    comment?: string;
    tags?: string[];
    category?: string;
    rootCategory: string;
    // `parentId` is used to group related transactions.
    // For example when you purchased number of goods together,
    // but you need to place it in different categories.
    // This is only are unique id, not a reference to somewhere.
    // There is no actual parent, just a way to find all related transactions.
    parentId?: string;
    // In order to manage family budget I need to keep all transactions in one file,
    // but to allow different family members access to it.
    // In order to distinguish between entries I'm using `userId`,
    // which most likely will be an email.
    userId: string;
};

const transactionArrToData = (rowArr: string[]): TTransactionRowValues => {
    return {
        date: parseISO(rowArr[0]),
        accountFrom: rowArr[1],
        accountTo: getStringMaybe(rowArr[2]),
        transactionType: ETransactionType[rowArr[3]],
        amountInDefaultCoin: parseFloat(rowArr[4]),
        defaultCoin: ECoin[rowArr[5]],
        amountInAccountFromCoin: getFloatMaybe(rowArr[6]),
        accountFromCoin: getCoinMaybe(rowArr[7]),
        exchangeRate: getExchangeRate(rowArr[8]),
        amountInAccountToCoin: getFloatMaybe(rowArr[9]),
        accountToCoin: getCoinMaybe(rowArr[10]),
        comment: getStringMaybe(rowArr[11]),
        tags: getTags(rowArr[12]),
        category: getStringMaybe(rowArr[13]),
        rootCategory: rowArr[14],
        parentId: rowArr[15],
        userId: rowArr[16],
    };
};

export default transactionArrToData;
