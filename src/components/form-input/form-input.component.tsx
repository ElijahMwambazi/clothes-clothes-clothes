import {
  FC,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";

import {
  Group,
  Input,
  FontInputLabel,
} from "./form-input.styles";

export type TInputOptions = {
  required?: boolean;
  type?: string;
  pattern?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  name?: string;
  value?: string;
};

export type TFormInputProps = {
  label: string;
  inputOptions: TInputOptions;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<TFormInputProps> = ({
  label,
  inputOptions,
}) => {
  return (
    <Group>
      <Input {...inputOptions} />
      <FontInputLabel
        shrink={Boolean(
          inputOptions.value &&
            typeof inputOptions.value ===
              "string" &&
            inputOptions.value.length
        )}
      >
        {label}
      </FontInputLabel>
    </Group>
  );
};

export default FormInput;
