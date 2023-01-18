import { Box, Stack } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { useField } from "other..form lib";

type InputProps = {
  name: string;
  label: string;
  type?: string;
  value?: string;
  hideErrors?: boolean;
  "data-testid"?: string;
  form?: string;
};

export const Input = forwardRef(
  (
    {
      name,
      label,
      type = "text",
      value,
      hideErrors: noErrors,
      "data-testid": dataTestId,
      form
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const { getInputProps, error } = useField(name, {
      formId: form
    });
    const actualValue = value ?? (type === "checkbox" ? "on" : undefined);
    return (
      <Stack direction={["row"]}>
        <input
          data-testid={dataTestId}
          {...getInputProps({
            form,
            type,
            ref,
            id: name,
            value: actualValue
          })}
        />
        <label htmlFor={name}>{label}</label>
        {error && !noErrors && <Box style={{ color: "red" }}>{error}</Box>}
      </Stack>
    );
  }
);