import { ErrorConstants } from "../constants/error.constant";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export function handlePrismaError(error: any): string {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case ErrorConstants.ERROR_CODE_DUPLICATE_ENTRY:
        return `${ErrorConstants.DUPLICATE_ENTRY_MESSAGE}${error.meta?.target}`;
      case ErrorConstants.ERROR_CODE_FOREIGN_KEY_CONSTRAINT:
        return `${ErrorConstants.FOREIGN_KEY_CONSTRAINT_MESSAGE}${error.meta?.field}`;
      case ErrorConstants.ERROR_CODE_RECORD_NOT_FOUND:
        return `${ErrorConstants.RECORD_NOT_FOUND_MESSAGE}${error.message}`;
      default:
        return `${ErrorConstants.UNEXPECTED_PRISMA_ERROR_MESSAGE}${error.message}`;
    }
  } else if (error instanceof PrismaClientValidationError) {
    return ErrorConstants.VALIDATION_ERROR_MESSAGE;
  } else if (error instanceof PrismaClientInitializationError) {
    return ErrorConstants.INITIALIZATION_ERROR_MESSAGE;
  }
  return error?.message || ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE;
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
  console.log({ globalErrorHandler: error });
  if (error instanceof CustomError) {
    return res.status(error?.status || ErrorConstants.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: error?.message || ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE,
    });
  }
  return res.status(error?.status || ErrorConstants.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: handlePrismaError(error),
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

export const handleError = (response: any) => {
  if (!response?.status) {
    throw new InternalServerException(response?.message);
  }
  return response?.data;
};

export const handleErrorWithConsole = (response: any) => {
  if (!response?.status) {
    console.error(response?.message);
  }
  return response?.data;
};
