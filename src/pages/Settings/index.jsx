import React, { useState, useEffect } from "react";
import Account from "./components/Account";
import Profile from "./components/Profile";
import Security from "./components/Security";
import Currency from "./components/Currency";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Layout from "../../component/Layout";

const Settings = () => {
  const [isActive, setIsActive] = useState("setting");
  const [openTab, setOpenTab] = useState("account");

  const [showMobileTab, setShowMobileTab] = useState(
    window.matchMedia("(max-width:669px)").matches
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setShowMobileTab(window.matchMedia("(max-width:669px)").matches);
    });
  });

  return (
    <Layout>
      <div className="settings bg-bg">
        <div className="settings-container w-[100vw] min-h-[100vh]">
          <div className="settings-container-header w-screen">
            <p className="settings-container-header_overview 2xl:!w-[1536px] 2xl:mx-[auto]">
              Manage your bank accounts for FIAT withdrawal and payments
            </p>

            {showMobileTab ? (
              <Swiper
                className="settings-container-header_mobile-tab-btn"
                spaceBetween={2}
                slidesPerView={3.5}
              >
                <SwiperSlide>
                  <button
                    className={`mobile-tab-button ${
                      openTab === "account" && "mobile_open-tab"
                    }`}
                    onClick={() => setOpenTab("account")}
                  >
                    Manage bank account
                  </button>
                </SwiperSlide>
                <SwiperSlide>
                  <button
                    className={`mobile-tab-button tab-3 ${
                      openTab === "profile" && "mobile_open-tab"
                    }`}
                    onClick={() => setOpenTab("profile")}
                  >
                    Profile
                  </button>
                </SwiperSlide>
                <SwiperSlide>
                  <button
                    className={`mobile-tab-button tab-3 ${
                      openTab === "security" && "mobile_open-tab"
                    }`}
                    onClick={() => setOpenTab("security")}
                  >
                    Security
                  </button>
                </SwiperSlide>
                <SwiperSlide>
                  <button
                    className={`mobile-tab-button tab-3 ${
                      openTab === "currency" && "mobile_open-tab"
                    }`}
                    onClick={() => setOpenTab("currency")}
                  >
                    Currency
                  </button>
                </SwiperSlide>
              </Swiper>
            ) : (
              <div className="2xl:w-screen 2xl:flex 2xl:justify-center">
                <div className="settings-container-header_tab-btn 2xl:!w-[1356px] 2xl:!pl-0">
                  <button
                    className={`tab-button mr-[12px] ${
                      openTab === "account" && "open-tab"
                    }`}
                    onClick={() => setOpenTab("account")}
                  >
                    Manage bank account
                  </button>

                  <button
                    className={`tab-button tab-2 mr-[12px] ${
                      openTab === "profile" && "open-tab"
                    }`}
                    onClick={() => setOpenTab("profile")}
                  >
                    Profile
                  </button>

                  <button
                    className={`tab-button tab-2 mr-[12px] ${
                      openTab === "security" && "open-tab"
                    }`}
                    onClick={() => setOpenTab("security")}
                  >
                    Security
                  </button>

                  <button
                    className={`tab-button tab-2 mr-[12px] ${
                      openTab === "currency" && "open-tab"
                    }`}
                    onClick={() => setOpenTab("currency")}
                  >
                    Currency
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="line"></div>

          <div className="2xl:w-screen 2xl:flex 2xl:justify-center">
            <div className="settings-container_tab 2xl:!w-[1536px]">
              {openTab === "account" ? (
                <Account />
              ) : openTab === "profile" ? (
                <Profile />
              ) : openTab === "security" ? (
                <Security />
              ) : openTab === "currency" ? (
                <Currency />
              ) : (
                <Account />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
