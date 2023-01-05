
import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from '../../utils/Environment'
import { getstakingAbi } from "../../utils/contractHelpers";
import { useWeb3React } from "@web3-react/core";
export const StakedAmount = () => {
    const web3 = useWeb3();
    const tokenAddress = environment.staking;
    const contract = getstakingAbi(tokenAddress, web3);
    const stakeAmountFun = useCallback(async (tier,account) => {
        try {
            let approved = await contract.methods.deposit(tier,account).call();

           // console.log('balance of contract hook', approved)
            // approved = web3.utils.fromWei(approved?.stakedAmount?.toString(), 'ether')
            return approved;
        } catch (error) {
           // console.log('dfaeee', error)
        }

    }, [contract]);

    return { stakeAmountFun: stakeAmountFun };
};

export default StakedAmount;
