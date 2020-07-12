interface IMainRoute { (): string; }
export const main = <IMainRoute>function () {
    return '/';
};

interface ILoginRoute { (): string; }
export const login = <ILoginRoute>function () {
    return `${main()}login`;
}

interface ITransactionsRoute { (): string; new: () => string; }
export const transactions = <ITransactionsRoute>function () {
    return `${main()}transactions`;
};
transactions.new = () => `${transactions()}/new`;

interface IAccountsRoute { (): string; new: () => string; }
export const accounts = <IAccountsRoute>function () {
    return `${main()}accounts`;
}
accounts.new = () => `${accounts()}/new`;

interface ISettingsRoute { (): string; apiKeys: () => string; }
export const settings = <ISettingsRoute>function () {
    return `${main()}settings`;
}
settings.apiKeys = () => `${settings()}/api-keys`;

