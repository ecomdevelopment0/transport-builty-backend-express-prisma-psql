export function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function isValidPhoneNumber(phoneNumber: string) {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phoneNumber);
}
