import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import Paragraph from "@/common/header/Paragraph";
import React from "react";
import { FaCalendarAlt, FaCreditCard } from "react-icons/fa";

interface MentorPayoutProps {
  name: string;
  initials: string;
  specialty: string;
  memberSince: string;
  totalEarnings: number;
  sessions: number;
  pendingAmount: number;
  lastPayoutDate: string;
  payoutMethod: string;
}

const MentorPayoutCard: React.FC<MentorPayoutProps> = ({
  name,
  initials,
  specialty,
  memberSince,
  totalEarnings,
  sessions,
  pendingAmount,
  lastPayoutDate,
  payoutMethod,
}) => {
  const progressPercent = Math.min((pendingAmount / totalEarnings) * 100, 100);

  return (
    <div className="w-full border border-border rounded-xl p-4  bg-white space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
            {initials}
          </div>
          {/* Info */}
          <div>
            <CommonHeader className="!font-semibold  text-[#0A0A0A]">
              {name}
            </CommonHeader>
            <CommonHeader className="!text-[#717182] !font-normal">
              {specialty} • Member since {memberSince}
            </CommonHeader>
          </div>
        </div>

        {/* View Details */}
        <CommonButton className="!px-4 !py-2">View Details</CommonButton>
      </div>

      <div className="flex justify-between">
        <div>
          <p className="!text-[#717182] !font-normal">Total Earnings</p>
          <CommonHeader className="!font-semibold  text-[#0A0A0A]">
            ${totalEarnings.toFixed(2)}
          </CommonHeader>
        </div>
        <div>
          <CommonHeader className="!text-[#717182] !font-normal">
            Sessions
          </CommonHeader>
          <CommonHeader className="!font-semibold  text-[#0A0A0A]">
            {sessions}
          </CommonHeader>
        </div>
      </div>

      <div>
        <div className="flex justify-between pb-2">
          <CommonHeader className="!text-[#717182] !font-normal">
            Pending
          </CommonHeader>
          <CommonHeader className="text-right  !text-[#F54900] mt-1">
            ${pendingAmount.toFixed(2)}
          </CommonHeader>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-border pt-3">
        <div className="flex items-center space-x-6 text-gray-600 text-sm">
          <CommonHeader className="!text-[#717182] !font-normal flex items-center space-x-1">
            <FaCalendarAlt className="text-base" />
            <span>Last payout: {lastPayoutDate}</span>
          </CommonHeader>
          <CommonHeader className="!text-[#717182] !font-normal flex items-center space-x-1">
            <FaCreditCard className="text-base" />
            <span>{payoutMethod}</span>
          </CommonHeader>
        </div>

        <CommonButton className="!bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)] !text-white ">
          Process Pay-outs
        </CommonButton>
      </div>
    </div>
  );
};

export default MentorPayoutCard;
