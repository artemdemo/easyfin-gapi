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

/**
 * Generate random number of given length
 * @link https://stackoverflow.com/a/13708128
 * @param length
 */
export const getRandom = (length: number): number => {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length-1));
}
