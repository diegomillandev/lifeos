import { NewHabitForm } from "@/components/pages/habits/components/new-habit-form";

export default function HabitsPage() {

  return (
    <>
      <header className="space-y-2 flex items-cente justify-between">
        <div className="">
          <h1 className="text-4xl font-semibold">Habits</h1>
          <p className="text-sm">
            Track your habits and build a better you, one day at a time.
          </p>
        </div>
        <NewHabitForm />
      </header>
    </>
  );
}
