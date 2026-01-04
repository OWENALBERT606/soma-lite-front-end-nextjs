import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

interface PasswordInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  icon?: LucideIcon | React.ElementType;
  forgotPasswordLink?: string;
  type?: string;
  className?: string;
}

export default function PasswordInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  placeholder,
  icon: Icon,
  forgotPasswordLink,
  className,
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="text-sm font-semibold text-slate-700">
          {label}
        </Label>
        {forgotPasswordLink && (
          <Link
            href={forgotPasswordLink}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        )}
      </div>
      <div className="relative group">
        <Input
          {...register(name, { required: true })}
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={cn(
            "pl-10 pr-10 h-11 bg-slate-50/50 border-slate-200 transition-all duration-200",
            "focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10",
            errors[name] && "border-red-500 focus:ring-red-500/10 focus:border-red-500"
          )}
        />
        {Icon && (
          <div className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
            "text-slate-400 group-focus-within:text-emerald-500",
            errors[name] && "text-red-400 group-focus-within:text-red-500"
          )}>
            <Icon className="h-5 w-5" strokeWidth={2} />
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
            "text-slate-400 hover:text-slate-600",
            showPassword && "text-emerald-500"
          )}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" strokeWidth={2.5} />
          ) : (
            <Eye className="h-4 w-4" strokeWidth={2.5} />
          )}
        </button>
      </div>
      {errors[name] && (
        <span className="text-[11px] font-medium text-red-500 ml-1">
          {String(errors[name]?.message || "Password is required")}
        </span>
      )}
    </div>
  );
}
