import { Port } from "@/types";
import PortCard from "../PortCard";

interface PortsListProps {
  ports: Port[];
}

export default function PortsList({ ports }: PortsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {ports.map((port) => (
        <PortCard key={port.id} port={port} />
      ))}
    </div>
  );
}
