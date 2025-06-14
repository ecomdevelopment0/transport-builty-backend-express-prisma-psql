import { ErrorConstants } from "../constants/error.constant";

export function handlePrismaError(error: any): { code: number; message: string } {
  switch (error.code) {
    case ErrorConstants.ERROR_CODE_DUPLICATE_ENTRY:
      return {
        code: ErrorConstants.DUPLICATE_ERROR_CODE,
        message:
          `${ErrorConstants.DUPLICATE_ENTRY_MESSAGE}${error.meta?.target}` || ErrorConstants?.DUPLICATE_ERROR_MESSAGE,
      };
    case ErrorConstants.ERROR_CODE_FOREIGN_KEY_CONSTRAINT:
      return {
        code: ErrorConstants.INTERNAL_SERVER_ERROR,
        message: `${ErrorConstants.FOREIGN_KEY_CONSTRAINT_MESSAGE}${error.meta?.field}`,
      };
    case ErrorConstants.ERROR_CODE_RECORD_NOT_FOUND:
      return {
        code: ErrorConstants.NOT_FOUND,
        message: ErrorConstants.RECORD_NOT_FOUND_MESSAGE,
      };
    default:
      return {
        code: ErrorConstants.INTERNAL_SERVER_ERROR,
        message: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE,
      };
  }
}

export class CustomError extends Error {
  public status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status || ErrorConstants.INTERNAL_SERVER_ERROR;
    Error.captureStackTrace(this, this.constructor);
  }
  toJSON() {
    return {
      status: false,
      message: this.message || ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE,
    };
  }
}

export const globalErrorHandler = (error: any, req: any, res: any, next: any) => {
  console.error(error);
  if (error instanceof CustomError) {
    return res.status(error?.status || ErrorConstants.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: error?.message || ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE,
    });
  }
  let error_res = handlePrismaError(error);
  return res.status(error_res?.code || error?.status || ErrorConstants.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: error_res?.message || ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE,
  });
};

export class NotFoundException extends CustomError {
  constructor(message: string = ErrorConstants.NOT_FOUND_MESSAGE) {
    super(ErrorConstants.NOT_FOUND, message);
  }
}

export class InternalServerException extends CustomError {
  constructor(message: string = ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE) {
    super(ErrorConstants.INTERNAL_SERVER_ERROR, message);
  }
}

export class FileUploadException extends CustomError {
  constructor(message: string = ErrorConstants.FILE_UPLOAD_ERROR_MESSAGE) {
    super(ErrorConstants.BAD_REQUEST, message);
  }
}

export class ValidationException extends CustomError {
  constructor(message: string = ErrorConstants.VALIDATION_ERROR_MESSAGE) {
    super(ErrorConstants.BAD_REQUEST, message);
  }
}

export class AuthorizationException extends CustomError {
  constructor(message: string = ErrorConstants.AUTHORIZATION_ERROR_MESSAGE) {
    super(ErrorConstants.UNAUTHORIZED, message);
  }
}

export class DuplicateValidationException extends CustomError {
  constructor(message: string = ErrorConstants.DUPLICATE_ERROR_MESSAGE) {
    super(ErrorConstants.DUPLICATE_ERROR_CODE, message);
  }
}

export class ServerDownException extends CustomError {
  constructor(message: string = ErrorConstants.SERVICE_UNAVAILABLE_MESSAGE) {
    super(ErrorConstants.SERVICE_UNAVAILABLE, message);
  }
}

export const handleStatusException = (response: any, isConsole: boolean = false) => {
  if (!response?.status) {
    if (isConsole) {
      console.error(response?.message);
    } else {
      throw new InternalServerException(response?.message);
    }
  }
  return response?.data;
};
