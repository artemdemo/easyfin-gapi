const showLog = () => {
    const notProduction = !ENV.production;
    const loggerConst = localStorage.getItem('LOGGER');
    // Logging can be disabled with `loggerConst` even in development
    // This is the reason why I'm first checking for `loggerConst`
    if (loggerConst === 'false') {
        return false;
    }
    return notProduction || loggerConst === 'true';
};

const log = showLog() ? console.log.bind(window.console) : () => {};

const warn = showLog() ? console.warn.bind(window.console) : () => {};

const error = showLog() ? console.error.bind(window.console) : () => {};

const logger = {
    log,
    warn,
    error,
};

export default logger
