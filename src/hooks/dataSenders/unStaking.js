
import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from '../../utils/Environment'
import { getstakingAbi } from "../../utils/contractHelpers";
import { useWeb3React } from "@web3-react/core";
const UserUnStaking = () => {
    const { account } = useWeb3React()
    const web3 = useWeb3();
    const contractAddress = environment.staking;
    const contract = getstakingAbi(contractAddress, web3);
    const userUnStakingBack = useCallback(
        async (tier, status) => {
            var gasFunPrice;
            web3.eth.getGasPrice().then((result) => {
                gasFunPrice = result.toString()
            })
            if (status) {
                try {
                    const gas = await contract.methods
                        .UnstakeTokens(tier)
                        .estimateGas({
                            from: account,
                        })
                    const details = await contract.methods
                        .UnstakeTokens(tier)
                        .send({
                            from: account,
                            gas: gas,
                            gasPrice: gasFunPrice
                        })
                    return details;
                } catch (error) {
                    throw (error)
                }
            }else{
                try {
                    const gas = await contract.methods
                        .EarlyUnstake(tier)
                        .estimateGas({
                            from: account,
                        })
                    const details = await contract.methods
                        .UnstakeTokens(tier)
                        .send({
                            from: account,
                            gas: gas,
                            gasPrice: gasFunPrice
                        })
                    return details;
                } catch (error) {
                    throw (error)
                }
            }

        },
        [contract]
    );
    return { userUnStakingBack: userUnStakingBack };
};
export default UserUnStaking;