import { useAppSelector } from "@/store";
import { Port } from "@/types";
import PortCard from "./PortCard";

export default function FeaturedPrivatePorts() {
  const { ports, loading } = useAppSelector((state) => state.ports);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="spinner"></div>
      </div>
    );
  }

  // Show first 3 private ports as featured
  const featuredPrivatePorts = ports
    .filter((port) => port.portType === "private_port")
    .slice(0, 3);

  if (featuredPrivatePorts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          No featured private ports available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredPrivatePorts.map((port) => (
        <PortCard key={port.id} port={port} />
      ))}
    </div>
  );
}
