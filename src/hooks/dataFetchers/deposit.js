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

const DepositPool = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    // const contractAddressObj = {
    //     contract_BnbForBnb: BNBForBNB(environment?.depositPoolBNBForBNB, web3),
    //     contract_BnbForToken: BNBForToken(environment?.depositPoolBNBForToken, web3),
    //     contract_TokenForBnb: TokenForBNB(environment?.depositPoolTokenForBNB, web3),
    //     contract_TokenForToken: TokenForToken(environment?.depositPoolTokenForToken, web3),
    // }
    const depositThePool = useCallback(
        async ( isStakingTokenBnb, isRewardTokenBnb,contractAddress) => {
            const weiAmount =2;
            if (isStakingTokenBnb === true && isRewardTokenBnb === true) {
              const  contract = BNBForBNB(contractAddress, web3)
            //console.log('sdfasdfasdfasdf', account)
                try {
                    const response = await contract.methods
                        .deposit(account)
                        .call()
                //console.log('deposit success of the pool', response);
                    return response
                } catch (error) {
                //console.log('BNBForBNB error', error);
                    throw error;
                }

            //console.log('first,first', contract);
            } else if (isStakingTokenBnb === true && isRewardTokenBnb === false) {
                const contract = BNBForToken(contractAddress, web3);
                try {
                    const response = await contract.methods
                        .deposit(account)
                        .call()
                //console.log('deposit Success of the pool', response);
                    return response
                } catch (error) {
                //console.log('BNBForToken error', error)
                    throw error
                }
            } else if (isStakingTokenBnb === false && isRewardTokenBnb === true) {
                const contract = TokenForBNB(contractAddress, web3);
            //console.log('first,third', contract);
                try {
                    const response = await contract.methods
                        .deposit(account)
                        .call()
                //console.log('deposit Success of the pool', response);
                    return response

                } catch (error) {
                    throw error;
                }

            } else if (isStakingTokenBnb === false && isRewardTokenBnb === false) {
            //console.log('nhi chlo ga bhar ma ja sala')
                const contract = TokenForToken(contractAddress, web3);
            //console.log('first,fourth', contract,weiAmount);
                try {
                    const response = await contract.methods
                        .deposit(account)
                        .call()
                //console.log('deposit Success of the pool', response);
                    return response
                } catch (error) {
                //console.log('token for token error', error);
                    throw error;
                }

            }
        },
        [account, web3]
    );
    return { depositThePool: depositThePool };
};

export default DepositPool;
