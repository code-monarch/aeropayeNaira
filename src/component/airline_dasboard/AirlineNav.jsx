import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Notification } from "../../assets/dashboard-icons/Notification.svg";
import { ReactComponent as Arrow } from "../../assets/dashboard-icons/arrow-down.svg";
import { ReactComponent as Profile } from "../../assets/Profile.svg";
import { ReactComponent as Home } from "../../assets/dashboard-icons/Home.svg";
import { ReactComponent as Plane } from "../../assets/dashboard-icons/plane.svg";
import { ReactComponent as Wallet } from "../../assets/dashboard-icons/Wallet.svg";
import { ReactComponent as Swap } from "../../assets/dashboard-icons/Swap.svg";
import { ReactComponent as Setting } from "../../assets/dashboard-icons/Setting.svg";
import { ReactComponent as HomeActive } from "../../assets/dashboard-icons/Home-active.svg";
import { ReactComponent as PlaneActive } from "../../assets/dashboard-icons/plane-active.svg";
import { ReactComponent as WalletActive } from "../../assets/dashboard-icons/Wallet-active.svg";
import { ReactComponent as SwapActive } from "../../assets/dashboard-icons/Swap-active.svg";
import { ReactComponent as SettingActive } from "../../assets/dashboard-icons/Setting-active.svg";
import AirlineMobileNav from "./AirlineMobileNav";

// A <NavLink> is a special kind of <Link> that knows whether or not it is "active".
// This is useful when building a navigation menu
// such as a breadcrumb or a set of tabs where you'd like to show which of them is currently selected
// When NavLink is active, activate Nav link Text color and Icon color
import { NavLink } from "react-router-dom";

const style = {
  navIcon: `mr-[7.5px] mb-[2px]`,
};

const Nav = ({ userName }) => {
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

  return (
    <>
      {showMobileNav ? (
        <AirlineMobileNav />
      ) : (
        <nav className="flex items-center justify-between px-[64px] sticky z-10 top-0 w-full">
          <div className="flex items-center justify-between">
            <div className="mr-[20px] lg:mr-[32px]">
              <NavLink to="/airline">
                <Logo className="w-auto" />
              </NavLink>
            </div>

            <div className="flex items-center ">
              {/* Home Link */}
              <NavLink
                to="/airline/"
                className="mx-[14px] lg:mx-[23px] navigation-link"
              >
                <div className={style.navIcon}>
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.85108 16.08V13.7867C6.85108 13.2013 7.32913 12.7267 7.91883 12.7267H10.0745C10.3576 12.7267 10.6292 12.8384 10.8295 13.0372C11.0297 13.236 11.1422 13.5056 11.1422 13.7867V16.08C11.1404 16.3234 11.2365 16.5574 11.4093 16.7301C11.582 16.9029 11.817 17 12.0622 17H13.5329C14.2197 17.0018 14.8791 16.7321 15.3654 16.2506C15.8517 15.7691 16.125 15.1152 16.125 14.4334V7.90014C16.125 7.34935 15.8791 6.82688 15.4535 6.4735L10.4505 2.5069C9.58025 1.81142 8.33333 1.83388 7.48904 2.56023L2.60026 6.4735C2.15456 6.81646 1.88816 7.34048 1.875 7.90014V14.4267C1.875 15.8479 3.03554 17 4.46713 17H5.90422C6.41342 17 6.82725 16.5922 6.83094 16.0867L6.85108 16.08Z"
                      fill="#5F6B7A"
                    />
                  </svg>
                </div>
                Home
              </NavLink>
              {/* Home Link End */}

              {/* Flights Link */}
              <NavLink
                to="/airline/flights"
                className="mx-[14px] lg:mx-[23px] navigation-link"
              >
                <div className={style.navIcon}>
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 7.21025L16.5 11V12.5L10.5 10.6055V14.6255L12.75 15.875V17L9.375 16.25L6 17V15.875L8.25 14.6248V10.6047L2.25 12.5V11L8.25 7.21025V3.125C8.25 2.82663 8.36853 2.54048 8.5795 2.3295C8.79048 2.11853 9.07663 2 9.375 2C9.67337 2 9.95952 2.11853 10.1705 2.3295C10.3815 2.54048 10.5 2.82663 10.5 3.125V7.21025Z"
                      fill="#5F6B7A"
                    />
                  </svg>
                </div>
                Flights
              </NavLink>
              {/* Flights Link End */}

              {/* Wallet Link */}
              <NavLink
                to="/airline/wallet"
                className="mx-[14px] lg:mx-[23px] navigation-link"
              >
                <div className={style.navIcon}>
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.3867 2.75C14.9733 2.75 16.5 4.23844 16.5 6.78635H13.3267V6.81235C11.8539 6.81235 10.66 7.97637 10.66 9.41225C10.66 10.8481 11.8539 12.0122 13.3267 12.0122H16.5V12.2461C16.5 14.7616 14.9733 16.25 12.3867 16.25H5.61333C3.02667 16.25 1.5 14.7616 1.5 12.2461V6.75385C1.5 4.23844 3.02667 2.75 5.61333 2.75H12.3867ZM15.94 7.90431C16.2493 7.90431 16.5 8.14875 16.5 8.45029V10.3482C16.4964 10.6483 16.2478 10.8907 15.94 10.8942H13.3867C12.6411 10.904 11.9891 10.4063 11.82 9.69824C11.7353 9.25872 11.8542 8.80517 12.1448 8.45916C12.4354 8.11315 12.868 7.91006 13.3267 7.90431H15.94ZM13.6867 8.78178H13.44C13.2886 8.78004 13.1427 8.83748 13.035 8.94128C12.9273 9.04508 12.8667 9.1866 12.8667 9.33426C12.8666 9.64404 13.1223 9.89617 13.44 9.89973H13.6867C14.0033 9.89973 14.26 9.64947 14.26 9.34076C14.26 9.03204 14.0033 8.78178 13.6867 8.78178ZM9.28667 5.66839H5.05333C4.73928 5.66837 4.48365 5.9147 4.48 6.22087C4.48 6.53066 4.73561 6.78279 5.05333 6.78635H9.28667C9.60331 6.78635 9.86 6.53609 9.86 6.22737C9.86 5.91866 9.60331 5.66839 9.28667 5.66839Z"
                      fill="#5F6B7A"
                    />
                  </svg>
                </div>
                Wallet
              </NavLink>
              {/* Wallet Link End */}

              {/* Transactions Linnk */}
              <NavLink
                to="/airline/transaction-history"
                className="mx-[14px] lg:mx-[23px] navigation-link"
              >
                <div className={style.navIcon}>
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.975 10.122C13.8843 10.122 14.7076 10.1737 15.2141 10.2699C15.222 10.2699 15.6855 10.3652 15.8399 10.4267C16.0629 10.5229 16.2516 10.6966 16.3718 10.914C16.4579 11.0877 16.5 11.2712 16.5 11.4627C16.4921 11.6623 16.3631 12.0373 16.3025 12.1852C15.926 13.1597 14.6901 15.0224 13.9361 15.7369C13.8159 15.858 13.6702 15.989 13.6359 16.0237C13.4463 16.1716 13.2155 16.25 12.9671 16.25C12.7433 16.25 12.5203 16.1805 12.3404 16.0407C12.2469 15.9738 12.1105 15.8409 12.0481 15.7786L12.0147 15.7449C11.2335 15.0144 10.0591 13.1945 9.68168 12.2716C9.67363 12.2716 9.48562 11.8112 9.44759 11.5335L9.44118 11.4627V11.428C9.44118 11.0271 9.66412 10.653 10.0249 10.4614C10.2224 10.3572 10.7964 10.261 10.8052 10.2521C11.3196 10.1737 12.1086 10.122 12.975 10.122ZM5.02915 10.1679C5.38858 10.1679 5.68445 10.4421 5.72488 10.7958L5.72959 10.8788L5.92181 14.3128C5.92181 14.8134 5.52244 15.2188 5.02915 15.2188C4.56669 15.2188 4.186 14.8625 4.14022 14.4055L4.1356 14.3128L4.32871 10.8788C4.32871 10.4859 4.64206 10.1679 5.02915 10.1679ZM5.0338 2.75C5.25587 2.75 5.47882 2.81948 5.65963 2.95845C5.73753 3.01468 5.84526 3.1165 5.9151 3.18495L5.98528 3.25509C6.76559 3.98643 7.94089 5.80545 8.31832 6.72833C8.32556 6.72833 8.51424 7.18942 8.5524 7.46731L8.55882 7.53807V7.57281C8.55882 7.97278 8.335 8.34692 7.97512 8.53844C7.77763 8.64355 7.20359 8.73887 7.19481 8.74778C6.68045 8.82617 5.89136 8.87783 5.02502 8.87783C4.11568 8.87783 3.29235 8.82617 2.7859 8.72996C2.77712 8.72996 2.31455 8.63465 2.16006 8.57318C1.93712 8.47786 1.7484 8.30327 1.62815 8.08591C1.54213 7.9122 1.5 7.7287 1.5 7.53807C1.5079 7.33764 1.63693 6.9635 1.69661 6.81563C2.07405 5.8402 3.30903 3.97753 4.06389 3.26399C4.18414 3.14195 4.32985 3.01101 4.36408 2.97626C4.5528 2.82839 4.78452 2.75 5.0338 2.75ZM12.971 3.78125C13.4335 3.78125 13.8134 4.13749 13.8591 4.59454L13.8637 4.68722L13.6715 8.12134C13.6715 8.51419 13.3581 8.83221 12.971 8.83221C12.6116 8.83221 12.3157 8.558 12.2753 8.20428L12.2706 8.12134L12.0775 4.68722C12.0775 4.18657 12.4777 3.78125 12.971 3.78125Z"
                      fill="#5F6B7A"
                    />
                  </svg>
                </div>
                Transactions
              </NavLink>
              {/* Transactions Link End */}

              {/* Settings Link */}
              <NavLink
                to="/airline/settings"
                className="mx-[14px] lg:mx-[23px] navigation-link"
              >
                <div className={style.navIcon}>
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.53792 2.00012C10.1051 2.00012 10.6186 2.31512 10.9022 2.78012C11.0402 3.00512 11.1322 3.28262 11.1092 3.57512C11.0938 3.80012 11.1628 4.02512 11.2855 4.23512C11.6764 4.87262 12.5425 5.11262 13.217 4.75262C13.9758 4.31762 14.9339 4.58012 15.3707 5.32262L15.8843 6.20762C16.3288 6.95012 16.0836 7.90262 15.3171 8.33012C14.6656 8.71262 14.4356 9.56012 14.8265 10.2051C14.9492 10.4076 15.0871 10.5801 15.3018 10.6851C15.57 10.8276 15.777 11.0526 15.9226 11.2776C16.2062 11.7426 16.1832 12.3126 15.9073 12.8151L15.3707 13.7151C15.0871 14.1951 14.5583 14.4951 14.0141 14.4951C13.7458 14.4951 13.4469 14.4201 13.2016 14.2701C13.0024 14.1426 12.7724 14.0976 12.5271 14.0976C11.7683 14.0976 11.1322 14.7201 11.1092 15.4626C11.1092 16.3251 10.404 17.0001 9.52259 17.0001H8.48019C7.59109 17.0001 6.88594 16.3251 6.88594 15.4626C6.87061 14.7201 6.23444 14.0976 5.47564 14.0976C5.2227 14.0976 4.99276 14.1426 4.80115 14.2701C4.55588 14.4201 4.24929 14.4951 3.98869 14.4951C3.43683 14.4951 2.90797 14.1951 2.62438 13.7151L2.09551 12.8151C1.81192 12.3276 1.79659 11.7426 2.08019 11.2776C2.20282 11.0526 2.43276 10.8276 2.69336 10.6851C2.90797 10.5801 3.04594 10.4076 3.17623 10.2051C3.55947 9.56012 3.32953 8.71262 2.67803 8.33012C1.91923 7.90262 1.67396 6.95012 2.11084 6.20762L2.62438 5.32262C3.06893 4.58012 4.01935 4.31762 4.78582 4.75262C5.45264 5.11262 6.31875 4.87262 6.70965 4.23512C6.83229 4.02512 6.90127 3.80012 6.88594 3.57512C6.87061 3.28262 6.95492 3.00512 7.10055 2.78012C7.38414 2.31512 7.89768 2.01512 8.4572 2.00012H9.53792ZM9.00906 7.38512C7.8057 7.38512 6.83229 8.33012 6.83229 9.50762C6.83229 10.6851 7.8057 11.6226 9.00906 11.6226C10.2124 11.6226 11.1628 10.6851 11.1628 9.50762C11.1628 8.33012 10.2124 7.38512 9.00906 7.38512Z"
                      fill="#5F6B7A"
                    />
                  </svg>
                </div>
                Settings
              </NavLink>
              {/* Settings Link End */}
            </div>
          </div>

          {/*  */}
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
                      <Profile className="mr-[8px]" /> Derek
                    </li>
                    <li>
                      <NavLink to="/" className="settings">
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" className="log-out">
                        Logout
                      </NavLink>
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
                    <span className="profile-name">Derek</span>
                  </div>
                  <Arrow />
                </div>

                {showOption && (
                  <ul className="profile-dropdown absolute top-8 z-[99999] left-0 ">
                    <li>
                      <NavLink to="/" className="settings">
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/" className="log-out">
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                )}
              </button>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Nav;
