import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance, decimals) => {
    const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
    return displayBalance.toNumber()
}
console.log("getBalanceNumber",getBalanceNumber());

export const getFullDisplayBalance = (balance, decimals) => {
    return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}
