import { Sprout } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("LIFEOS_TOKEN")?.value;
  if (token) {
    redirect("/");
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <span className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Sprout className="w-[18px] h-[18px]" />
          </div>
          LifeOS.
        </span>
        {children}
      </div>
    </div>
  );
}
