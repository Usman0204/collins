import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { escrowContract } from "../../utils/contractHelpers";
import { VBNBForBNB } from "../../utils/contractHelpers";
import { VBNBForToken } from "../../utils/contractHelpers";
import { VTokenForBNB } from "../../utils/contractHelpers";
import { VTokenForToken } from "../../utils/contractHelpers";
import Web3 from "web3";

const UnStakePool = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    // const contractAddressObj = {
    //     contract_BnbForBnb: BNBForBNB(environment?.StakePoolBNBForBNB, web3),
    //     contract_BnbForToken: BNBForToken(environment?.StakePoolBNBForToken, web3),
    //     contract_TokenForBnb: TokenForBNB(environment?.StakePoolTokenForBNB, web3),
    //     contract_TokenForToken: TokenForToken(environment?.StakePoolTokenForToken, web3),
    // }
    const unstakeThePool = useCallback(
        async (isStakingTokenBnb, isRewardTokenBnb, contractAddress) => {
            // const amount = web3.utils.toWei(Pamount)
        //console.log('lock period of the day', isStakingTokenBnb, isRewardTokenBnb)
            const weiAmount = 0;
            // console.log('gh yu thiu d', amount)
        //console.log('first,fourthweiAmount', weiAmount);
            if (isStakingTokenBnb === true && isRewardTokenBnb === true) {
                const contract = VBNBForBNB(contractAddress, web3)
            //console.log('sdfasdfasdfasdf', account)
                try {
                    const response = await contract.methods
                        .UnstakeTokens()
                        .send({
                            from: account,
                        })
                //console.log('BNBForBNB unstake  of the pool', response);
                    return response
                } catch (error) {
                //console.log('BNBForBNB unstake error', error);
                    throw error;

                }

            //console.log('first,first', contract);
            } else if (isStakingTokenBnb === true && isRewardTokenBnb === false) {
                const contract = VBNBForToken(contractAddress, web3);
            //console.log('first,fourth', weiAmount, contract, account);
                try {
                    const response = await contract.methods
                        .UnstakeTokens()
                        .send({
                            from: account,
                        })
                //console.log('BNBForToken unstake  success of the pool', response);
                    return response
                } catch (error) {
                //console.log('BNBForToken unstake error', error)
                    throw error
                }
            } else if (isStakingTokenBnb === false && isRewardTokenBnb === true) {
                const contract = VTokenForBNB(contractAddress, web3);
            //console.log('first,fourth', contract);
                try {
                    const response = await contract.methods
                        .UnstakeTokens()
                        .send({
                            from: account,
                        })
                //console.log('TokenForBNB UnstakeTokens error of the pool', response);
                    return response

                } catch (error) {
                //console.log(' TokenForBNB unstake error', error);
                    throw error;
                }

            } else if (isStakingTokenBnb === false && isRewardTokenBnb === false) {
            //console.log('nhi chlo ga bhar ma ja sala')
                const contract = VTokenForToken(contractAddress, web3);
            //console.log('first,fourth', contract, weiAmount);
                try {
                    const response = await contract.methods
                        .UnstakeTokens()
                        .send({
                            from: account,
                        })
                //console.log('TokenForToken UnstakeTokens error of the pool', response);
                    return response
                } catch (error) {
                //console.log('TokenForToken  unstake error', error);
                    throw error;
                }

            }
        },
        [account, web3]
    );
    return { unstakeThePool: unstakeThePool };
};

export default UnStakePool;
