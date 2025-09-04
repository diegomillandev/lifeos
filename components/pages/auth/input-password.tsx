"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputPasswordProps {
  label: string;
  name: string;
  placeholder?: string;
  error?: boolean;
  value?: string;
  borderRed?: boolean;
  setValue: (value: string) => void;
}

export const InputPassword = ({ label, name, placeholder, error, borderRed , value, setValue,  }: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid gap-3">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required
          className={cn(borderRed && error && "border-red-500")}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};