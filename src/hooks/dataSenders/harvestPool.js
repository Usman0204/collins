import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { escrowContract } from "../../utils/contractHelpers";
import { BNBForBNB } from "../../utils/contractHelpers";
import { BNBForToken } from "../../utils/contractHelpers";
import { TokenForBNB } from "../../utils/contractHelpers";
import { TokenForToken } from "../../utils/contractHelpers";
import Web3 from "web3";

const HarvestPool = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    // const contractAddressObj = {
    //     contract_BnbForBnb: BNBForBNB(environment?.StakePoolBNBForBNB, web3),
    //     contract_BnbForToken: BNBForToken(environment?.StakePoolBNBForToken, web3),
    //     contract_TokenForBnb: TokenForBNB(environment?.StakePoolTokenForBNB, web3),
    //     contract_TokenForToken: TokenForToken(environment?.StakePoolTokenForToken, web3),
    // }
    const harvestThePool = useCallback(
        async (isStakingTokenBnb, isRewardTokenBnb, contractAddress) => {
        //console.log('lock period of the day', isStakingTokenBnb, isRewardTokenBnb)
            const weiAmount = 0;

        //console.log('first,fourthweiAmount', weiAmount);
            if (isStakingTokenBnb === true && isRewardTokenBnb === true) {
                const contract = BNBForBNB(contractAddress, web3)
            //console.log('sdfasdfasdfasdf', account)
                try {
                    const response = await contract.methods
                        .compoundInterest(account)
                        .send({
                            from: account,
                        })
                //console.log('BNBForBNB harvest success  of the pool', response);
                    return response
                } catch (error) {
                    throw error
                //console.log('BNBForBNB harvest error', error);
                }

            //console.log('first,first', contract);
            } else if (isStakingTokenBnb === true && isRewardTokenBnb === false) {
                const contract = BNBForToken(contractAddress, web3);
            //console.log('first,fourth', weiAmount, contract, account);
                try {
                    const response = await contract.methods
                        .compoundInterest(account)
                        .send({
                            from: account,
                        })
                //console.log('BNBForToken harvest  success of the pool', response);
                    return response
                } catch (error) {
                //console.log('BNBForToken harvest error', error)
                    throw error
                }
            } else if (isStakingTokenBnb === false && isRewardTokenBnb === true) {
                const contract = TokenForBNB(contractAddress, web3);
            //console.log('first,fourth', contract);
                try {
                    const response = await contract.methods
                        .compoundInterest(account)
                        .send({
                            from: account,
                        })
                //console.log('TokenForBNB harvest success of the pool', response);
                    return response

                } catch (error) {
                //console.log(' TokenForBNB harvest error', error);
                    throw error;
                }

            } else if (isStakingTokenBnb === false && isRewardTokenBnb === false) {
            //console.log('nhi chlo ga bhar ma ja sala')
                const contract = TokenForToken(contractAddress, web3);
            //console.log('first,fourth', contract, weiAmount);
                try {
                    const response = await contract.methods
                        .compoundInterest(account)
                        .send({
                            from: account,
                        })
                //console.log('TokenForToken harvest success of the pool', response);
                    return response
                } catch (error) {
                //console.log('TokenForToken  harvest error', error);
                    throw error;
                }

            }
        },
        [account, web3]
    );
    return { harvestThePool: harvestThePool };
};

export default HarvestPool;
