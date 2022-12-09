import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { useField } from "remix-validated-form";

export type TextareaProps = {
  name: string;
  label: string;
  value?: string;
  "data-testid"?: string;
};

export const Textarea: FC<TextareaProps> = ({
                                              name,
                                              label,
                                              "data-testid": dataTestId
                                            }) => {
  const { error, getInputProps } = useField(name);
  return (

    <Box border={"2px"} width={"100%"}>
      <label htmlFor={name}>{label}</label>
      <textarea
        {...getInputProps({ id: name })}
        data-testid={dataTestId}
      ></textarea>
      {error && <p>{error}</p>}
    </Box>
  );
};
