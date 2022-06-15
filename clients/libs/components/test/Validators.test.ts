import { Validators } from "../src";

describe("it", () => {
  const { required, min, max, isEmail, composeValidators } = Validators;

  it("required", () => {
    const message = "Required";

    expect(required(message)("")).toBe(message);
    expect(required(message)("asdasdasd")).toBe(undefined);
  });

  it("min", () => {
    const message = "Min 6";

    expect(min(6, message)("12345")).toBe(message);
    expect(min(6, message)("123456")).toBe(undefined);
    expect(min(6, message)("1234567")).toBe(undefined);
  });

  it("max", () => {
    const message = "Max 8";

    expect(max(8, message)("123456789")).toBe(message);
    expect(max(8, message)("12345678")).toBe(undefined);
    expect(max(8, message)("")).toBe(undefined);
  });

  it("isEmail", () => {
    const message = "Invalid email";

    expect(isEmail(message)("teste@test")).toBe(message);
    expect(isEmail(message)("teste@test.c")).toBe(message);
    expect(isEmail(message)("teste@test.")).toBe(message);
    expect(isEmail(message)("teste")).toBe(message);
    expect(isEmail(message)("teste@test.com")).toBe(undefined);
  });

  it("composeValidators", () => {
    const messageRequired = "required";
    const messageInvalidEmal = "invalid email";

    const validator = composeValidators(
      required(messageRequired),
      isEmail(messageInvalidEmal)
    );
    expect(validator("")).toBe(messageRequired);
    expect(validator("test")).toBe(messageInvalidEmal);
    expect(validator("test@test.com")).toBe(undefined);
  });
});
