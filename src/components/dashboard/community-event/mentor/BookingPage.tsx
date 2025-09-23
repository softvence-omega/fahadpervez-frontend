/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/ConfirmBooking.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BreadcrumbItem } from "../../gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BsInfoLg } from "react-icons/bs";
// import { Calendar } from "@/components/ui/calendar";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Community & Event", link: "/dashboard/community-event" },
  { name: "All Communities", link: "/dashboard/all-communities" },
];

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //   const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  // Get props from route state or URL parameters
  const bookingProps = location.state || {
    price:
      parseInt(new URLSearchParams(location.search).get("price") ?? "") || 25,
    duration:
      parseInt(new URLSearchParams(location.search).get("duration") ?? "") ||
      30,
    sessions:
      parseInt(new URLSearchParams(location.search).get("sessions") ?? "") || 1,
    mentorName:
      new URLSearchParams(location.search).get("mentor") ?? "Mouhammad",
    specialty:
      new URLSearchParams(location.search).get("specialty") ??
      "Medical Consultant - Preventive & Clinical Care",
  };

  const availableDates = [
    { date: "Aug 22", day: "FR", spots: 2 },
    { date: "Aug 24", day: "SUN", spots: 3 },
    { date: "Aug 25", day: "MON", spots: 4 },
    { date: "Aug 27", day: "WED", spots: 2 },
    { date: "Aug 31", day: "SUN", spots: 3 },
    { date: "Sep 1", day: "MON", spots: 4 },
    { date: "Sep 3", day: "WED", spots: 2 },
    { date: "Sep 5", day: "FRI", spots: 2 },
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Booking data:", { ...formData, ...bookingProps });
    // Redirect to checkout or process payment
    navigate("/checkout", { state: { ...formData, ...bookingProps } });
  };

  const total = bookingProps.price * bookingProps.sessions;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="bg-white p-7">
        <h1 className="text-2xl font-semibold text-[#111827] mb-8">
          Confirm booking
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Information and Availability */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="">
                <CardHeader>
                  <CardTitle className="text-xl text-[#111827] font-semibold mb-4">
                    Contact information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-sm text-[#111827] font-medium"
                      >
                        First name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-sm text-[#111827] font-medium"
                      >
                        Last name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm text-[#111827] font-medium"
                    >
                      Email address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm text-[#111827] font-medium"
                    >
                      Message for {bookingProps.mentorName} (optional)
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Add any special requests or notes..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </div>

              {/* Availability Preview */}
              <div>
                <CardHeader>
                  <CardTitle className="text-xl text-[#111827] font-semibold mb-3">
                    Availability
                  </CardTitle>
                  <div className="flex items-center gap-3 bg-[#EBF5FF] py-4 pl-4 rounded-[6px] mb-7">
                    <div className="bg-[#76A9FA] p-1 rounded-full">
                      <BsInfoLg className="text-white" />
                    </div>
                    <p className="max-w-[500px] text-sm text-[#224F9C]">
                      This is just a preview of the mentor's availability.
                      You'll be able to reserve a spot after you confirm
                      booking.
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Date Preview */}
                  <div className="mb-6">
                    <h3 className="text-sm text-[#111827] font-bold mb-3">
                      Date Preview
                    </h3>
                    <p className="text-sm text-[#4A4A4A] mb-4">
                      15 available days in the next 30 days.
                    </p>

                    <div className="overflow-x-auto">
                      <div className="grid grid-cols-8 gap-2 min-w-max">
                        {availableDates.map((slot, index) => (
                          <div key={index} className="text-center">
                            <div className="text-xs font-medium text-gray-500">
                              {slot.day}
                            </div>
                            <div className="text-sm font-semibold">
                              {slot.date}
                            </div>
                            <div className="text-xs text-green-600">
                              {slot.spots} spots
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Available Times */}
                  <div>
                    <h3 className="text-sm text-[#111827] font-bold mb-3">Available Times</h3>
                    <p className="text-sm text-[#4A4A4A] mb-4">
                      In your local time (Asia/Ohaka).
                    </p>

                    {/* Time slots would go here */}
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Time selection will be available after booking
                        confirmation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {bookingProps.specialty}
                    </h4>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per Session</span>
                      <span className="font-semibold">
                        ${bookingProps.price}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold">
                        {bookingProps.duration} minutes
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of Sessions</span>
                      <span className="font-semibold">
                        {bookingProps.sessions}
                      </span>
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Go To Checkout
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By clicking "Go to checkout", you agree to our Terms of
                    Service and Cancellation Policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
