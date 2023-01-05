import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from '../../utils/Environment'
import { getTokenAbi } from "../../utils/contractHelpers";
import { useWeb3React } from "@web3-react/core";
export const BidBalance = () => {
    const web3 = useWeb3();
    const tokenAddress = environment.token;
    const contract = getTokenAbi(tokenAddress, web3);
    const CurrentBlc = useCallback(async (account) => {
        try {
            let approved = await contract.methods.balanceOf(account).call();

           // console.log('balance of contract hook', approved)
            approved = web3.utils.fromWei(approved?.toString(), 'ether')
            return approved;
        } catch (error) {
           // console.log('dfaeee', error)
        }

    }, [contract]);

    return { CurrentBlc: CurrentBlc };
};

export default BidBalance;
