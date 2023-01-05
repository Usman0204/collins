import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { approvePool } from "../../utils/contractHelpers";
import Web3 from "web3";

const ApprovePool = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();

    // const contractAddress = environment.ApprovePool;
// var contract;
    const approveThePool = useCallback(
        async (stakingTokenAddress, spender, value) => {
            //// console.log('values of the viber3',account,contractAddress,spender,value);
           const  contract = approvePool(stakingTokenAddress, web3);
            const weiAmount = web3.utils.toWei(value + '');
            try {
                if(account){
                    var response = await contract.methods
                    .approve(spender,weiAmount)
                    .send({
                        from: account,
                    })
                }else{
                //console.log('account is not defined');
                }
             
            } catch (error) {
            //console.log('error fo the approve pool',error);
                throw error;
            }
           
            return response;
        },
        [account,web3]
    );
    return { approveThePool: approveThePool };
};

export default ApprovePool;
