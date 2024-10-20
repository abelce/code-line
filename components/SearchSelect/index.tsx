"use client";

import React, { ReactNode } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  label: string;
  value: string | number;
}
interface Props<T> {
  btnClassName?: string;
  text: ReactNode;
  value?: T;
  onChange: (value: T) => void;
  options: Option[];
  optionRender?: (item: Option) => ReactNode;
}

export function SearchSelect<T>(props: Props<T>) {
  const { text, value, onChange, options = [], btnClassName } = props;
  const [open, setOpen] = React.useState(false);

  const optionRender = (option?: Option) => {
    if (!option) {
      return text;
    }
    if (typeof props.optionRender === "function") {
      return props.optionRender(option);
    }
    return option.label;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("!inline-flex !justify-between", btnClassName)}
        >
          <span className="line-clamp-1 flex items-center">
            {value
              ? optionRender(options.find((option) => option.value === value))
              : text}
          </span>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search data..." className="h-9" />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={String(option.value)}
                  onSelect={(currentValue) => {
                    onChange((currentValue === value ? "" : currentValue) as T);
                    setOpen(false);
                  }}
                >
                  {optionRender(option)}

                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
