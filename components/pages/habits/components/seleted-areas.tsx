import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Dispatch } from "react";

interface SeletedAreasProps {
  areas: string[];
  setAreasSeleted: Dispatch<string[]>;
}

export const SeletedAreas = ({ areas, setAreasSeleted }: SeletedAreasProps) => {

    const handleDelete = (areaToDelete: string) => {
      const updatedAreas = areas.filter((area) => area !== areaToDelete);
      setAreasSeleted(updatedAreas);
    }

  if (areas.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {areas.map((area) => (
        <Badge key={area} variant="secondary" className="capitalize">
          {area}
          <button onClick={() => handleDelete(area)} className="ml-1 inline-flex items-center justify-center rounded-full p-1 hover:bg-muted">
            <X size={12}/>
          </button>
        </Badge>
      ))}
    </div>
  );
};
