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

const RewardPool = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    // const contractAddressObj = {
    //     contract_BnbForBnb: BNBForBNB(environment?.RewardPoolBNBForBNB, web3),
    //     contract_BnbForToken: BNBForToken(environment?.RewardPoolBNBForToken, web3),
    //     contract_TokenForBnb: TokenForBNB(environment?.RewardPoolTokenForBNB, web3),
    //     contract_TokenForToken: TokenForToken(environment?.RewardPoolTokenForToken, web3),
    // }
    const rewardThePool2 = useCallback(
        async ( isStakingTokenBnb, isRewardTokenBnb,contractAddress) => {
            const weiAmount =2;
            if (isStakingTokenBnb === true && isRewardTokenBnb === true) {
              const  contract = VBNBForBNB(contractAddress, web3)
            //console.log('sdfasdfasdfasdf', account)
                try {
                    const response = await contract.methods
                        .checkReward(account)
                        .call()
                //console.log('checkReward success of the pool', response);
                    return response
                } catch (error) {
                //console.log('BNBForBNB error', error);
                    throw error;
                }

            //console.log('first,first', contract);
            } else if (isStakingTokenBnb === true && isRewardTokenBnb === false) {
                const contract = VBNBForToken(contractAddress, web3);
                try {
                    const response = await contract.methods
                        .checkReward(account)
                        .call()
                //console.log('checkReward Success of the pool', response);
                    return response
                } catch (error) {
                //console.log('BNBForToken error', error)
                    throw error
                }
            } else if (isStakingTokenBnb === false && isRewardTokenBnb === true) {
                const contract = VTokenForBNB(contractAddress, web3);
            //console.log('first,third', contract);
                try {
                    const response = await contract.methods
                        .checkReward(account)
                        .call()
                //console.log('checkReward Success of the pool', response);
                    return response

                } catch (error) {
                    throw error;
                }

            } else if (isStakingTokenBnb === false && isRewardTokenBnb === false) {
            //console.log('nhi chlo ga bhar ma ja sala')
                const contract = VTokenForToken(contractAddress, web3);
            //console.log('first,fourth', contract,weiAmount);
                try {
                    const response = await contract.methods
                        .checkReward(account)
                        .call()
                //console.log('checkReward Success of the pool', response);
                    return response
                } catch (error) {
                //console.log('token for token error', error);
                    throw error;
                }

            }
        },
        [account, web3]
    );
    return { rewardThePool2: rewardThePool2 };
};

export default RewardPool;
