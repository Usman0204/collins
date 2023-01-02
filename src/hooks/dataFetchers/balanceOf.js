import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { approvePool } from "../../utils/contractHelpers";

export const CheckBalance = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const balanceOfToken = useCallback(
        async (stakingTokenAddress) => {
            try {
               const contract = approvePool(stakingTokenAddress, web3);
                const details = await contract.methods.balanceOf(account).call();
                return details;
            } catch (error) {
            //console.log('error of the balanceOf',error)
                throw error;
                
            }
           
        },
        [account,web3]
    );

    return { balanceOfToken: balanceOfToken };
};

export default CheckBalance;