export const formatMoney = (number: number) => {
    // Instead of `decimal` I could've use `currency`,
    // but in this case there will be currency symbol in every row.
    // And I don't like it.
    return number.toLocaleString('en-US', { style: 'decimal', currency: 'ILS' });
};

export const roundNumber = (number: number, decimals = 2): number => {
    const rounder = decimals > 0 ? 10 * decimals : 1;
    return Math.round(number * rounder) / rounder;
};
