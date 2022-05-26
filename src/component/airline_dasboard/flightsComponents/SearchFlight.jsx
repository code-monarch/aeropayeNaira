import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { FlightFilter } from "../../../data/dropdown-options";
import { ReactComponent as DownChevIcon } from "../../../assets/airline_dashboard-icons/downChev-icon.svg";
import { ReactComponent as FilterIcon } from "../../../assets/airline_dashboard-icons/filter-icon.svg";
import { ReactComponent as Tick } from "../../../assets/tick.svg";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const style = {
  label: `font-sans text-[16px] font-[400] text-black`,
  inputWrap: `flex items-center h-[48px] mt-[8px] mb-[16px] border-[1px] border-[1px] border-[#E1E7EC] rounded-[6px]`,
  input: `focus:bg-bg w-[100%] h-[45px] border-[1px] border-[#E1E7EC] rounded-r-[6px] placeholder:text-[#B8C4CE]`,
  flexedInput: `h-[45px] py-[10px] px-[16px] border-[1px] border-[#E1E7EC] rounded-[6px] focus:bg-bg placeholder:text-[#B8C4CE] overflow-scroll`,
  svgWrap: `bg-bg h-[100%] p-[15px] rounded-l-[6px]`,
};

const SearchFlight = () => {
  const [tick, setTick] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All flights");
  const [departDate, setDepartDate] = useState(null);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const showTick = (a) => {
    console.log(a);
    FlightFilter.forEach((item, index) => {
      if (a === index) {
        setTick(index);
      }
    });
  };
  return (
    <div className="fixed right-0 top-[74px] w-[100vw] flex flex-row items-center justify-between h-[96px] bg-white px-[64px] py-[24px] shadow-sm z-10">
      <div className="flex flex-row">
        {/* Search Form */}
        {/* shall use Algolia for search */}
        <form className="!h-[48px] !bg-[#F7FAFC] mr-[16px] !ml-0 w-[340px] border-[1px] border-[#E2EDF6] rounded-[4px]">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
            Search
          </label>
          <div className="w-full flex items-center my-[16px]">
            <div className="pointer-events-none ml-[16.5px] mr-[8.75px] mr-[4px] border-r-[1px] border-gray pr-[8.75px] mt-[-2px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.25 15.25L11.5 11.5L15.25 15.25ZM0.75 7C0.75 3.54822 3.54822 0.75 7 0.75C10.4518 0.75 13.25 3.54822 13.25 7C13.25 10.4518 10.4518 13.25 7 13.25C3.54822 13.25 0.75 10.4518 0.75 7Z"
                  stroke="#5F6B7A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input
              className="block text-sm text-black bg-bg :placeholder-[#B8C4CE] align-middle text-left font-sans font-normal text-[16px] dark:text-white"
              placeholder="Search by flight ID"
            />
          </div>
        </form>
        {/* Search Form End */}

        {/* DatePicker */}
        <div className=" !h-[48px] !bg-[#F7FAFC] w-[300px] flex justify-between items-center py-2 px-[5px] mr-[16px] border-[1px] border-[#E2EDF6] rounded-[4px] text-black">
          <div>
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="38" height="38" rx="5" fill="#212934" />
              <path
                d="M18.5351 18.2926C18.1446 18.6832 18.1446 19.3163 18.5351 19.7068L22.071 23.2427C22.4615 23.6332 22.4615 24.2663 22.071 24.6567V24.6567C21.6805 25.0472 21.0475 25.0472 20.657 24.6567L15.7071 19.7068C15.3166 19.3163 15.3166 18.6832 15.7071 18.2926L20.657 13.3427C21.0475 12.9523 21.6805 12.9523 22.071 13.3427V13.3427C22.4615 13.7332 22.4615 14.3663 22.071 14.7567L18.5351 18.2926Z"
                fill="white"
              />
            </svg>
          </div>
          {/*  */}

          <div className="mx-[8px]">
            <DatePicker
              selected={departDate}
              onChange={(date) => setDepartDate(date)}
              selectsStart
              dateFormat="MMM dd, yyyy"
              placeholderText="Feb 07, 2022"
              className="booking-dates bg-bg text-center placeholder:text-black"
            />
          </div>
          <div>
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="38"
                y="38"
                width="38"
                height="38"
                rx="5"
                transform="rotate(-180 38 38)"
                fill="#212934"
              />
              <path
                d="M19.4649 19.7074C19.8554 19.3168 19.8554 18.6837 19.4649 18.2932L15.929 14.7573C15.5385 14.3668 15.5385 13.7337 15.929 13.3433V13.3433C16.3195 12.9528 16.9525 12.9528 17.343 13.3433L22.2929 18.2932C22.6834 18.6837 22.6834 19.3168 22.2929 19.7074L17.343 24.6573C16.9525 25.0477 16.3195 25.0477 15.929 24.6573V24.6573C15.5385 24.2668 15.5385 23.6337 15.929 23.2433L19.4649 19.7074Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        {/* Datepicker End */}

        {/* <FlightStatusDropDown /> */}
        <button className="booking-container-dropdown dropdown-3 !mb-0 !h-[48px] !bg-[#F7FAFC] !text-black flex items-center border-[1px] border-[#E2EDF6]">
          <FilterIcon className="mr-[12px]" />
          <div className="dropdown dropdown-end">
            <div tabindex="2" className="relative text-left ">
              {filterStatus}
            </div>

            <ul
              tabindex="2"
              className="dropdown-3-container menu dropdown-content absolute top-[50px] left-[-45px] z-[9999] bg-[#FFF] w-[188px] text-black space-y-[8px] shadow-md"
            >
              {FlightFilter?.map((i, index) => (
                <li
                  key={index}
                  className={`py-[8px] hover:bg-[#F0FFFC] ${
                    tick === index ? "selected" : ""
                  }`}
                >
                  <button
                    className="flex items-center"
                    onClick={() => {
                      setFilterStatus(i);
                      showTick(index);
                    }}
                  >
                    <Tick
                      className={`mr-2 ${
                        tick === index ? "visible" : "invisible"
                      }`}
                    />
                    {i}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <DownChevIcon className="ml-[14px]" />
        </button>
      </div>
      {/* Create Flight Button */}
      <div
        onClick={onOpenModal}
        className="py-[15px] px-[16px] bg-green text-[16px] text-black font-medium lead-[19px] rounded-[6px] shadow-sm cursor-pointer"
      >
        + Create new Flight
      </div>
      {/* Create Flight Button End */}
      <Modal
        open={open}
        onClose={onCloseModal}
        focusTrapped
        closeIconId="closeButton"
      >
        <div className="modal_container w-[464px] h-[764px] rounded-[8px]">
          {/* Header */}
          <div className="flex justify-between Header bg-bg px-[24px] py-[16px]">
            <div className="text-[18px] text-black font-medium font-sans">
              Create flight
            </div>
            {/* Close SVG */}
            <div
              onClick={onCloseModal}
              id="closeButton"
              className="cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5L15 15M5 15L15 5L5 15Z"
                  stroke="#8895A7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          {/* Modal Form body */}
          <div className="form_body px-[24px] py-[16px]">
            {/* Flight Id  */}
            <div>
              <h1 className={style.label}>Flight ID</h1>
              <div className={style.inputWrap}>
                <div className={style.svgWrap}>
                  <svg
                    width="21"
                    height="17"
                    viewBox="0 0 9 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 0.5C3.19 0.5 2.125 1.565 2.125 2.875C2.125 4.16 3.13 5.2 4.44 5.245C4.48 5.24 4.52 5.24 4.55 5.245C4.56 5.245 4.565 5.245 4.575 5.245C4.58 5.245 4.58 5.245 4.585 5.245C5.865 5.2 6.87 4.16 6.875 2.875C6.875 1.565 5.81 0.5 4.5 0.5Z"
                      fill="#5F6B7A"
                    />
                    <path
                      d="M7.04047 6.57543C5.64547 5.64543 3.37047 5.64543 1.96547 6.57543C1.33047 7.00043 0.980469 7.57543 0.980469 8.19043C0.980469 8.80543 1.33047 9.37543 1.96047 9.79543C2.66047 10.2654 3.58047 10.5004 4.50047 10.5004C5.42047 10.5004 6.34047 10.2654 7.04047 9.79543C7.67047 9.37043 8.02047 8.80043 8.02047 8.18043C8.01547 7.56543 7.67047 6.99543 7.04047 6.57543Z"
                      fill="#5F6B7A"
                    />
                  </svg>
                </div>
                <input className={style.input} initialFocusRef type="text" />
              </div>
            </div>
            {/*  */}

            {/* Departure City */}
            <div>
              <h1 className={style.label}>Departure City</h1>
              <div className={style.inputWrap}>
                <div className={style.svgWrap}>
                  <svg
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.47782 7.63199L4.96782 0.559992L6.89882 0.0419922L13.8498 6.46199L19.1118 5.05199C19.4961 4.94909 19.9056 5.00306 20.2501 5.20204C20.5946 5.40101 20.8459 5.72869 20.9488 6.11299C21.0517 6.49729 20.9978 6.90673 20.7988 7.25123C20.5998 7.59574 20.2721 7.84709 19.8878 7.94999L4.91582 11.96L4.13982 9.06199L4.38082 8.99699L6.84782 11.442L4.22182 12.146C4.00649 12.2037 3.77803 12.1879 3.57275 12.1009C3.36747 12.0139 3.19714 11.8608 3.08882 11.666L0.46582 6.93999L1.91482 6.55199L4.38082 8.99699L9.47782 7.63099V7.63199ZM2.99982 15H18.9998V17H2.99982V15Z"
                      fill="#5F6B7A"
                    />
                  </svg>
                </div>
                <input className={style.input} type="text" />
              </div>
            </div>
            {/*  */}

            {/* Departure date */}
            <div>
              <h1 className={style.label}>Departure Date</h1>
              <div className={style.inputWrap}>
                <div className={style.svgWrap}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z"
                      fill="#5F6B7A"
                    />
                    <path
                      d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.11 18.2998 9 18.3698 8.88 18.4198C8.76 18.4698 8.63 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C8 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 8 16.6298 8.12 16.5798C8.36 16.4798 8.64 16.4798 8.88 16.5798C9 16.6298 9.11 16.6998 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.42 14.3798C9.37 14.4998 9.3 14.6098 9.21 14.7098C9.11 14.7998 9 14.8698 8.88 14.9198C8.76 14.9698 8.63 14.9998 8.5 14.9998C8.37 14.9998 8.24 14.9698 8.12 14.9198C8 14.8698 7.89 14.7998 7.79 14.7098C7.7 14.6098 7.63 14.4998 7.58 14.3798C7.53 14.2598 7.5 14.1298 7.5 13.9998C7.5 13.8698 7.53 13.7398 7.58 13.6198C7.63 13.4998 7.7 13.3898 7.79 13.2898C7.89 13.1998 8 13.1298 8.12 13.0798C8.36 12.9798 8.64 12.9798 8.88 13.0798C9 13.1298 9.11 13.1998 9.21 13.2898C9.3 13.3898 9.37 13.4998 9.42 13.6198C9.47 13.7398 9.5 13.8698 9.5 13.9998C9.5 14.1298 9.47 14.2598 9.42 14.3798ZM12.71 14.7098C12.61 14.7998 12.5 14.8698 12.38 14.9198C12.26 14.9698 12.13 14.9998 12 14.9998C11.87 14.9998 11.74 14.9698 11.62 14.9198C11.5 14.8698 11.39 14.7998 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.39 13.1998 11.5 13.1298 11.62 13.0798C11.86 12.9698 12.14 12.9698 12.38 13.0798C12.5 13.1298 12.61 13.1998 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098Z"
                      fill="#5F6B7A"
                    />
                  </svg>
                </div>
                {/* <input className={style.input} type="text" /> */}
                <DatePicker
                  selected={departDate}
                  onChange={(date) => setDepartDate(date)}
                  selectsStart
                  dateFormat="MMM dd, yyyy"
                  // placeholderText="Feb 07, 2022"
                  className="focus:bg-bg w-[100%] h-[45px] border-[1px] border-[#E1E7EC] rounded-r-[6px] placeholder:text-[#B8C4CE]"
                />
              </div>
            </div>
            {/*  */}

            {/* Destination */}
            <div>
              <h1 className={style.label}>Destination</h1>
              <div className={style.inputWrap}>
                <div className={style.svgWrap}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2542 10.4699L9.88423 2.08789L11.8172 2.60589L14.6272 11.6409L19.8882 13.0509C20.0785 13.1018 20.2569 13.1898 20.4132 13.3097C20.5695 13.4296 20.7007 13.5791 20.7992 13.7497C20.8977 13.9202 20.9617 14.1085 20.9874 14.3038C21.0132 14.4991 21.0002 14.6976 20.9492 14.8879C20.8983 15.0782 20.8103 15.2566 20.6904 15.4129C20.5706 15.5692 20.4211 15.7003 20.2505 15.7988C20.0799 15.8974 19.8916 15.9613 19.6963 15.9871C19.501 16.0128 19.3025 15.9998 19.1122 15.9489L4.14023 11.9369L4.91623 9.03889L5.15823 9.10389L6.07223 12.4539L3.44523 11.7509C3.22996 11.693 3.04023 11.5648 2.90615 11.3867C2.77208 11.2086 2.70136 10.9908 2.70523 10.7679L2.79523 5.36489L4.24423 5.75289L5.15823 9.10389L10.2542 10.4699ZM4.00023 18.9999H20.0002V20.9999H4.00023V18.9999Z"
                      fill="#5F6B7A"
                    />
                  </svg>
                </div>
                <input className={style.input} type="text" />
              </div>
            </div>
            {/*  */}

            {/* Arrival Date */}
            <div>
              <h1 className={style.label}>Arrival Date</h1>
              <div className={style.inputWrap}>
                <div className={style.svgWrap}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z"
                      fill="#5F6B7A"
                    />
                    <path
                      d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.11 18.2998 9 18.3698 8.88 18.4198C8.76 18.4698 8.63 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C8 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 8 16.6298 8.12 16.5798C8.36 16.4798 8.64 16.4798 8.88 16.5798C9 16.6298 9.11 16.6998 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.42 14.3798C9.37 14.4998 9.3 14.6098 9.21 14.7098C9.11 14.7998 9 14.8698 8.88 14.9198C8.76 14.9698 8.63 14.9998 8.5 14.9998C8.37 14.9998 8.24 14.9698 8.12 14.9198C8 14.8698 7.89 14.7998 7.79 14.7098C7.7 14.6098 7.63 14.4998 7.58 14.3798C7.53 14.2598 7.5 14.1298 7.5 13.9998C7.5 13.8698 7.53 13.7398 7.58 13.6198C7.63 13.4998 7.7 13.3898 7.79 13.2898C7.89 13.1998 8 13.1298 8.12 13.0798C8.36 12.9798 8.64 12.9798 8.88 13.0798C9 13.1298 9.11 13.1998 9.21 13.2898C9.3 13.3898 9.37 13.4998 9.42 13.6198C9.47 13.7398 9.5 13.8698 9.5 13.9998C9.5 14.1298 9.47 14.2598 9.42 14.3798ZM12.71 14.7098C12.61 14.7998 12.5 14.8698 12.38 14.9198C12.26 14.9698 12.13 14.9998 12 14.9998C11.87 14.9998 11.74 14.9698 11.62 14.9198C11.5 14.8698 11.39 14.7998 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.39 13.1998 11.5 13.1298 11.62 13.0798C11.86 12.9698 12.14 12.9698 12.38 13.0798C12.5 13.1298 12.61 13.1998 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098Z"
                      fill="#5F6B7A"
                    />
                  </svg>
                </div>
                {/* <input className={style.input} type="text" /> */}
                <DatePicker
                  selected={departDate}
                  onChange={(date) => setDepartDate(date)}
                  selectsStart
                  dateFormat="MMM dd, yyyy"
                  // placeholderText="Feb 07, 2022"
                  className="focus:bg-bg w-[100%] h-[45px] border-[1px] border-[#E1E7EC] rounded-r-[6px] placeholder:text-[#B8C4CE]"
                />
              </div>
            </div>
            {/*  */}

            {/* Flex */}
            <div className="travel_class flex justify-between items-center space-x-[16px]">
              <div>
                <h1 className={style.label}>Travel Class</h1>
                <div className={style.inputWrap}>
                  <input className={style.flexedInput} type="text" />
                </div>
                <h2 className="add_another_class font-sans font-[500] text-[16px] text-[#0D7FE9] cursor-pointer">
                  + Add another class
                </h2>
              </div>
              <div>
                <h1 className={style.label}>Flight Fare</h1>
                <div className={`${style.inputWrap} w-[192px]`}>
                  <div className={style.svgWrap}>NGN</div>
                  <input className={style.flexedInput} type="text" />
                </div>
                <h3 className="Aeropaye_equiv font-serif font-[400] text-[14px] text-[#8895A7]">
                  ≈ 0.0000 Aeropaye
                </h3>
              </div>
            </div>
            {/*  */}
            {/* Create Button */}
            <div className="bg-[#060A33] py-[15px] px-[16px] text-center mt-[16px] text-white font-medium lead-[19px] shadow-sm rounded-[6px] cursor-pointer">
              Create Flight
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SearchFlight;
