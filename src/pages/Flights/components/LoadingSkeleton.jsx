import { Divider } from "@mui/material";
import React from "react";

const LoadingSkeleton = () => {
    return (
      <>
        <div className="w-[827px] bg-bg flight-container_information-list !shadow-none !mr-0">
          <div className="warning !p-0 !bg-white !border-[2px] !border-bg !shadow-none !rounded-[6px]">
            <div className="skeleton-box !bg-white !w-[100%] !rounded-[6px]"></div>
          </div>
          <div className="shadow-card">
            <div className="header !bg-white">
              <div className="!w-[60%] !h-[30px]">
                <div className="skeleton-box !bg-bg"></div>
              </div>
              <div className="!w-[30%] !h-[30px]">
                <div className="skeleton-box !bg-bg"></div>
              </div>
            </div>
            <div className="section">
              <div className="body">
                <div className="info">
                  <div className="!w-[60%] !h-[30px]">
                    <div className="skeleton-box !bg-white"></div>
                  </div>
                  <div className="!w-[30%] !h-[30px]">
                    <div className="skeleton-box !bg-white"></div>
                  </div>
                </div>
                <div className="body-flight_details">
                  <div className="airline-logo !p-0">
                    <div className="skeleton-box !bg-bg"></div>
                  </div>

                  <div className="departure-time !w-[150px] !h-[120px] !p-0">
                    <div className="skeleton-box !bg-bg"></div>
                  </div>

                  <div className="hours !w-[100px] !h-[80px] !p-0">
                    <div className="skeleton-box !bg-bg"></div>
                  </div>

                  <div className="arrival-time !w-[150px] !h-[120px] !p-0">
                    <div className="skeleton-box !bg-bg"></div>
                  </div>
                  <div className="!w-[80px] !h-[30px] !p-0 !rounded-[12px]">
                    <div className="skeleton-box !bg-bg !rounded-[12px]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flight-checkout !justify-end">
              <div className="flex items-center">
                <div className="cancel-button !bg-white !border-0 !p-0 !w-[120px] !rounded-[6px]">
                  <div className="skeleton-box !bg-white !rounded-[6px]"></div>
                </div>
                <div className="checkIn-button !bg-white !border-0 !p-0 !w-[120px] !rounded-[6px]">
                  <div className="skeleton-box !bg-white !rounded-[6px]"></div>
                </div>
              </div>
              {/* Make Payment End */}
            </div>
          </div>
        </div>
        <div className="w-[827px] bg-bg flight-container_information-list !shadow-none !mr-0">
          <div className="warning !p-0 !bg-white !border-0 !shadow-custom">
            <div className="skeleton-box !bg-white !w-[100%]"></div>
          </div>
          <div className="shadow-card">
            <div className="header !bg-white">
              <div className="!w-[60%] !h-[30px]">
                <div className="skeleton-box !bg-bg"></div>
              </div>
              <div className="!w-[30%] !h-[30px]">
                <div className="skeleton-box !bg-bg"></div>
              </div>
            </div>
            <div className="section">
              <div className="body">
                <div className="info">
                  <div className="!w-[60%] !h-[30px]">
                    <div className="skeleton-box !bg-white"></div>
                  </div>
                  <div className="!w-[30%] !h-[30px]">
                    <div className="skeleton-box !bg-white"></div>
                  </div>
                </div>
                <div className="body-flight_details">
                  <div className="airline-logo !bg-bg !p-0">
                    <div className="skeleton-box !bg-bg"></div>
                  </div>

                  <div className="departure-time !w-[150px] !h-[120px] !p-0">
                    <div className="skeleton-box !bg-bg"></div>
                  </div>

                  <div className="hours !w-[100px] !h-[80px] !p-0">
                    <div className="skeleton-box !bg-bg"></div>
                  </div>

                  <div className="arrival-time !w-[150px] !h-[120px] !p-0">
                    <div className="skeleton-box !bg-bg"></div>
                  </div>
                  <div className="!w-[80px] !h-[30px] !p-0 !rounded-[12px]">
                    <div className="skeleton-box !bg-bg !rounded-[12px]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flight-checkout !justify-end">
              <div className="flex items-center">
                <div className="cancel-button !bg-white !border-0 !p-0 !w-[120px] !rounded-[6px]">
                  <div className="skeleton-box !bg-white !rounded-[6px]"></div>
                </div>
                <div className="checkIn-button !bg-white !border-0 !p-0 !w-[120px] !rounded-[6px]">
                  <div className="skeleton-box !bg-white !rounded-[6px]"></div>
                </div>
              </div>
              {/* Make Payment End */}
            </div>
          </div>
        </div>
      </>
    );
};

export default LoadingSkeleton;
