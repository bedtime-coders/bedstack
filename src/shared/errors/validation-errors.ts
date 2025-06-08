import { BadRequestError } from '@/shared/errors';

/**
 * Error thrown when a required field is missing
 */
export class RequiredFieldError extends BadRequestError {
  constructor(fieldName: string) {
    super(`Field '${fieldName}' is required`);
  }
}

/**
 * Error thrown when a field has an invalid format
 */
export class InvalidFormatError extends BadRequestError {
  constructor(fieldName: string, format: string) {
    super(`Field '${fieldName}' has an invalid format. Expected: ${format}`);
  }
}

/**
 * Error thrown when a field has an invalid length
 */
export class InvalidLengthError extends BadRequestError {
  constructor(fieldName: string, min: number, max: number) {
    super(
      `Field '${fieldName}' has an invalid length. Expected between ${min} and ${max} characters`,
    );
  }
}

/**
 * Error thrown when a field has an invalid value
 */
export class InvalidValueError extends BadRequestError {
  constructor(fieldName: string, expected: string) {
    super(`Field '${fieldName}' has an invalid value. Expected: ${expected}`);
  }
}
