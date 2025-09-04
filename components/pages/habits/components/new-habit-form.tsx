"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleRepeat } from "./toogle-repeat";
import { useCallback, useMemo, useState } from "react";
import { ToggleDaysOfWeeks } from "./toogle-days-of-week";
import { Frecuency } from "./frecuency";
import { SeletedArea } from "./select-area";
import { SeletedAreas } from "./seleted-areas";

const ALL_AREAS = ["apple", "banana", "blueberry", "grapes", "pineapple"];

export function NewHabitForm() {
  const [name, setName] = useState("");
  const [repeat, setRepeat] = useState("daily");
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [frecuency, setFrequency] = useState(1);
  const [areasSeleted, setAreasSeleted] = useState<string[]>([]);

  const handleChangeAreas = useCallback((newArea: string) => {
    const area = newArea.trim().toLowerCase();
    setAreasSeleted((prev) => (prev.includes(area) ? prev : [...prev, area]));
  }, []);

   const availableAreas = useMemo(
    () => ALL_AREAS.filter((a) => !areasSeleted.includes(a)),
    [areasSeleted]
  );
  
  const chageFrecuency = (value: number) => {
    if (value < 1 || value > 7) return;
    setFrequency(value);
  };

  const resetForm = () => {
    setName("");
    setRepeat("daily");
    setDaysOfWeek([]);
    setFrequency(1);
    setAreasSeleted([]);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // create form data
    const formData = {
      name: name.trim(),
      repeat,
      daysOfWeek: repeat === "daily" ? daysOfWeek : [],
      frecuency: repeat === "weekly" ? frecuency : null,
      areas: areasSeleted,
    }
    console.log(formData);
  };

  return (
    <Dialog
      onOpenChange={resetForm}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          New Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={onSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Add New Habit</DialogTitle>
          </DialogHeader>
          <div className="grid space-y-6">
            <div className="grid gap-3">
              <Label htmlFor="name" className="font-semibold">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Type name new habit..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />  
            </div>
            <div className="grid gap-3">
              <Label className="font-semibold">Repeat</Label>
              <div className="space-x-1">
                <ToggleRepeat repeat={repeat} setRepeat={setRepeat} />
              </div>
            </div>
            {repeat === "daily" ? (
              <div className="grid gap-3">
                <Label className="font-semibold">Those Dailys</Label>
                <ToggleDaysOfWeeks
                  daysOfWeek={daysOfWeek}
                  setDaysOfWeek={setDaysOfWeek}
                />
              </div>
            ) : (
              <div className="grid gap-3">
                <Frecuency
                  frecuency={frecuency}
                  chageFrecuency={chageFrecuency}
                />
              </div>
            )}
            <div className="grid gap-3">
              <Label htmlFor="name" className="font-semibold">Areas</Label>
              <SeletedAreas areas={areasSeleted} setAreasSeleted={setAreasSeleted} />
              <SeletedArea handleChangeAreas={handleChangeAreas} areasSelect={availableAreas}/>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Habit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
