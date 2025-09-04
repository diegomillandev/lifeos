import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface SeletedAreaProps {
  handleChangeAreas: (newArea: string) => void;
  areasSelect: string[];
}

export const SeletedArea = ({
  handleChangeAreas,
  areasSelect,
}: SeletedAreaProps) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (newValue: string) => {
    handleChangeAreas(newValue);
    setValue('');
  };

  return (
    <Select value={value ?? undefined} onValueChange={handleChange}>
      <SelectTrigger className="w-full" disabled={areasSelect.length === 0}>
        <SelectValue placeholder="Select area" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {areasSelect.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
