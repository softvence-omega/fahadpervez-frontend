import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  AlertCircle,
  TicketPercent,
  MessageSquare,
} from "lucide-react";

export default function Overview() {
  const cards = [
    {
      icon: MessageSquare,
      title: "FAQs",
      subtitle: "Self-Service",
      description:
        "Browse our comprehensive FAQ section to find quick answers to common questions about using our platform.",
      count: "20 FAQs",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: TicketPercent,
      title: "Tickets",
      subtitle: "Ticketing System",
      description:
        "Create and track support tickets. Our team typically responds within 24 hours.",
      count: "1 Sent",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Phone,
      title: "Contact Us",
      subtitle: "Direct Contact",
      description:
        "Get in touch with our support team via phone, email, or visit our office.",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const quickLinks = [
    { icon: AlertCircle, label: "Getting Started Guide", href: "#" },
    { icon: AlertCircle, label: "Privacy Policy", href: "#" },
    { icon: AlertCircle, label: "Video Tutorial", href: "#" },
    { icon: AlertCircle, label: "Terms of Service", href: "#" },
  ];

  return (
    <div className="space-y-8">
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-between rounded-lg p-6 border border-border`}
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-4`}
                >
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {card.subtitle}
                  </p>
                </div>
              </div>
              <p className="max-w-[270px] text-[#717182] text-sm mb-4">
                {card.description}
              </p>
            </div>
            <div>
              {card.count && (
                <div
                  className={`${
                    (card.color, card.iconColor)
                  } text-center  inline-block px-3 py-1 rounded font-medium border border-blue-200`}
                >
                  {card.count}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-sm font-normal text-foreground mb-6">
          Quick Links
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Commonly accessed resources
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition group"
            >
              <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition">
                {link.label}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition" />
            </a>
          ))}
        </div>
      </div>

      {/* Support Hours */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Support Hours
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-sm font-medium text-foreground">
              Monday - Friday:
            </span>
            <span className="text-sm text-muted-foreground">
              9:00 AM - 6:00 PM EST
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-sm font-medium text-foreground">
              Saturday:
            </span>
            <span className="text-sm text-muted-foreground">
              10:00 AM - 4:00 PM EST
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">Sunday:</span>
            <span className="text-sm text-muted-foreground">Closed</span>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Email support is available 24/7. We typically respond within 24
            hours.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-6 pt-6 border-t border-border space-y-3">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <a
              href="tel:+15551234567"
              className="text-sm text-foreground hover:text-primary transition"
            >
              +1 (555) 123-4567
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <a
              href="mailto:support@medicalm.com"
              className="text-sm text-foreground hover:text-primary transition"
            >
              support@medicalm.com
            </a>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <span className="text-sm text-foreground">
              123 Medical Plaza, Suite 400, San Francisco, CA 94102
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
