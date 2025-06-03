import React from "react";
import { Controller } from "react-hook-form";

const FormField = ({
  control,
  error,
  className,
  name,
  type,
  placeholder,
}) => {
  return (
    <div className={`${className} w-full h-14`}>
      <div className="relative w-full h-12">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className="p-2 rounded border-slate-200 placeholder:text-sm placeholder:text-gray-400 outline-1 outline-slate-200 mt-7 w-full"
            />
          )}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-6">{error.message}</p>}
    </div>
  );
};

export default FormField;
