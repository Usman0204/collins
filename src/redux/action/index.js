export const ContarctAction = (Useraccount, txiContract,amount,recipt) => async (
    dispatch
  ) => {
     txiContract.methods
      .balanceOf(Useraccount)
      .call()
      .then((balance) => { 
        // console.log("balance",balance);    
        dispatch({
          type: "BALANCE",
          payload: balance,
        });
      });
      txiContract.methods
      .calculateBNBReward(Useraccount)
      .call()
      .then((reward) => { 
        // console.log("reward",reward);    
        dispatch({
          type: "USER_REWARD",
          payload: reward,
        });
      });

      // txiContract.methods.disruptiveTransfer(amount,recipt).send(
      //   {
      //   from: Useraccount,
      //   amount,
      //   recipt
      // }).then((amount)=>{
      //   dispatch({
      //     type: "",
      //     payload: amount,
      //   })
      // })
        
  };