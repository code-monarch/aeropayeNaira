import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../hooks/auth";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import { ReactComponent as Notification } from "../assets/dashboard-icons/Notification.svg";
import { ReactComponent as Arrow } from "../assets/dashboard-icons/arrow-down.svg";
import { ReactComponent as Profile } from "../assets/icons/Profile.svg";
import { ReactComponent as Home } from "../assets/dashboard-icons/Home.svg";
import { ReactComponent as Plane } from "../assets/dashboard-icons/plane.svg";
import { ReactComponent as Wallet } from "../assets/dashboard-icons/Wallet.svg";
import { ReactComponent as Swap } from "../assets/dashboard-icons/Swap.svg";
import { ReactComponent as Setting } from "../assets/dashboard-icons/Setting.svg";
import { ReactComponent as HomeActive } from "../assets/dashboard-icons/Home-active.svg";
import { ReactComponent as PlaneActive } from "../assets/dashboard-icons/plane-active.svg";
import { ReactComponent as WalletActive } from "../assets/dashboard-icons/Wallet-active.svg";
import { ReactComponent as SwapActive } from "../assets/dashboard-icons/Swap-active.svg";
import { ReactComponent as SettingActive } from "../assets/dashboard-icons/Setting-active.svg";
import MobileNav from "./mobile/MobileNav";
import { useVerifEmailStatus } from "../utils/EmailVerifStatus";

import { Link, useNavigate, useLocation } from "react-router-dom";
import VerifyEmailText from "./VerifyEmailText";

const Nav = ({ userName, isActive, setIsActive }) => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log("pathname", location.pathname);

  const { auth } = useContext(authContext);
  const firstname = auth?.user?.firstname;

  const [showOption, setShowOption] = useState(false);
  const [showProfile, setShowProfile] = useState(
    window.matchMedia("(max-width:1260px)").matches
  );
  const [showNotify, setShowNotify] = useState(
    window.matchMedia("(max-width:1150px)").matches
  );
  const [showMobileNav, setShowMobileNav] = useState(
    window.matchMedia("(max-width:920px)").matches
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setShowProfile(window.matchMedia("(max-width:1260px)").matches);
      setShowNotify(window.matchMedia("(max-width:1150px)").matches);
      setShowMobileNav(window.matchMedia("(max-width:920px)").matches);
    });
  });

  const isVerified = useVerifEmailStatus();
  isVerified
    ? console.log("Is Verified: ", true)
    : console.log("Is verified: ", false);

  return (
    <div className="sticky z-10 top-0 w-screen">
      {!isVerified ? (
        <VerifyEmailText />
      ) : (
        ""
      )}
      {showMobileNav ? (
        <MobileNav isActive={isActive} setIsActive={setIsActive} />
      ) : (
        <nav className="flex items-center justify-center">
          <div className="flex items-center justify-evenly w-full 2xl:w-[1536px]">
            <div className="flex items-center justify-between">
              <div className="mr-[20px] lg:mr-[32px]">
                <Link to="/">
                  <Logo className="w-auto" />
                </Link>
              </div>

              <div className="flex items-center ">
                <Link
                  to="/"
                  className={`mx-[14px] lg:mx-[23px] navigation-link ${
                    isActive === "home" && "active-nav"
                  }`}
                  onClick={() => setIsActive("home")}
                >
                  {isActive === "home" ? (
                    <HomeActive className="mr-[6px]" />
                  ) : (
                    <Home className="mr-[6px]" />
                  )}
                  Home
                </Link>

                <Link
                  to="/flights"
                  className={`mx-[14px] lg:mx-[23px] navigation-link ${
                    isActive === "flight" && "active-nav"
                  }`}
                  onClick={() => setIsActive("flight")}
                >
                  {isActive === "flight" ? (
                    <PlaneActive className="mr-[6px]" />
                  ) : (
                    <Plane className="mr-[6px]" />
                  )}
                  Flights
                </Link>

                <Link
                  to="/wallet"
                  className={`mx-[14px] lg:mx-[23px] navigation-link ${
                    isActive === "wallet" && "active-nav"
                  }`}
                  onClick={() => setIsActive("wallet")}
                >
                  {isActive === "wallet" ? (
                    <WalletActive className="mr-[6px]" />
                  ) : (
                    <Wallet className="mr-[6px]" />
                  )}
                  Wallet
                </Link>

                <Link
                  to="/transaction-history"
                  className={`mx-[14px] lg:mx-[23px] navigation-link ${
                    isActive === "trans" && "active-nav"
                  }`}
                  onClick={() => setIsActive("trans")}
                >
                  {isActive === "trans" ? (
                    <SwapActive className="mr-[6px]" />
                  ) : (
                    <Swap className="mr-[6px]" />
                  )}
                  Transactions
                </Link>

                <Link
                  to="/settings"
                  className={`mx-[14px] lg:mx-[23px] navigation-link ${
                    isActive === "setting" && "active-nav"
                  }`}
                  onClick={() => setIsActive("setting")}
                >
                  {isActive === "setting" ? (
                    <SettingActive className="mr-[6px]" />
                  ) : (
                    <Setting className="mr-[6px]" />
                  )}
                  Settings
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className={`btn-badge ${
                  showNotify ? "btn-badge-responsive" : ""
                }`}
              >
                <span
                  className={`w-[18px] h-[18px] ${
                    showNotify && "w-[24px] h-[24px]"
                  }`}
                >
                  <Notification
                    className={`${showNotify && "w-[24px] h-[24px]"}`}
                  />
                </span>
                <span className={`notify ${showNotify ? "hidden" : "block"}`}>
                  Notification
                </span>
                <span className={`badge ${showNotify && "ml-[2px]"}`}>5</span>
              </button>

              {showProfile ? (
                <button
                  className="profile-button relative"
                  onClick={() => setShowOption(!showOption)}
                >
                  <div className="flex items-center">
                    <Profile />
                  </div>

                  {showOption && (
                    <ul className="profile-dropdown absolute top-8 z-[99999] right-0 ">
                      <li className="profile-name flex items-center">
                        <Profile className="mr-[8px] capitalize" /> {firstname}
                      </li>
                      <li
                        onClick={() => {
                          navigate("/settings");
                        }}
                        className="settings"
                      >
                        Settings
                      </li>
                      <li>
                        <div
                          onClick={() => {
                            auth.logOut();
                          }}
                          className="log-out"
                        >
                          Logout
                        </div>
                      </li>
                    </ul>
                  )}
                </button>
              ) : (
                <button
                  className="profile-btn relative"
                  onClick={() => setShowOption(!showOption)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Profile />
                      <span className="profile-name !capitalize">
                        {firstname}
                      </span>
                      {/* <span className="profile-name">{firstname}</span> */}
                    </div>
                    <Arrow />
                  </div>

                  {showOption && (
                    <ul className="profile-dropdown absolute top-8 z-[99999] left-0 ">
                      <li
                        onClick={() => {
                          navigate("/settings");
                        }}
                        className="settings"
                      >
                        Settings
                      </li>
                      <li>
                        <div
                          onClick={() => {
                            auth.logOut();
                          }}
                          className="log-out"
                        >
                          Logout
                        </div>
                      </li>
                    </ul>
                  )}
                </button>
              )}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};
export default Nav;
