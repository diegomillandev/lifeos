import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dispatch } from "react";

interface ToggleRepeatProps {
  repeat?: string;
  setRepeat?: Dispatch<string>;
}

export function ToggleRepeat({ repeat, setRepeat }: ToggleRepeatProps) {
  return (
    <ToggleGroup
      variant="outline"
      type="single"
      value={repeat}
      onValueChange={setRepeat}
    >
      <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
      <ToggleGroupItem value="weekly">Week</ToggleGroupItem>
    </ToggleGroup>
  );
}
