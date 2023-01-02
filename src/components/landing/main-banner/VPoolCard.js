import React, { useEffect, useState } from "react";
import useEthBalance from "../../../hooks/dataFetcher";
import Loader from "../../../hooks/loader";
import Countdown from "react-countdown";
import "./banner.scss";
import Web3 from "web3";
import styled from "styled-components";
import { API_URL } from "../../../utils/ApiURL";
import axios from "axios";
import DepositPool from "../../../hooks/dataFetchers/deposit";
import UserInfoPool from "../../../hooks/dataFetchers/userInfo";
import { map } from "lodash";
import { useWeb3React } from "@web3-react/core";
import ApprovePool from "../../../hooks/dataSenders/poolApprove";
import UnStakePool from "../../../hooks/dataSenders/vunstakePool";
import earlyUnstake from "../../../hooks/dataSenders/earlyUnstake";
import harvestPool from "../../../hooks/dataSenders/harvestPool";
import ClaimRewardos from "../../../hooks/dataSenders/claimRewardo";
import StakePool from "../../../hooks/dataSenders/vstakepool";
import CheckBalance from "../../../hooks/dataFetchers/balanceOf";
import CheckAllowance from "../../../hooks/dataFetchers/allowance";
import RewardPool from "../../../hooks/dataFetchers/reward";
import RewardPool2 from "../../../hooks/dataFetchers/variableReward";
import LockPeriodMethod from "../../../hooks/dataFetchers/vlockPeriod";
import AprVariable from "../../../hooks/dataFetchers/aprVariable";
import { toast } from "react-toastify";
import useWeb3 from "../../../hooks/useWeb3";
import Timer from "react-compound-timer/build";
import { ClimbingBoxLoader } from "react-spinners";
import TimerCustom from "./TimerCustom";
import { type } from "eth/core";

import Footer from './../footer/Footer';
import Navbar from './../header/Navbar';

const VPoolCard = () => {

  return (
    <>
   <Navbar />
    
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
