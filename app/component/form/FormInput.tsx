import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { useField } from "remix-validated-form";

type FormInputProps = {
  name: string;
  label: string;
  isRequired?: boolean;
};

export const FormInput = ({
                            name,
                            label,
                            isRequired,
                            ...rest
                          }: FormInputProps & InputProps) => {
  const { getInputProps, error } = useField(name);

  return (
    <>
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <Input
          {...getInputProps({
            id: name,
            ...rest
          })}
        />

        {label && (
          <>
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </>
        )}

      </FormControl>
    </>
  );
};
