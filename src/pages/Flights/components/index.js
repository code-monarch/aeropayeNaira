import React from 'react'
import LoadingSkeleton from "./LoadingSkeleton";
import HistorySkeleton from "./HistorySkeleton";
import { ReactComponent as Warning } from "../../../assets/dashboard-icons/Icon_Warning.svg";
import { ReactComponent as Aero } from "../../../assets/dashboard-icons/aerologo.svg";
import { ReactComponent as AirArik } from "../../../assets/dashboard-icons/Airlines.svg";
import { ReactComponent as AirIbom } from "../../../assets/dashboard-icons/Airlines-3.svg";
import { ReactComponent as AirPeace } from "../../../assets/dashboard-icons/Airlines-2.svg";
import { ReactComponent as Dana } from "../../../assets/dashboard-icons/danaLogo.svg";
import { ReactComponent as Line } from "../../../assets/dashboard-icons/Line.svg";
import { ReactComponent as MobileLine } from "../../../assets/dashboard-icons/mobile-line.svg";
import { ReactComponent as Arr } from "../../../assets/dashboard-icons/Arr2.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import { ReactComponent as Plane } from "../../../assets/dashboard-icons/flight-plane.svg";
import { ReactComponent as Calendar } from "../../../assets/dashboard-icons/calendar-2.svg";
import { ReactComponent as CalendarWhite } from "../../../assets/dashboard-icons/calendar-white.svg";
import { ReactComponent as Profile } from "../../../assets/dashboard-icons/profile.svg";
import { ReactComponent as Arrival } from "../../../assets/dashboard-icons/arrival-icon.svg";
import { ReactComponent as Show } from "../../../assets/icons/showIcon.svg";
import { ReactComponent as Departure } from "../../../assets/dashboard-icons/departure-icon.svg";
import { ReactComponent as ArrRight } from "../../../assets/dashboard-icons/ArrRight.svg";
import { ReactComponent as BusinessClass } from "../../../assets/flightClass/business.svg";
import { ReactComponent as EcoClass } from "../../../assets/flightClass/economy.svg";
import { ReactComponent as PremiumEcoClass } from "../../../assets/flightClass/premiumEco.svg";
import { ReactComponent as FirstClass } from "../../../assets/flightClass/first.svg";

export const Skeleton = () => <LoadingSkeleton />;
export const FlightHistorySkeleton = () => <HistorySkeleton />;
export const WarningIcon = () => <Warning />;
export const AeroLogo = () => <Aero />;
export const AirArikLogo = () => <AirArik />;
export const AirIbomLogo = () => <AirIbom />;
export const AirPeaceLogo = () => <AirPeace />;
export const DanaLogo = () => <Dana />;
export const LineIcon = () => <Line />;
export const MobileLineIcon = () => <MobileLine />;
export const ArrIcon = () => <Arr />;
export const ArrowLeftIcon = () => <ArrowLeft />;
export const PlaneIcon = () => (
  <Plane className="w-[15px] h-[13px]sm:w-[17px] sm:h-[15px] md:w-[19px] md:h-[17px]" />
);
export const CalendarIcon = () => (
  <Calendar className="w-[15px] h-[13px] sm:w-[17px] sm:h-[15px] md:w-[19px] md:h-[17px]" />
);
export const WhiteCalenderIcon = () => (
  <CalendarWhite className="w-[15px] h-[13px] sm:w-[17px] sm:h-[15px] md:w-[19px] md:h-[17px]" />
);
export const ProfileIcon = () => <Profile />;
export const ArrivalIcon = () => <Arrival />;
export const ShowIcon = () => <Show className="!h-[12.75px] !w-[15px]" />;
export const DepartureIcon = () => (
  <Departure className="w-[15px] sm:w-[17px] sm:h-[15px] md:w-[19px] md:h-[17px]" />
);
export const ArrRightIcon = () => <ArrRight />;
export const BusinessClassIcon = () => <BusinessClass />;
export const EcoClassIcon = () => <EcoClass />;
export const PremiumEcoClassIcon = () => <PremiumEcoClass />;
export const FirstClassIcon = () => <FirstClass />;


const index = () => {
  return (
    <div>index</div>
  )
}

export default index