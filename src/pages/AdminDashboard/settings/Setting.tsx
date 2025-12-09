import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import { Save, Upload } from "lucide-react";
import React, { useState } from "react";

interface BrandingData {
  platformName: string;
  tagline: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  supportEmail: string;
  websiteUrl: string;
}

const Setting: React.FC = () => {
  const [formData, setFormData] = useState<BrandingData>({
    platformName: "Zvural",
    tagline: "Your AI-Powered Medical Learning Platform",
    description:
      "Empowering medical students and professionals with AI-driven learning tools.",
    primaryColor: "#2563EB",
    accentColor: "#F97316",
    supportEmail: "support@medportal.com",
    websiteUrl: "https://medportal.com",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", formData);
    alert("Changes saved successfully!");
  };

  const handleResetToDefault = () => {
    setFormData({
      platformName: "Zvural",
      tagline: "Your AI-Powered Medical Learning Platform",
      description:
        "Empowering medical students and professionals with AI-driven learning tools.",
      primaryColor: "#2563EB",
      accentColor: "#F97316",
      supportEmail: "support@medportal.com",
      websiteUrl: "https://medportal.com",
    });
  };

  return (
    <div className="">
      <DashboardTopSection
        title=" White Label Settings"
        description="  Customize your platform branding and identity"
      />

      <CommonSpace className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Settings Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Platform Identity */}
              <div className="mb-8">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  Platform Identity
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      name="platformName"
                      value={formData.platformName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      name="tagline"
                      value={formData.tagline}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Branding Assets */}
              <div className="mb-8">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  Branding Assets
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Logo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG (max. 3MB)
                      </p>
                      <button className="mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Choose File
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Favicon
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG (max. 3MB)
                      </p>
                      <button className="mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colour Scheme */}
              <div className="mb-8">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  Colour Scheme
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleInputChange}
                        className="w-14 h-10 rounded cursor-pointer border border-gray-300"
                      />
                      <input
                        type="text"
                        value={formData.primaryColor}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            primaryColor: e.target.value,
                          }))
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accent Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        name="accentColor"
                        value={formData.accentColor}
                        onChange={handleInputChange}
                        className="w-14 h-10 rounded cursor-pointer border border-gray-300"
                      />
                      <input
                        type="text"
                        value={formData.accentColor}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            accentColor: e.target.value,
                          }))
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      name="supportEmail"
                      value={formData.supportEmail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSaveChanges}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleResetToDefault}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Preview
              </h2>

              <div className="border border-gray-200 rounded-lg p-6 space-y-6">
                {/* Logo and Platform Name */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {formData.platformName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {formData.platformName}
                    </h3>
                    <p className="text-xs text-gray-500">{formData.tagline}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {formData.description}
                </p>

                {/* Buttons Preview */}
                <div className="space-y-2">
                  <button
                    style={{ backgroundColor: formData.primaryColor }}
                    className="w-full py-2.5 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
                  >
                    Primary Button
                  </button>
                  <button
                    style={{
                      backgroundColor: formData.accentColor,
                      color: "white",
                    }}
                    className="w-full py-2.5 rounded-lg font-medium text-sm transition-opacity hover:opacity-90"
                  >
                    Accent Button
                  </button>
                </div>

                {/* Contact Info Preview */}
                <div className="pt-4 border-t border-gray-200 space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Support:</span>
                    <p className="text-gray-900 break-all">
                      {formData.supportEmail}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Website:</span>
                    <p className="text-gray-900 break-all">
                      {formData.websiteUrl}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CommonSpace>
    </div>
  );
};

export default Setting;
//  <SettingsTop />
//       <AdminNotificationSettings />
