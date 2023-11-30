import { generate } from "otp-generator";

export default function otp() {
  return generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
}
