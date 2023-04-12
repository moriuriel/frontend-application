import {
  FormControl,
  FormErrorMessage, NumberInput as ChakraNumberInput, NumberInputProps as ChakraNumberInputProps
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface NumberInputProps extends ChakraNumberInputProps {
  name: string
  label?: string
  error?: FieldError
}

const NumberInputBase: ForwardRefRenderFunction<HTMLInputElement, NumberInputProps> = (
  { name, label, error = null, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraNumberInput
        name={name}
        id={name}
        placeholder={label}
        variant="outline"
        borderColor="gray.700"
        focusBorderColor="gray.500"
        _hover={{
          bgColor: 'gray.50',
        }}
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const NumberInput = forwardRef(NumberInputBase)
