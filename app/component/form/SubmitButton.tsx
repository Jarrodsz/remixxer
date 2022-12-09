import { Button } from "@saas-ui/react";
import { useIsSubmitting, useIsValid } from "remix-validated-form";

type Props = {
  label?: string;
  size?: string;
  colorScheme?: string;
  submittingLabel?: string;
  disableWhenInvalid?: boolean;
  form?: string;
  name?: string;
  value?: string;
  "data-testid"?: string;
  formMethod?: string;
};

export const SubmitButton = ({
                               label = "Submit",
                               submittingLabel = "Submitting...",
                               disableWhenInvalid,
                               form,
                               name,
                               size,
                               colorScheme,
                               value,
                               "data-testid": dataTestid,
                               formMethod
                             }: Props) => {
  const isSubmitting = useIsSubmitting(form);
  const isValid = useIsValid(form);
  return (
    <Button
      type="submit"
      disabled={disableWhenInvalid ? isSubmitting || !isValid : isSubmitting}
      name={name}
      size={size}
      colorScheme={colorScheme}
      value={value}
      form={form}
      data-testid={dataTestid}
      formMethod={formMethod}
    >
      {isSubmitting ? submittingLabel : label}
    </Button>
  );
};
