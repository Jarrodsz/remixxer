import { IconButton, InputGroup, InputProps, InputRightElement, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FormInput } from "~/components/core/form2/FormInput";


export const PasswordField = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {

  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <InputGroup size="lg">
      <FormInput
        name={"password"}
        label={""}
        id="password"
        pr="4.5rem"
        type={isOpen ? "text" : "password"}
        placeholder={"Password"}
        borderTopRadius={"0"}
      />
      <InputRightElement>
        <IconButton
          size={"lg"}
          variant="link"
          aria-label={isOpen ? "Mask password" : "Reveal password"}
          icon={isOpen ? <HiEyeOff /> : <HiEye />}
          onClick={onClickReveal}
        />
      </InputRightElement>
    </InputGroup>
  );
});

PasswordField.displayName = "PasswordField";