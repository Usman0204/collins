import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from '../../utils/Environment'
import { getTokenAbi } from "../../utils/contractHelpers";
import { useWeb3React } from "@web3-react/core";
const Approve = () => {
    // const {account}=useWeb3React()
    const web3 = useWeb3();
    const contractAddress = environment.token;
    let stakingAddress=environment.staking
    const contract = getTokenAbi(contractAddress, web3);
    const userAppriveAllowance = useCallback(
        async (account,amount) => {
            var gasFunPrice;
            web3.eth.getGasPrice().then((result) => {
                gasFunPrice = result.toString()
            })
             amount = web3.utils.toWei(amount?.toString(),'ether')
            try {
                let allowance=await contract.methods.allowance(account,stakingAddress).call()
                // allowance=web3.utils.fromWei(allowance?.toString(),'ether')
                console.log('ddsfasd', allowance, parseFloat(allowance) < parseFloat(amount))
                if(parseFloat(allowance) < parseFloat(amount)){
                    let BigNo= web3.utils.toWei('9999999999999999999999999999999999','ether')
                    let gas=await contract.methods.approve(stakingAddress,BigNo).estimateGas({from : account})
                    let approve=await contract.methods.approve(stakingAddress,BigNo).send({from : account, gas:gas,  gasPrice: gasFunPrice})
                    return approve;
                }else{
                    return allowance;
                }
            } catch (error) {
                throw (error)
            }
        },
        [contract]
    );
    return { userAppriveAllowance: userAppriveAllowance };
};
export default Approve;