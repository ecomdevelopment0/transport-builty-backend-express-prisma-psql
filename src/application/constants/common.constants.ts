export const NODE_CACHE_KEYS = {};

export const NODE_CACHE_USED_KEYS = Object.values(NODE_CACHE_KEYS);

export enum PROVIDERS {
  PAYMENT = "payment",
  SMS = "sms",
  EMAIL = "email",
  DELIVERY = "delivery",
  STORAGE = "storage",
}

export const PROVIDER_CONSTANTS = {
  SMTP: "smtp",
};

export const TRIGGERS_EMAIL = {
  SIGN_UP_OTP_EMAIL: "SIGN_UP_OTP_EMAIL",
};

export const TRIGGERS_SMS = {
  SIGN_UP_OTP_SMS: "SIGN_UP_OTP_SMS",
};
