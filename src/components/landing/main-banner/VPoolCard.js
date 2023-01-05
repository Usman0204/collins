import React, { useEffect, useState } from "react";
import Loader from "../../../hooks/loader";
import Countdown from "react-countdown";
import "./banner.scss";
import useWeb3 from "../../../hooks/useWeb3";
import { useWeb3React } from "@web3-react/core";
import BidBalance from "../../../hooks/dataFetchers/balanceOf";
import { toast } from "react-toastify";
import Approve from '../../../hooks/dataFetchers/approveAllowance'
import Footer from './../footer/Footer';
import Navbar from './../header/Navbar';
import UserStaking from '../../../hooks/dataSenders/staking'
import Environment from "../../../utils/Environment";
import { getTokenAbi } from "../../../utils/contractHelpers";
import { StakedAmount } from '../../../hooks/dataFetchers/stakedAmount'
import UserUnStaking from '../../../hooks/dataSenders/unStaking'
import { useParams } from "react-router-dom";

const VPoolCard = () => {
    const [tokenBalance, setTokenBalance] = useState(0)
    let { tier } = useParams()
    tier = JSON.parse(tier)
   // console.log('param tier', tier)
    const [stakeData, setStakeData] = useState(0)
    const [loader, setLoader] = useState(false)
    const [buttonState, setButtonState] = useState(false)
    const [stakeUnstakeRes, setStakeUnstakeRes] = useState(null)
    const [allowanceRes, setAllowanceRes] = useState()
    const [early, setEarly] = useState()
    const [first, setTimeSt] = useState(0)
    const [tierDetail, setTierDetail] = useState([{
        name: 'Quick Collie',
        plan: 7,
        apy: 10
    }, {
        name: 'Black Collie',
        plan: 14,
        apy: 10
    }, {
        name: 'Captin Collie',
        plan: 21,
        apy: 20
    }, {
        name: 'Iron Collie',
        plan: 28,
        apy: 30
    }, {
        name: 'Super Collie',
        plan: 35,
        apy: 40
    }, {
        name: 'Rich Collie',
        plan: 42,
        apy: 50
    }])
    const [rewardState, setrewardState] = useState()
    const { userAppriveAllowance } = Approve()
    const { stakeAmountFun } = StakedAmount()
    const [stakeAmount, setStakeAmount] = useState(0)
    const web3 = useWeb3();
    const { userUnStakingBack } = UserUnStaking()
    const { userStakingBack } = UserStaking()
    // let tier=1
    let { account } = useWeb3React()
    const { CurrentBlc } = BidBalance()
    const stakeInput = async (e) => {
       // console.log("====>", e.target.value);
        if (e.target.value < 0) {
            setStakeData('')
        } else if (e.target.value > parseFloat(tokenBalance) - 1) {
            setStakeData(parseInt(tokenBalance) - 1)
            // stakeInputt(e.target.value);
        } else {
            setStakeData(e.target.value)
            // stakeInputt(e.target.value);
        }
    }
    const func = async () => {
        //// console.log('askdfasl staked amount', account)
        let balance = await CurrentBlc(account)
        setTokenBalance(balance)
        //// console.log('askdfasl', balance)
    }
    const approve = async () => {
        try {
            setLoader(true)
            let res = await userAppriveAllowance(account, stakeData)
            //   if (res) {
            //     let stake = await userStakingBack(stakeData)
            //     setStakeUnstakeRes(stake)
            //     toast.success('Staked Successfully', {
            //       position: "top-right",
            //       autoClose: 3000,
            //       hideProgressBar: true,
            //       closeOnClick: true,
            //       pauseOnHover: true,
            //       draggable: true,
            //       progress: undefined,
            //       theme: "colored",
            //     })
            //   }
            //// console.log('ddsfasd', res)
            setLoader(false)
            setStakeData(0)
        } catch (error) {
            setLoader(false)
            //// console.log('ddsfasd', error)
            toast.error('Stake Error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

    }
    const allowanceCheck = async () => {

        const contractAddress = Environment.token;
        let stakingAddress = Environment.staking
        const contract = getTokenAbi(contractAddress, web3);
        // let amount = web3.utils.toWei(stakeData?.toString(), 'ether');
        let allowance = await contract.methods.allowance(account, stakingAddress).call();
        setAllowanceRes(allowance)
        allowance = web3.utils.fromWei(allowance?.toString(), 'ether');
       // console.log('ddsfasd=====>', allowance, parseFloat(allowance))
        if (parseFloat(allowance) > 100000) {
            setButtonState(false)
        } else {
            setButtonState(true)
        }
    }
   // console.log('sdfos', stakeAmount)
    const stakedAmFun = async () => {
        setLoader(true)
        let balance = await stakeAmountFun(tier.tier, account)
        let StakedAm = web3.utils.fromWei(balance?.stakedAmount?.toString(), 'ether')
        setStakeAmount(parseFloat(StakedAm))
        let dat = new Date(0);
        dat.setUTCSeconds(parseFloat(balance?.endTime));

        if (balance?.endTime) {
            const date0 = new Date();
           // console.log('alsjfdladjl', date0, dat)
            if (dat > date0) {
                setEarly(true)
                var myDate = new Date("Thursday, 1 January 1970 00:00:00"); // Your timezone!
                var myEpoch = myDate.getTime() / 1000.0;
                let finaltime = parseInt(balance?.endTime) - parseInt(myEpoch)
                let datFinal = new Date(0);
                datFinal.setUTCSeconds(parseFloat(finaltime));
                setTimeSt(datFinal)
               // console.log('jdfjlds', datFinal)
                
            } else {
                setEarly(false)
                setTimeSt('0-0-0')
            }
           
            //             var utcSeconds = balance?.endTime;
            // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            // d.setUTCSeconds(utcSeconds);
        }
        // setTokenBalance(balance)
        setrewardState(balance)
       // console.log('aldflasfl', balance)
        setLoader(false)
    }
    const stakeFun = async () => {
        try {
            setLoader(true)
            let stake = await userStakingBack(stakeData, tier.tier)
            setStakeUnstakeRes(stake)
            //// console.log('ddsfasd stake', stake)
            toast.success('Staked Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            //// console.log('ddsfasd', res)
            setLoader(false)
            setStakeData(0)
        } catch (error) {
            setLoader(false)
           // console.log('ddsfasd', error)
            toast.error('Stake Error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

    }
   // console.log('timer', rewardState)
    const Unstake = async () => {
        try {
            setLoader(true)
            let unstake = await userUnStakingBack(tier.tier,true)
            setStakeUnstakeRes(unstake)
            setLoader(false)
            setStakeData(0)
            toast.success('UnStake Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            func();
            stakedAmFun();
        } catch (error) {
            setLoader(false)
            //// console.log('ddsfasd unstake', error)
            toast.error('Unstake Error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

    }
    const EarlyUnstake = async () => {
        try {
            setLoader(true)
            let unstake = await userUnStakingBack(tier.tier,false)
            setStakeUnstakeRes(unstake)
            setLoader(false)
            setStakeData(0)
            toast.success('UnStake Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            func();
            stakedAmFun();
        } catch (error) {
            setLoader(false)
            //// console.log('ddsfasd unstake', error)
            toast.error('Unstake Error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

    }
    useEffect(() => {
        if (account) {
            //// console.log('askdfasl staked amount', account)
            (async () => {
                await func()
                await allowanceCheck()
                await stakedAmFun()
            })()
        }
        window.scrollTo(0, 0)

    }, [account, buttonState, stakeUnstakeRes])
    return (
        <>
            <Navbar />
            {loader && <Loader />}

            <div className="stacking padding-top padding-bottom">
                <div className="container">
                    <div className="stacking__wrapper">
                        {/* <div className="stacking__project">
                    <div className="row g-4">
                        <div className="col-lg-4 col-sm-6">
                            <div className="stacking__project-item">
                                <div className="stacking__project-itemInner">
                                    <h3>$ <span className="purecounter" data-purecounter-start="639499"
                                            data-purecounter-end="63939379">6,368,143.24</span> </h3>
                                    <p>Total Value Locked</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="stacking__project-item">
                                <div className="stacking__project-itemInner">
                                    <h3><span className="purecounter" data-purecounter-start="0"
                                            data-purecounter-end="136.99">136</span>.99 %</h3>
                                    <p>Apy</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="stacking__project-item">
                                <div className="stacking__project-itemInner">
                                    <h3><span className="purecounter" data-purecounter-start="0"
                                            data-purecounter-end="69899">69899</span> </h3>
                                    <p>Number of Stakers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                        <div className="stacking__details">
                            <div className="stacking__title">
                                <h3>{tierDetail[tier.tier - 1].name}</h3>
                            </div>

                            <div className="stacking__content">
                                <div className="row align-items-center g-5">
                                    <div className="col-lg-7">
                                        {/* <div className="stacking__ammount">
                                            <p>Total Stack</p>
                                            <h4>350.70 COLLIE</h4>
                                        </div> */}
                                        <div className="stacking__period">
                                            <ul className="stacking__period-list nav nav-pills" id="stackingPeriod" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active " id="period-tab1" data-bs-toggle="tab"
                                                        data-bs-target="#period-tab1-pane" type="button" role="tab"
                                                        aria-controls="period-tab1-pane" aria-selected="true">Lock Period: { parseInt(tier?.lockPeriod / 86400)} Days</button>
                                                </li>
                                                {/* <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="period-tab2" data-bs-toggle="tab"
                                                        data-bs-target="#period-tab2-pane" type="button" role="tab"
                                                        aria-controls="period-tab2-pane" aria-selected="false">14 Days</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="period-tab3" data-bs-toggle="tab"
                                                        data-bs-target="#period-tab3-pane" type="button" role="tab"
                                                        aria-controls="period-tab3-pane" aria-selected="false">30 Days</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="period-tab4" data-bs-toggle="tab"
                                                        data-bs-target="#period-tab4-pane" type="button" role="tab"
                                                        aria-controls="period-tab4-pane" aria-selected="false">60 Days</button>
                                                </li> */}
                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div className="tab-pane fade show active" id="period-tab1-pane" role="tabpanel"
                                                    aria-labelledby="period-tab1" tabindex="0">
                                                    <div className="stacking__info">
                                                        <div className="row align-items-center g-5">
                                                            <div className="col-sm-8">
                                                                <ul className="stacking__info-list">
                                                                    {/* <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Lock Period:
                                                                            <span className="stacking__info-value">{tier.lockPeriod} Days</span>
                                                                        </p>
                                                                    </li> */}
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Re-locks on registration:
                                                                            <span className="stacking__info-value">Yes</span>
                                                                        </p>
                                                                    </li>
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Early unstake fee:
                                                                            <span className="stacking__info-value">{tier.penalty}%</span>
                                                                        </p>
                                                                    </li>
                                                                    {/* <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Status:
                                                                            <span className="stacking__info-value">Unlocked</span>
                                                                        </p>
                                                                    </li> */}
                                                                </ul>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="stacking__apy">
                                                                    <p>APY Rate </p>
                                                                    <h3>{tier.apy / 100}%</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="period-tab2-pane" role="tabpanel"
                                                    aria-labelledby="period-tab2" tabindex="0">
                                                    <div className="stacking__info">
                                                        <div className="row align-items-center g-5">
                                                            <div className="col-sm-8">
                                                                <ul className="stacking__info-list">
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Lock Period:
                                                                            <span className="stacking__info-value">14 Days</span>
                                                                        </p>
                                                                    </li>
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Re-locks on registration:
                                                                            <span className="stacking__info-value">Yes</span>
                                                                        </p>
                                                                    </li>
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Early unstake fee:
                                                                            <span className="stacking__info-value">23%</span>
                                                                        </p>
                                                                    </li>
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Status:
                                                                            <span className="stacking__info-value">Unlocked</span>
                                                                        </p>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="stacking__apy">
                                                                    <p>APY Rate </p>
                                                                    <h3>20%</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="period-tab3-pane" role="tabpanel"
                                                    aria-labelledby="period-tab3" tabindex="0">
                                                    <div className="stacking__info">
                                                        <div className="row align-items-center g-5">
                                                            <div className="col-sm-8">
                                                                <ul className="stacking__info-list">
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Lock Period:
                                                                            <span className="stacking__info-value">30 Days</span>
                                                                        </p>
                                                                    </li>
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Re-locks on registration:
                                                                            <span className="stacking__info-value">Yes</span>
                                                                        </p>
                                                                    </li>
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Early unstake fee:
                                                                            <span className="stacking__info-value">23%</span>
                                                                        </p>
                                                                    </li>
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Status:
                                                                            <span className="stacking__info-value">Unlocked</span>
                                                                        </p>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="stacking__apy">
                                                                    <p>APY Rate </p>
                                                                    <h3>30%</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="period-tab4-pane" role="tabpanel"
                                                    aria-labelledby="period-tab4" tabindex="0">
                                                    <div className="stacking__info">
                                                        <div className="row align-items-center g-5">
                                                            <div className="col-sm-8">
                                                                <ul className="stacking__info-list">
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Lock Period:
                                                                            <span className="stacking__info-value">60 Days</span>
                                                                        </p>
                                                                    </li>
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Re-locks on registration:
                                                                            <span className="stacking__info-value">Yes</span>
                                                                        </p>
                                                                    </li>
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Early unstake fee:
                                                                            <span className="stacking__info-value">23%</span>
                                                                        </p>
                                                                    </li>
                                                                    <li className="stacking__info-item">
                                                                        <p className="stacking__info-name">Status:
                                                                            <span className="stacking__info-value">Unlocked</span>
                                                                        </p>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="stacking__apy">
                                                                    <p>APY Rate </p>
                                                                    <h3>45%</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-8">
                                        <div className="stacking__approve">
                                            <div className="stacking__approve-field mb-5">
                                                <label for="approve-stack" className="form-label">Balance: <span>{parseFloat(tokenBalance)?.toFixed(2)} COLLIE</span>
                                                </label>
                                                <div className="input-group">
                                                    <input disabled={stakeAmount > 0} value={stakeData} onChange={stakeInput} type="number" className="form-control" aria-label="Approve Stack"
                                                        id="approve-stack" placeholder="0.00" />
                                                    <button disabled={stakeAmount > 0} onClick={() => setStakeData(tokenBalance)} className="input-group-text text-light">Max</button>
                                                    {!buttonState ? <button disabled={stakeAmount > 0} onClick={stakeFun} disabled={!stakeData || parseFloat(stakeData) <= 0 || parseFloat(stakeData) === stakeAmount || parseFloat(tokenBalance) <= 0} className={parseFloat(stakeAmount) > 0 ?"input-group-btn stakedBtn" : "input-group-btn" }>Stake</button> : <button onClick={approve} className="input-group-btn">Approve</button>}
                                                </div>
                                            </div>
                                            <div className="stacking__approve-withdraw">
                                                <div className="d-flex justify-content-between">
                                                    <p>Unstake Date :</p>
                                                    <label for="withdraw-stack" className="form-label">Staked: <span>{stakeAmount} COLLIE</span>
                                                    </label>
                                                </div>



                                                <div className="input-group">
                                                    <button className="form-control">
                                                        {JSON.stringify(first)?.split(`"`)[1]?.slice(0, 10) || 0}
                                                        {/* <Countdown date={first} /> */}
                                                    </button>
                                                    {/* <input value={stakeAmount} disabled type="text" className="form-control" aria-label="Withdraw Stack"
                                                        id="withdraw-stack" placeholder="0.00" /> */}
                                                    {/* <span className="input-group-text">Max</span> */}
                                                    {early ?
                                                        <button disabled={!stakeAmount} onClick={EarlyUnstake} className="input-group-btn withdraw-btn">Early Withdraw</button>
                                                        :
                                                        <button disabled={!stakeAmount} onClick={Unstake} className="input-group-btn withdraw-btn">Withdraw</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <p className="note-text"><strong>Note:</strong> Lorem ipsum dolor sit, amet consectetur adipisicing
                                    elit. Molestiae
                                    expedita
                                    error quod!
                                    Eaque, laudantium hic.</p> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    );
};

export default VPoolCard;
