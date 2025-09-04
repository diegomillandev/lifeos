import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dispatch } from "react";

interface ToggleDaysOfWeeksProps {
  daysOfWeek?: string[];
  setDaysOfWeek: Dispatch<string[]>;
}

export function ToggleDaysOfWeeks({ daysOfWeek, setDaysOfWeek }: ToggleDaysOfWeeksProps) {
  return (
    <ToggleGroup
      variant="outline"
      type="multiple"
      value={daysOfWeek}
      onValueChange={setDaysOfWeek}
    >
      <ToggleGroupItem value="mo">Mo</ToggleGroupItem>
      <ToggleGroupItem value="tu">Tu</ToggleGroupItem>
      <ToggleGroupItem value="we">We</ToggleGroupItem>
      <ToggleGroupItem value="th">Th</ToggleGroupItem>
      <ToggleGroupItem value="fr">Fr</ToggleGroupItem>
      <ToggleGroupItem value="sa">Sa</ToggleGroupItem>
      <ToggleGroupItem value="su">Su</ToggleGroupItem>
    </ToggleGroup>
  );
}
