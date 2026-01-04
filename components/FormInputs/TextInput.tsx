import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon | React.ElementType; // Accept LucideIcon or other icon types
  isRequired?: boolean;
  className?: string;
}

export default function TextInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = "text",
  placeholder,
  icon: Icon,
  isRequired = true,
  className,
}: TextInputProps<T>) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={name} className="text-sm font-semibold text-slate-700">
        {label}
      </Label>
      <div className="relative group">
        <Input
          {...register(name, { required: isRequired })}
          id={name}
          type={type}
          placeholder={placeholder}
          className={cn(
            "pl-10 h-11 bg-slate-50/50 border-slate-200 transition-all duration-200",
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
      </div>
      {errors[name] && (
        <span className="text-[11px] font-medium text-red-500 ml-1">
          {String(errors[name]?.message || `${label} is required`)}
        </span>
      )}
    </div>
  );
}
