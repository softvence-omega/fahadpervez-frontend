import CommonWrapper from "@/common/CommonWrapper"
import MentorNotificationSettings from "@/components/dashboard/mentorSettings/MentorNotificationSettings"
import SettingsTabs from "@/components/dashboard/mentorSettings/SettingsTabs"
import { useState } from "react"

const MentorSettings = () => {
  // ✅ Default should be "notification"
  const [activeTab, setActiveTab] = useState("notification")

  const renderTabContent = () => {
    switch (activeTab) {
      case "notification":
        return <MentorNotificationSettings />
      case "profile":
        return (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            Profile Settings content coming soon
          </div>
        )
      case "payment":
        return (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            Payment Settings content coming soon
          </div>
        )
      case "security":
        return (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            Login & Security Settings content coming soon
          </div>
        )
      case "privacy":
        return (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            Privacy Policy content coming soon
          </div>
        )
      case "terms":
        return (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            Terms & Condition content coming soon
          </div>
        )
      default:
        return null
    }
  }

  return (
    <CommonWrapper>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </div>
    </CommonWrapper>
  )
}

export default MentorSettings
