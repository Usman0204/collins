import React, { useEffect, useState } from "react";
import Loader from "../../../hooks/loader";
import "./banner.scss";
import Environment from "../../../utils/Environment";
import { getstakingAbi } from "../../../utils/contractHelpers";
import { StakedAmount } from '../../../hooks/dataFetchers/stakedAmount'
import useWeb3 from "../../../hooks/useWeb3";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
const Banner = () => {
    const [totalStakedSt, setTotalStakedSt] = useState(0)
    const [singleTierInfo, setSingleTierInfo] = useState([])
    const [totalstakers, setTotalStakers] = useState(0)
    const [loader, setLoader] = useState(false)
    // let tierDetail;
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
    const { account } = useWeb3React()
    const web3 = useWeb3();
   console.log('singleTier', singleTierInfo)
    const totalStaked = async () => {
        const contractAddress = Environment.staking;
        const contract = getstakingAbi(contractAddress, web3);
        // let amount = web3.utils.toWei(stakeData?.toString(), 'ether');
        try {
            let allowance = await contract.methods.totalStaked().call();
            setTotalStakedSt(allowance)
           // console.log('totalStaked', allowance)
        } catch (error) {
           // console.log('totalStaked', error)
        }

    }
    const totalStakers = async () => {
        const contractAddress = Environment.staking;
        const contract = getstakingAbi(contractAddress, web3);
        // let amount = web3.utils.toWei(stakeData?.toString(), 'ether');
        try {
            let allowance = await contract.methods.totalStakers().call();
            setTotalStakers(allowance)
           // console.log('totalStaked', allowance)
        } catch (error) {
           // console.log('totalStaked', error)
        }

    }
    const tierInfo = async () => {
        setLoader(true)
        const contractAddress = Environment.staking;
        const contract = getstakingAbi(contractAddress, web3);
        let dumArray = []
        let dumArray2 = [1, 2, 3, 4, 5, 6]
        // for (let i = 1; i < 7; i++) {
        for (const i of dumArray2) {
            let allowance = await contract.methods.pools(i).call();
            dumArray.push(allowance)
        }
        setSingleTierInfo(dumArray)
        setLoader(false)
    }
    useEffect(() => {
        if (account && web3) {
            (async () => {
                setLoader(true)
                await totalStaked()
                await tierInfo()
                await totalStakers()
                setLoader(false)
            })();
        }

    }, [account, web3])

    return (
        <>

            {loader && <Loader />}
            {/* <!-- ==========Header Section Starts Here========== --> */}

            {/* <!-- ==========Header Section Ends Here========== --> */}
            {/* <!-- ==========>> Banner Section start Here <<========== --> */}
            <section className="banner banner--style2 bg--primary-color" id="home" style={{ backgroundImage: "url()", backgroundSize: "contain;" }}>
                <div className="container ">
                    <div className="banner__wrapper">
                        <div className="row g-5 justify-content-center">
                            <div className="col-lg-10">
                                <div className="banner__content text-center">
                                    <h1 className="tracking-in-expand">Collie Inu<br />STAKING </h1>
                                    <a href="#stakeSection" className="default-btn linkHover"><span>stake now</span></a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
            {/* <!-- ==========>> Banner Section Ends Here <<========== --> */}




            {/* <!-- ==========>> Counter Section start Here <<========== --> */}
            <div className="counter__section counter__section--uplift" style={{ position: "relative" }}>
                <div className="container">
                    <div className="counter__wrapper" data-aos="fade-up" data-aos-duration="1000">
                        <div className="row g-5 justify-content-center align-items-center">
                            <div className="col-lg-6 col-sm-6">
                                <div className="counter__item">
                                    <h3><span data-purecounter-start="0" data-purecounter-end="565"
                                        className="purecounter">{(totalStakedSt / 10 ** 18)?.toFixed(2)}</span>
                                    </h3>
                                    <p>Total Staked Collie</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6">
                                <div className="counter__item">
                                    <h3><span data-purecounter-start="0" data-purecounter-end="120"
                                        className="purecounter">{totalstakers}</span>
                                    </h3>
                                    <p>number of stakers</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- ==========>> Counter Section Ends Here <<========== --> */}



            {/* <!-- ================> tier start here <================== --> */}
            <div id="stakeSection" className="tier padding-top padding-bottom">
                <div className="container">
                    <div className="section-header section-header--middle">
                        <div className="section-header__content">
                            <div className="section-header__titlebar">
                                <p className="section-header__subtitle"> Choose</p>
                                <h2 className="section__header__title"> Tier System</h2>
                            </div>
                        </div>
                    </div>
                    <div className="section__wrapper">
                        <div className="row g-4 justify-content-center row-cols-xl-6 row-cols-lg-3 row-cols-sm-2 row-cols-1">

                            {singleTierInfo?.map((item, id) => {
                                return (
                                    <div className="col-push">
                                        <div className="tier__item ext-pop-up-top">
                                            <div className="tier__inner">
                                                <div className="tier__head glow">
                                                    <h4>{tierDetail[id]?.name}</h4>
                                                    <div className="tier__thumb">
                                                        {/* <!-- <img src="assets/images/tier/01.png" alt="Icon"> --> */}
                                                    </div>
                                                </div>
                                                <div className="tier__body">
                                                    <h4></h4>
                                                    <ul>
                                                        <li>
                                                            <p className="tier__title">Max Collie Allowed</p>
                                                            <p className="tier__value">{(item?.maxallowedTokens / 10 ** 18)?.toFixed(2)}</p>
                                                        </li>
                                                        <li>
                                                            <p className="tier__title">Lock Time</p>
                                                            <p className="tier__value">{(item?.lockPeriod / 86400)?.toFixed(2)} days</p>
                                                        </li>
                                                        <li>
                                                            <p className="tier__title">Staking Reward APY</p>
                                                            <p className="tier__value">{item?.apy / 100}%</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="tier__footer">
                                                    <Link to={`/about/${JSON.stringify(item)}`} className="default-btn reverse"><span>Select Plan</span></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}



                        </div>



                    </div>




                </div>


            </div>
            {/* <!-- ================> tier end here <================== -->

    <!-- ================> stacking start here <================== --> */}
            <div className="stacking padding-top padding-bottom">
                <div className="container">
                    <div className="stacking__wrapper">
                        <div className="stacking__project">
                            <div className="row g-4">
                                <div className="col-lg-4 col-sm-6">
                                    <div className="stacking__project-item">
                                        <div className="stacking__project-itemInner">
                                            <h3><span className="purecounter" data-purecounter-start="639499"
                                                data-purecounter-end="63939379">{(totalStakedSt / 10 ** 18)?.toFixed(2)}</span> </h3>
                                            <p>Total Value Locked</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-sm-6">
                                    <div className="stacking__project-item">
                                        <div className="stacking__project-itemInner">
                                            <h3><span className="purecounter" data-purecounter-start="0"
                                                data-purecounter-end="136.99">{(singleTierInfo[0]?.apy / 100) + (singleTierInfo[1]?.apy / 100) + (singleTierInfo[2]?.apy / 100) + (singleTierInfo[3]?.apy / 100) + (singleTierInfo[4]?.apy / 100) + (singleTierInfo[5]?.apy / 100)}</span> % 
                                                </h3>
                                            <p>Total Apy</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-sm-6">
                                    <div className="stacking__project-item">
                                        <div className="stacking__project-itemInner">
                                            <h3><span className="purecounter" data-purecounter-start="0"
                                                data-purecounter-end="69899">{totalstakers}</span> </h3>
                                            <p>Number of Stakers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="stacking__details">
                            {/* <div className="stacking__title">
                        <h3>tier name</h3>
                    </div>

                     <div className="stacking__content">
                        <div className="row align-items-center g-5">
                            <div className="col-lg-7">
                                <div className="stacking__ammount">
                                    <p>Total Stack</p>
                                    <h4>350.70 BUSD</h4>
                                </div>
                                <div className="stacking__period">
                                    <ul className="stacking__period-list nav nav-pills" id="stackingPeriod" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="period-tab1" data-bs-toggle="tab"
                                                data-bs-target="#period-tab1-pane" type="button" role="tab"
                                                aria-controls="period-tab1-pane" aria-selected="true">7 Days</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
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
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="period-tab1-pane" role="tabpanel"
                                            aria-labelledby="period-tab1" tabindex="0">
                                            <div className="stacking__info">
                                                <div className="row align-items-center g-5">
                                                    <div className="col-sm-8">
                                                        <ul className="stacking__info-list">
                                                            <li className="stacking__info-item">
                                                                <p className="stacking__info-name">Lock Period:
                                                                    <span className="stacking__info-value">7 Days</span>
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
                                                            <h3>10%</h3>
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
                                        <label for="approve-stack" className="form-label">Balance: <span>3529.00 BUSD</span>
                                        </label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" aria-label="Approve Stack"
                                                id="approve-stack" placeholder="0.00"/>
                                            <span className="input-group-text">Max</span>
                                            <button className="input-group-btn">Approve</button>
                                        </div>
                                    </div>
                                    <div className="stacking__approve-withdraw">
                                        <label for="withdraw-stack" className="form-label">Staked: <span>350.70 BUSD</span>
                                        </label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" aria-label="Withdraw Stack"
                                                id="withdraw-stack" placeholder="0.00"/>
                                            <span className="input-group-text">Max</span>
                                            <button className="input-group-btn withdraw-btn">Withdraw</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="note-text"><strong>Note:</strong> Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Molestiae
                            expedita
                            error quod!
                            Eaque, laudantium hic.</p>
                    </div> */}

                        </div>
                    </div>
                </div>
            </div>
            {/* commented cards */}
            <div className="d-none">
                <div className="col-push ">
                    <div className="tier__item ext-pop-up-top">
                        <div className="tier__inner">
                            <div className="tier__head glow ">
                                <h4>Black Collie</h4>
                                <div className="tier__thumb">
                                    {/* <!-- <img src="assets/images/tier/01.png" alt="Icon"> --> */}
                                </div>
                            </div>
                            <div className="tier__body">
                                <h4></h4>
                                <ul>
                                    <li>
                                        <p className="tier__title">Minimum Collie Required</p>
                                        <p className="tier__value">300,000,000</p>
                                    </li>
                                    <li>
                                        <p className="tier__title">Lock Time</p>
                                        <p className="tier__value">7 days</p>
                                    </li>
                                    <li>
                                        <p className="tier__title">Staking Reward APY</p>
                                        <p className="tier__value">10%</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="tier__footer">
                                <Link to="/about/2" className="default-btn reverse"><span>Select Plan</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-push">
                    <div className="tier__item ext-pop-up-top">
                        <div className="tier__inner">
                            <div className="tier__head glow ">
                                <h4>Captin Collie</h4>
                                <div className="tier__thumb">
                                    {/* <!-- <img src="assets/images/tier/01.png" alt="Icon"> --> */}
                                </div>
                            </div>
                            <div className="tier__body">
                                <h4></h4>
                                <ul>
                                    <li>
                                        <p className="tier__title">Minimum Collie Required</p>
                                        <p className="tier__value">750,000,000</p>
                                    </li>
                                    <li>
                                        <p className="tier__title">Lock Time</p>
                                        <p className="tier__value">7 days</p>
                                    </li>
                                    <li>
                                        <p className="tier__title">Staking Reward APY</p>
                                        <p className="tier__value">17%</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="tier__footer">
                                <Link to="/about/3" className="default-btn reverse"><span>Select Plan</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-push">
                    <div className="tier__item ext-pop-up-top">
                        <div className="tier__inner">
                            <div className="tier__head glow ">
                                <h4>Iron Collie</h4>
                                <div className="tier__thumb">
                                    {/* <!-- <img src="assets/images/tier/01.png" alt="Icon"> --> */}
                                </div>
                            </div>
                            <div className="tier__body">
                                <h4></h4>
                                <ul>
                                    <li>
                                        <p className="tier__title">Minimum Collie Required</p>
                                        <p className="tier__value">100,000,000,000</p>
                                    </li>
                                    <li>
                                        <p className="tier__title">Lock Time</p>
                                        <p className="tier__value">7 days</p>
                                    </li>
                                    <li>
                                        <p className="tier__title">Staking Reward APY</p>
                                        <p className="tier__value">25%</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="tier__footer">
                                <Link to="/about/4" className="default-btn reverse"><span>Select Plan</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-push">
                    <div className="tier__item ext-pop-up-top">
                        <div className="tier__inner">
                            <div className="tier__head glow ">
                                <h4>Super Collie</h4>
                                <div className="tier__thumb">
                                    {/* <!-- <img src="assets/images/tier/01.png" alt="Icon"> --> */}
                                </div>
                            </div>
                            <div className="tier__body">
                                <h4></h4>
                                <ul>
                                    <li>
                                        <p className="tier__title">Minimum Collie Required</p>
                                        <p className="tier__value">2,000,000,000,000</p>
                                    </li>
                                    <li>
                                        <p className="tier__title">Lock Time</p>
                                        <p className="tier__value">7 days</p>
                                    </li>
                                    <li>
                                        <p className="tier__title">Staking Reward APY</p>
                                        <p className="tier__value">35%</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="tier__footer">
                                <Link to="/about/5" className="default-btn reverse"><span>Select Plan</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-push">
                    <div className="tier__item ext-pop-up-top">
                        <div className="tier__inner">
                            <div className="tier__head glow ">
                                <h4>Rich Collie</h4>
                                <div className="tier__thumb">
                                    {/* <!-- <img src="assets/images/tier/01.png" alt="Icon"> --> */}
                                </div>
                            </div>
                            <div className="tier__body">
                                <h4></h4>
                                <ul>
                                    <li>
                                        <p className="tier__title">Minimum Collie Required</p>
                                        <p className="tier__value">400,000,000,000</p>
                                    </li>
                                    <li>
                                        <p className="tier__title">Lock Time</p>
                                        <p className="tier__value">7 days</p>
                                    </li>
                                    <li>
                                        <p className="tier__title">Staking Reward APY</p>
                                        <p className="tier__value">50%</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="tier__footer">
                                <Link to="/about/6" className="default-btn reverse"><span>Select Plan</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- ================> stacking end here <================== -->












    <!-- scrollToTop start here --> */}
            <a href="#" className="scrollToTop"><i className="fa-solid fa-arrow-up-from-bracket"></i></a>


        </>

    )
};
export default Banner;
