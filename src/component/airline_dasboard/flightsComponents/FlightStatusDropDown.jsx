import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as DownChevIcon } from "../../../assets/airline_dashboard-icons/downChev-icon.svg";
import { ReactComponent as FilterIcon } from "../../../assets/airline_dashboard-icons/filter-icon.svg";

const style = {
  dropdownItem: `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`,
};

const FlightStatusDropDown = () => {
  return (
    <div>
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="border-[1px] border-[#E2EDF6] rounded-[4px] text-black bg-[#F7FAFC] font-medium font-serif text-[14px] px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <FilterIcon />
        <h3 className="ml-[12px] mr-[14px]">All Flight</h3>
        <DownChevIcon />
      </button>
      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          {/* Link 1 */}
          <li className={style.dropdownItem}>
            <NavLink to="#">Dashboard</NavLink>
          </li>
          {/* Link 1 End*/}

          {/* Link 2 */}
          <li className={style.dropdownItem}>
            <NavLink to="#">Pending</NavLink>
          </li>
          {/* Link 2 End*/}

          {/* Link 3 */}
          <li className={style.dropdownItem}>
            <NavLink to="#">Delayed</NavLink>
          </li>
          {/* Link 3 End*/}

          {/* Link 4 */}
          <li className={style.dropdownItem}>
            <NavLink to="#">Ongoing</NavLink>
          </li>
          {/* Link 4 End*/}

          {/* Link 5 */}
          <li className={style.dropdownItem}>
            <NavLink to="#">Completed</NavLink>
          </li>
          {/* Link 5 End*/}

          {/* Link 6 */}
          <li className={style.dropdownItem}>
            <NavLink to="#">Cancelled</NavLink>
          </li>
          {/* Link 6 End*/}
        </ul>
      </div>
    </div>
  );
};

export default FlightStatusDropDown;
