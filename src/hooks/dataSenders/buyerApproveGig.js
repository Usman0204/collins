import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { escrowContract } from "../../utils/contractHelpers";
import Web3 from "web3";

const ApprovePool = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contractAddressObj = {
        contract_BnbForBnb: escrowContract(environment?.StakePoolBNBForBNB, web),
        contract_BnbForToken: escrowContract(environment?.StakePoolBNBForToken, web),
        contract_TokenForBnb: escrowContract(environment?.StakePoolTokenForBNB, web),
        contract_TokenForToken: escrowContract(environment?.StakePoolTokenForToken, web),
    }
    const contractAddress = environment.escrowContractAddress;

    const contract = escrowContract(contractAddress, web3);
    const stakeThePool = useCallback(
        async (id, account) => {
            if (true) {
                contract = contractAddressObj.contract_BnbForBnb;
            } else if (true) {
                contract = contractAddressObj.contract_BnbForToken;
            } else if (true) {
                contract = contractAddressObj.contract_TokenForBnb;
            } else {
                contract = contractAddressObj.contract_TokenForToken;
            }

        //console.log(id);
            var response = await contract.methods
                .buyer_approveGig(id)
                .send({
                    from: account,
                })
                .catch((error) => {
                    return error;
                });

            return response;
        },
        [account, contract]
    );
    return { buyerAppGig: buyerAppGig };
};

export default ApprovePool;
