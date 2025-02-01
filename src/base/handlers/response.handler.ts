import { Response } from "express";
import { SuccessConstants } from "../constants/success.constant";

export const successResponse = (response: Response, data: any, code?: number, message?: string) => {
  response.status(code || SuccessConstants.SUCCESSFUL).json({
    status: true,
    message: message || SuccessConstants.SUCCESSFUL_MESSAGE,
    data,
  });
};

export const successPaginatedResponse = (
  response: Response,
  data: any,
  totalCount: number,
  page: number,
  pageSize: number,
  code?: number,
  message?: string,
) => {
  response.status(code || SuccessConstants.SUCCESSFUL).json({
    status: true,
    message: message || SuccessConstants.SUCCESSFUL_MESSAGE,
    data: data || [],
    totalCount: Number(totalCount) || 0,
    pageCount: Math.ceil(totalCount / pageSize) || 0,
    pageSize: Number(pageSize) || 0,
    page: Number(page) || 0,
  });
};
