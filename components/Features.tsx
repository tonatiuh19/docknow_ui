import { Search, MapPin, CreditCard, Shield, Clock, Users } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-ocean-600" />,
      title: "Search & Book",
      description:
        "Quick search worldwide with no confirmation fees. Find the perfect marina with advanced search and filtering.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-ocean-600" />,
      title: "Easy Booking",
      description:
        "Create vessel data, vessel information, with quick and easy booking. Complete transactions in just a few clicks.",
    },
    {
      icon: <Shield className="w-8 h-8 text-ocean-600" />,
      title: "Global Coverage",
      description:
        "Easily book worldwide and find secure marina spaces in hundreds of destinations around the world.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Dock Now?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to book the perfect marina space worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
