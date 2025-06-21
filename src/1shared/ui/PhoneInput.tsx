import { ChangeEvent, useCallback } from "react";
import { Input } from "./Input";

const PHONE_REGEX_PATTERN = "\\+7 \\(\\d\\d\\d\\) \\d\\d\\d-\\d\\d-\\d\\d";

function formatPhone(newValue: string) {
  if (!newValue || newValue === "+") {
    return newValue;
  }

  const numbers = newValue.startsWith("+7")
    ? newValue.replace(/\D/g, "").slice(0, 11) // 7 + 10 цифр
    : "7" + newValue.replace(/\D/g, "").slice(0, 11);

  let result = "+7";

  if (numbers.length > 1) {
    const rest = numbers.slice(1);
    result += rest.length > 0 ? ` (${rest.slice(0, 3)}` : "";
    result += rest.length > 3 ? `) ${rest.slice(3, 6)}` : "";
    result += rest.length > 6 ? `-${rest.slice(6, 8)}` : "";
    result += rest.length > 8 ? `-${rest.slice(8, 10)}` : "";
  }

  return result;
}

interface PhoneInputProps {
  value: string;
  className?: string;
  isRequired?: boolean;
  handleChange: (value: string) => void;
}

export function PhoneInput(props: PhoneInputProps) {
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => props.handleChange(formatPhone(e.target.value)),
    [props]
  );

  return (
    <Input
      type="tel"
      name="phone"
      value={props.value}
      className={props.className}
      required={props.isRequired}
      onChange={handleInputChange}
      pattern={PHONE_REGEX_PATTERN}
      title="Введите номер телефона"
      placeholder="+7 (___) ___ __-__"
    />
  );
}
