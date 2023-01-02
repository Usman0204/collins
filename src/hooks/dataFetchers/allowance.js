import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { approvePool } from "../../utils/contractHelpers";

export const CheckAllowance = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const allowanceOfToken = useCallback(
        async (stakingTokenAddress, spender) =>{
            try {
                const contract = approvePool(stakingTokenAddress, web3);
                const details = await contract.methods.allowance(account, spender).call();
                return details;
            } catch (error) {
            //console.log('error of the allowance', error)
                throw error;

            }

        },
        [account, web3]
    );

    return { allowanceOfToken: allowanceOfToken };
};

export default CheckAllowance;