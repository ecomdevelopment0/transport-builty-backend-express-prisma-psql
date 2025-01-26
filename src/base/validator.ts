import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export async function SchemaValidator(schema: any, data: any) {
  let instance = plainToInstance(schema, data, {
    enableImplicitConversion: true,
  });
  let errors = (await validate(instance, { whitelist: true, forbidNonWhitelisted: true })).filter(Boolean);
  return { errors, instance };
}
