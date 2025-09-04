import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";

interface FrecuencyProps {
  frecuency: number;
  chageFrecuency: (value: number) => void;
}

export const Frecuency = ({ frecuency, chageFrecuency }: FrecuencyProps) => {
  return (
    <div className="flex items-center gap-x-4">
      <div className="">
        <Label className="font-semibold">Frecuency</Label>
        <span className="text-sm text-muted-foreground">
          {`${frecuency} time${frecuency > 1 ? "s" : ""} per week`}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          type={"button"}
          size={"sm"}
          onClick={() => chageFrecuency(frecuency - 1)}
          disabled={frecuency <= 1}
        >
          <Minus />
        </Button>
        <div className="border py-1 px-3">{frecuency}</div>
        <Button
          type={"button"}
          size={"sm"}
          onClick={() => chageFrecuency(frecuency + 1)}
          disabled={frecuency >= 7}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};
