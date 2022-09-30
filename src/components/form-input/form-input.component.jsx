import { Group, Input, FontInputLabel } from "./form-input.styles";

const FormInput = ({ label, inputOptions }) => {
  return (
    <Group>
      <Input {...inputOptions} />
      <FontInputLabel shrink={inputOptions.value.length}>
        {label}
      </FontInputLabel>
    </Group>
  );
};

export default FormInput;
