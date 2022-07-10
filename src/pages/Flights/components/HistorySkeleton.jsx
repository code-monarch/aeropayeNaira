import React from 'react'

const list = [1,2,3,4,5]

const HistorySkeleton = () => {
    return (
      <>
        {list.map((i, index) => (
          <div key={index} className="flight-history_item">
            <div className="flight-history_item-list">
              <div className="flight-history_item-list-places !h-[14px] !w-[170px]">
                  <div className="skeleton-box !bg-bg"></div>
              </div>
              <p className="flight-history_item-list-date">
                <div className="skeleton-box !bg-bg !w-[70px] !h-[14px]"></div>
              </p>
            </div>
            <div className="rounded-[40%] w-[20px]">
              <div className="skeleton-box rounded-[40%] !bg-bg !h-[16px]"></div>
            </div>
          </div>
        ))}
      </>
    );
}

export default HistorySkeleton