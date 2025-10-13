import { FC, useState } from "react";
import DashboardTopSection from "../reuseable/DashboardTopSection";
import CommonSelect from "@/common/custom/CommonSelect";
import MediumHeader from "@/common/header/MediumHeader";
import CommonSpace from "@/common/space/CommonSpace";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import CustomSwitch from "@/common/custom/CustomSwitch";
import CommonButton from "@/common/button/CommonButton";

interface EventFormProps {
  handleCancel: () => void;
}

const EventForm: FC<EventFormProps> = ({ handleCancel }) => {
  type EventFormData = {
    eventTitle: string;
    eventType: string;
    format: string;
    category: string;
    description: string;
    date: string;
    startTime: string;
    duration: string;
    instructor: string;
    isPricingEnabled: boolean;
    price?: string;
    meetingLink: string;
  };

  const [formData, setFormData] = useState<EventFormData>({
    eventTitle: "",
    eventType: "Seminar",
    format: "Seminar",
    category: "Seminar",
    description: "",
    date: "",
    startTime: "",
    duration: "60 Min",
    instructor: "",
    isPricingEnabled: false,
    price: "",
    meetingLink: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputClass = {
    input:
      "text-sm font-normal  text-[#0F172A]  font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
    label:
      "text-sm font-normal  text-[#18181B]  font-inter leading-[20px] block mb-2",
  };

  const seminarOptions = [
    { label: "Seminar", value: "Seminar" },
    { label: "Workshop", value: "Workshop" },
    { label: "Conference", value: "Conference" },
  ] as const;

  return (
    <div>
      <DashboardTopSection
        title="Create New Event"
        description="Create a new online event, seminar, or workshop with detailed scheduling and pricing options."
      />

      <CommonSpace>
        <CommonBorderWrapper className="!border-0 !rounded-none">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form Data:", formData);
            }}
            className="space-y-6"
          >
            <MediumHeader className=" !text-xl !font-normal ">
              Basic Information
            </MediumHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className={inputClass.label}>Event Title</label>
                <input
                  name="eventTitle"
                  placeholder="Event Title"
                  value={formData.eventTitle}
                  onChange={handleChange}
                  className={inputClass.input}
                />
              </div>

              <div>
                <label className={inputClass.label}>Event Type</label>
                <CommonSelect<string>
                  value={formData.eventType}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, eventType: val }))
                  }
                  item={seminarOptions}
                  className="w-full mb-4 !border-[#9DA4AE] !bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className={inputClass.label}>Format</label>
                <CommonSelect<string>
                  value={formData.format}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, format: val }))
                  }
                  item={seminarOptions}
                  className="w-full  !border-[#9DA4AE] !bg-white !outline-none"
                />
              </div>

              <div>
                <label className={inputClass.label}>Category</label>
                <CommonSelect<string>
                  value={formData.category}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, category: val }))
                  }
                  item={seminarOptions}
                  className="w-full  !border-[#9DA4AE] !bg-white"
                />
              </div>
            </div>

            <div>
              <label className={inputClass.label}>Description</label>
              <textarea
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                className={inputClass.input}
              />
            </div>

            <MediumHeader className="!text-xl !font-normal mb-3">
              Schedule & Duration
            </MediumHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className={inputClass.label}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={inputClass.input}
                />
              </div>
              <div>
                <label className={inputClass.label}>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={inputClass.input}
                />
              </div>
              <div>
                <label className={inputClass.label}>Duration</label>
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  className={inputClass.input}
                />
              </div>
            </div>

            <MediumHeader className="!text-xl !font-normal mb-3">
              Instructor
            </MediumHeader>

            <input
              name="instructor"
              placeholder="Instructor"
              value={formData.instructor}
              onChange={handleChange}
              className={inputClass.input}
            />

            <MediumHeader className="!text-xl !font-normal mb-3">
              Pricing
            </MediumHeader>

            <div className="flex items-center gap-2">
              <label htmlFor="" className={inputClass.label}>
                pricing
              </label>
              <CustomSwitch
                checked={formData.isPricingEnabled}
                onChange={(val: boolean) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPricingEnabled: val,
                  }))
                }
              />

              <input
                name="price"
                type="text"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                className={`${
                  formData.isPricingEnabled ? "invisible" : " visible"
                } ${inputClass.input}`}
              />
            </div>

            <MediumHeader className="!text-xl !font-normal mb-3">
              Meeting Details
            </MediumHeader>

            <div>
              <label className={inputClass.label}>
                Meeting Link (Zoom, Teams, etc.)
              </label>
              <input
                name="meetingLink"
                placeholder="Meeting Link (Zoom, Teams, etc.)"
                value={formData.meetingLink}
                onChange={handleChange}
                className={inputClass.input}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pb-5 sm:pb-0">
              <CommonButton
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </CommonButton>
              <CommonButton
                type="submit"
                className="w-full sm:w-auto !text-white !bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)]"
              >
                Create and Publish
              </CommonButton>
            </div>
          </form>
        </CommonBorderWrapper>
      </CommonSpace>
    </div>
  );
};

export default EventForm;
