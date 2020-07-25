interface IGeneralRoute {
    (): string;
}

interface IEditableResourceRoute extends IGeneralRoute {
    new: () => string;
    view: (id: string) => string;
    edit: (id?: string) => string;
}

interface ISettingsRoute extends IGeneralRoute {
    apiKeys: () => string;
}

export const main = <IGeneralRoute>function () {
    return '/';
};

export const login = <IGeneralRoute>function () {
    return `${main()}login`;
}

export const transactions = <IEditableResourceRoute>function () {
    return `${main()}transactions`;
};
transactions.new = () => `${transactions()}/new`;
transactions.view = (id) => `${transactions()}/${id}`;
transactions.edit = (id) => {
    if (id == undefined) {
        return `${transactions()}/:transactionId/edit`
    }
    return `${transactions()}/${id}/edit`;
};

export const accounts = <IEditableResourceRoute>function () {
    return `${main()}accounts`;
}
accounts.new = () => `${accounts()}/new`;
accounts.view = (id) => `${accounts()}/${id}`;
accounts.edit = (id) => {
    if (id == undefined) {
        return `${accounts()}/:accountId/edit`
    }
    return `${accounts()}/${id}/edit`;
};

export const settings = <ISettingsRoute>function () {
    return `${main()}settings`;
}
settings.apiKeys = () => `${settings()}/api-keys`;

