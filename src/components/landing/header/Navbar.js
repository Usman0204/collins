import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.scss";
import { HashLink } from "react-router-hash-link";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../../hooks/useAuth";

const Navbar = ({ colorData }) => {
  const { account } = useWeb3React();
  const { login, logout } = useAuth();
  // console.log('navbar data', colorData)
  const connectMetamask = () => {
    localStorage.setItem("connectorId", "injected");
    if (account) {
      logout();
    } else {
      login("injected");
    }
  };

  const close = () => {
    window.$("#myModal2").modal("hide");
  };

  const openn = () => {
    window.$("#myModal2").modal("show");
  };

  const trustWallet = async () => {
    localStorage.setItem("connectorId", "walletconnect");
    if (account) {
      logout();
    } else {
      login("walletconnect");
    }
  };

  return (
    <>
      <header className="header-section header-fixed">
        <div className="container">
          <div className="header-holder">
            <div className="header-primary d-flex flex-wrap justify-content-between align-items-center">
              <div className="brand-logo d-none d-lg-inline-block">
                <div className="logo">
                  <Link to='/' >
                    <img src="/CollieInu_hor.png" style={{ height: "50px" }} alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="header-wrapper justify-content-lg-end">
                <div className="mobile-logo d-lg-none">
                  <a className="" href="index.html"><img src="assets/images/logo/logo.png" alt="logo" /></a>
                </div>
                <div className="menu-area">
                  <ul className="menu">
                    <li>
                      <Link to="/">Home</Link>




                    </li>

                    <li>
                      <a href="index.html">staking</a>

                    </li>

                    <li><a target="_blank" href="https://pancakeswap.finance/swap?outputCurrency=0x31491c35C094A0336f4859Dd94aB9466709deC45">Buy Collie</a></li>
                  </ul>
                  {!account ? <a className="wallet-btn" href="#" data-bs-toggle="modal" data-bs-target="#wallet-option">
                    <span>Connect
                    </span> <i className="fa-solid fa-wallet"></i></a> :
                    <button onClick={connectMetamask} className="wallet-btn">
                      <span>Disconnect
                      </span> <i className="fa-solid fa-wallet"></i></button>}
                  {/* <!-- toggle icons --> */}
                  <div className="header-bar d-lg-none">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </header>
      {/* <!-- connect wallet modal start --> */}
      <div className="wallet-modal modal fade" id="wallet-option" tabindex="-1" aria-labelledby="choose-wallet"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="choose-wallet">Connect Your Wallet</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Please select a wallet from below to connect for Launching yourIDO's</p>
              <ul className="wallet__list">
                <li className="wallet__list-item" onClick={connectMetamask}><a> <span><img src="assets/images/wallet/metamask.svg"
                  alt="metamask" />
                </span> </a></li>
                {/* <li className="wallet__list-item"><a href="#"> <span><img src="assets/images/wallet/coinbase.svg"
                                        alt="coinbase"/>
                                </span> </a></li>
                        <li className="wallet__list-item"><a href="#"> <span><img src="assets/images/wallet/bitski.svg"
                                        alt="bitski"/>
                                </span></a></li>
                        <li className="wallet__list-item"><a href="#"> <span><img src="assets/images/wallet/venly.svg"
                                        alt="venly Wallet"/>
                                </span></a></li> */}
                <li className="wallet__list-item" onClick={trustWallet} ><a> <span><img
                  src="assets/images/wallet/wallet-connect.svg" alt=" Wallet connect" />
                </span></a></li>
              </ul>
              <p>By connecting your wallet, you agree to our <a href="#">Terms of Service</a> and our <a
                href="#">Privacy Policy</a> .</p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- connect wallet modal end --> */}

      
    </>



  );
};

export default Navbar;
