import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
const Footer = ({ colorData }) => {
    return (
        <>


            <footer className="footer" style={{ background: "url(assets/images/footer/bg.png" }}>
                <div className="footer__wrapper padding-top padding-bottom">
                    <div className="container">
                        <div className="footer__content text-center">
                            <a className="mb-4 d-inline-block" href="index.html"><img className="w-50" src="/CollieInu_hor.png"
                                alt="Logo" /></a>
                            <ul className="social justify-content-center">
                                <li className="social__item">
                                    <a href="#" className="social__link"><i className="fab fa-twitter"></i></a>
                                </li>
                                <li className="social__item">
                                    <a href="#" className="social__link"><i className="fab fa-discord"></i></a>
                                </li>
                                <li className="social__item">
                                    <a href="#" className="social__link"><i className="fab fa-twitch"></i></a>
                                </li>
                                <li className="social__item">
                                    <a href="#" className="social__link"><i className="fab fa-instagram"></i></a>
                                </li>
                                <li className="social__item">
                                    <a href="#" className="social__link"><i className="fab fa-linkedin-in"></i></a>
                                </li>
                                <li className="social__item">
                                    <a href="#" className="social__link"><i className="fab fa-facebook-f"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer__copyright">
                    <div className="container">
                        <div className="text-center py-4">
                            <p className=" mb-0"> <span id="currentYear"></span> - Collie INU. All Rights Reserved </p>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
};

export default Footer;
