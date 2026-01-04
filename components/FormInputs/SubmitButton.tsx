import { Button } from "@/components/ui/button";
import { Loader2, LucideIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  title: string;
  loadingTitle?: string;
  loading: boolean;
  className?: string;
  loaderIcon?: LucideIcon;
  showIcon?: boolean;
}

export default function SubmitButton({
  title,
  loadingTitle = "Loading...",
  loading,
  className,
  loaderIcon: LoaderIcon = Loader2,
  showIcon = false,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className={cn("w-full h-11 btn-primary-gradient rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20", className)}
    >
      {loading ? (
        <>
          <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          {loadingTitle}
        </>
      ) : (
        title
      )}
    </Button>
  );
}
