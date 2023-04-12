import {
  FormControl,
  FormErrorMessage,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraSelect
      
        name={name}
        id={name}
        placeholder={label}
        variant="outline"
        borderColor="gray.700"
        focusBorderColor="gray.500"
        _hover={{
          bgColor: "gray.50"
        }}
        size="lg"
        ref={ref}
        {...rest}
      >
 
      </ChakraSelect>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = () => forwardRef(SelectBase);
