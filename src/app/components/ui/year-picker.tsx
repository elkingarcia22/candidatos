"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "./utils";

interface YearPickerProps {
  value?: string | number;
  onChange?: (year: string) => void;
  placeholder?: string;
  className?: string;
  startYear?: number;
  endYear?: number;
  error?: boolean;
}

export function YearPicker({
  value,
  onChange,
  placeholder = "Año",
  className,
  startYear = 1950,
  endYear = new Date().getFullYear() + 10,
  error = false,
}: YearPickerProps) {
  const years = React.useMemo(() => {
    const list = [];
    for (let i = endYear; i >= startYear; i--) {
      list.push(i.toString());
    }
    return list;
  }, [startYear, endYear]);

  return (
    <Select value={value?.toString()} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "w-full",
          error && "border-red-500 bg-red-50 focus:ring-red-200",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
