"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-white rounded-2xl shadow-sm font-sans", className)}
      captionLayout="dropdown"
      fromYear={1900}
      toYear={new Date().getFullYear() + 10}
      classNames={{
        months: "flex flex-col space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center px-8",
        caption_label: "hidden",
        caption_dropdowns: "flex justify-center gap-1.5",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 border-gray-200 rounded-lg"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex mb-2",
        head_cell: "text-gray-400 rounded-md w-9 font-bold text-[11px] uppercase tracking-wider text-center",
        row: "flex w-full mt-1",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-semibold aria-selected:opacity-100 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white shadow-md shadow-blue-100",
        day_today: "bg-gray-100 text-gray-900 border border-gray-200",
        day_outside:
          "day-outside text-gray-300 opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        vhidden: "hidden",
        dropdown: "text-[12px] font-bold bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none hover:border-blue-300 transition-colors cursor-pointer appearance-none",
        dropdown_month: "min-w-[80px]",
        dropdown_year: "min-w-[60px]",
        dropdown_icon: "hidden",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
