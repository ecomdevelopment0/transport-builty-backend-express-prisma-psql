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
  total_count: number,
  page: number,
  page_size: number,
  code?: number,
  message?: string,
) => {
  response.status(code || SuccessConstants.SUCCESSFUL).json({
    status: true,
    message: message || SuccessConstants.SUCCESSFUL_MESSAGE,
    data: data || [],
    total_count: Number(total_count) || 0,
    page_count: Math.ceil(total_count / page_size) || 0,
    page_size: Number(page_size) || 0,
    page: Number(page) || 0,
  });
};
