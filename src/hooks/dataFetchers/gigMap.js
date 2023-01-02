import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { escrowContract } from "../../utils/contractHelpers";

export const CheckGigMap = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const tokenAddress = environment.escrowContractAddress;
  const contract = escrowContract(tokenAddress, web3);
  const GetGig = useCallback(
    async (id) => {
      const details = await contract.methods.gigMap(id).call();
      return details;
    },
    [account, contract]
  );

  return { GetGig: GetGig };
};

export default CheckGigMap;