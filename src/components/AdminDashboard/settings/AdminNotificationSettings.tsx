import CustomSwitch from "@/common/custom/CustomSwitch";
import CommonHeader from "@/common/header/CommonHeader";
import Paragraph from "@/common/header/Paragraph";
import CommonSpace from "@/common/space/CommonSpace";
import React, { useState } from "react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const AdminNotificationSettings: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSetting[]
  >([
    {
      id: "achievement-alert",
      title: "Achievement Alert",
      description: "Celebrate milestones and achievements",
      enabled: true,
    },
    {
      id: "community-notifications",
      title: "Community Notifications",
      description: "Stay updated on community discussions and activities",
      enabled: true,
    },
    {
      id: "event-reminders",
      title: "Event Reminders",
      description: "Upcoming medical events and webinars",
      enabled: true,
    },
    {
      id: "forum-replies",
      title: "Forum Replies",
      description: "When someone replies to your posts",
      enabled: true,
    },
    {
      id: "general-notification",
      title: "General Notification",
      description: "",
      enabled: true,
    },
  ]);

  const [generalNotification, setGeneralNotification] = useState<
    NotificationSetting[]
  >([
    {
      id: "email-notification",
      title: "Email Notification",
      description: "Receive notifications via email",
      enabled: true,
    },
    {
      id: "push-notifications",
      title: "Push Notifications",
      description: "Receive notifications even when the app is closed",
      enabled: true,
    },
  ]);

  // Determine if all notifications are enabled
  const allEnabled =
    notificationSettings.every((s) => s.enabled) &&
    generalNotification.every((s) => s.enabled);

  const toggleAllNotifications = () => {
    const newState = !allEnabled;
    setNotificationSettings((prev) =>
      prev.map((s) => ({ ...s, enabled: newState }))
    );
    setGeneralNotification((prev) =>
      prev.map((s) => ({ ...s, enabled: newState }))
    );
  };

  const toggleNotification = (id: string) => {
    setNotificationSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const toggleGeneralNotification = (id: string) => {
    setGeneralNotification((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <CommonSpace className=" space-y-6">
      <div className="bg-white p-4 border border-border ">
        <CommonHeader className="mb-4">Notification</CommonHeader>

        <div className=" flex items-center gap-2 pb-10">
          <CustomSwitch
            checked={allEnabled}
            onChange={toggleAllNotifications}
          />
          <Paragraph className="">All Notification</Paragraph>
        </div>

        <div className=" space-y-5">
          {notificationSettings.map((setting) => (
            <div key={setting.id}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CommonHeader>{setting.title}</CommonHeader>
                  {setting.description && (
                    <Paragraph className="!mt-1 text-[#334155]">
                      {setting.description}
                    </Paragraph>
                  )}
                </div>
                <CustomSwitch
                  checked={setting.enabled}
                  onChange={() => toggleNotification(setting.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 border border-border ">
        <div className=" space-y-5">
          {generalNotification.map((setting) => (
            <div key={setting.id}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CommonHeader>{setting.title}</CommonHeader>
                  {setting.description && (
                    <Paragraph className="!mt-1 text-[#334155]">
                      {setting.description}
                    </Paragraph>
                  )}
                </div>
                <CustomSwitch
                  checked={setting.enabled}
                  onChange={() => toggleGeneralNotification(setting.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CommonSpace>
  );
};

export default AdminNotificationSettings;
