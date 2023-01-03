
import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from '../../utils/Environment'
import { getstakingAbi } from "../../utils/contractHelpers";
import { useWeb3React } from "@web3-react/core";
const UserStaking = () => {
    const { account } = useWeb3React()
    const web3 = useWeb3();
    const contractAddress = environment.staking;
    const contract = getstakingAbi(contractAddress, web3);
    const userStakingBack = useCallback(
        async (amount,tier) => {
            var gasFunPrice;
            web3.eth.getGasPrice().then((result) => {
                gasFunPrice = result.toString()
            })
            amount = web3.utils.toWei(amount?.toString(), 'ether')
            try {
                const gas = await contract.methods.stake(amount, tier)
                    .estimateGas({
                        from: account,
                    })
                const details = await contract.methods.stake(amount,tier)
                    .send({
                        from: account,
                        gas: gas,
                        gasPrice: gasFunPrice
                    })
                return details;
            } catch (error) {
                throw (error)
            }
        },
        [contract]
    );
    return { userStakingBack: userStakingBack };
};
export default UserStaking;