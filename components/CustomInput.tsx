import React from 'react';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Control } from 'react-hook-form';

interface CustomInput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  type: string; // add a new prop for input type
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type,
}: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-1 flex-col gap-1.5">
          <FormLabel className="text-sm w-full max-w-[280px] font-medium text-gray-700">
            {label}
          </FormLabel>

          <div className="flex flex-col w-full">
            <FormControl>
              <Input
                placeholder={placeholder}
                type={type} // use the new type prop
                className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
