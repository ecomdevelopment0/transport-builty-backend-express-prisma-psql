import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import { AuthorizationException, ValidationException } from "./handlers/error.handler";
import { SECRET_KEY } from "../application/constants/common.constants";
import { ErrorConstants } from "./constants/error.constant";

export function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function isValidMobile(mobile: string) {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile);
}

export const generateOTP = (length: number = 6): string => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
};

export const verifyJWT = (req: Request<ParamsDictionary>, res: Response, next: NextFunction): void => {
  const auth_header = req.headers.authorization;
  if (!auth_header) {
    throw new AuthorizationException("Authorization header missing");
  }
  const token_parts = auth_header.split(" ");
  if (token_parts.length !== 2 || token_parts[0] !== "Bearer") {
    throw new AuthorizationException();
  }
  const token: any = token_parts[1];
  let result: any = jwt.verify(token, SECRET_KEY);
  if (!result) throw new ValidationException(ErrorConstants.INVALID_OR_EXPIRE_TOKEN);
  next();
};

export function removeDuplicates(arr: any[]) {
  return [...new Set(arr)];
}

// equals
// contains
// startsWith
// endsWith
export function buildFilter(
  filterCriteria: any,
  search: { keys: string[]; value: string; properties?: string[]; mode?: string } | undefined,
) {
  const LOGICAL_OPERATORS = new Set(["OR", "AND"]);
  let newFilterCriteria: any = {};
  for (const key in filterCriteria) {
    if (filterCriteria.hasOwnProperty(key) && !LOGICAL_OPERATORS.has(key)) {
      if (Array.isArray(filterCriteria[key])) {
        const uniqueValues = removeDuplicates(filterCriteria[key].filter(Boolean));
        if (uniqueValues.length > 25000) {
          throw new ValidationException(`Filter criteria for key '${key}' exceeds the maximum limit of 25,000 values.`);
        }
        newFilterCriteria[key] = { in: uniqueValues };
      } else {
        newFilterCriteria[key] = filterCriteria[key];
      }
    } else {
      newFilterCriteria[key] = filterCriteria[key];
    }
  }

  if (search && search.keys?.length && search?.value) {
    let value = search?.value;
    const searchConditions = search?.keys?.map((key: any) => {
      if (typeof value === "number") {
        return {
          [key]: {
            equals: value,
          },
        };
      }
      if (search?.properties?.length) {
        return {
          OR: search?.properties?.map((property: any) => ({
            [key]: {
              [property]: value,
              mode: search?.mode || "insensitive",
            },
          })),
        };
      }
      return {
        [key]: {
          contains: value,
          mode: search?.mode || "insensitive",
        },
      };
    });
    newFilterCriteria = {
      ...newFilterCriteria,
      AND: [...(newFilterCriteria.AND || []), { OR: searchConditions }],
    };
  }
  return newFilterCriteria;
}

export function buildInclude(includePaths: string[]): any {
  let includeObject: any = {};
  for (let path of includePaths) {
    if (path.startsWith("_count.")) {
      let [_, field] = path.split(".");
      if (!includeObject._count) {
        includeObject._count = { select: {} };
      }
      includeObject._count.select[field as string] = { where: { active_flag: true, delete_flag: false } };
    } else {
      let keys = path.split(".");
      let current = includeObject;
      for (let i = 0; i < keys.length; i++) {
        let key: any = keys[i];
        if (i === keys.length - 1) {
          current[key] = true;
        } else {
          if (!current[key]) {
            current[key] = { include: {} };
          }
          current = current[key].include;
        }
      }
    }
  }
  return includeObject;
}

export function buildSelect(selectPaths: string[]): any {
  let select: any = {};
  for (let path of selectPaths) {
    let keys = path.split(".");
    let current = select;
    for (let i = 0; i < keys.length; i++) {
      let key: any = keys[i];
      if (i === keys.length - 1) {
        current[key] = true;
      } else {
        if (!current[key]) {
          current[key] = { select: {} };
        }
        current = current[key].select;
      }
    }
  }
  return select;
}

export function buildUpdateManyQuery(table: string, data: any[], whereConditions: string[] = ["id"]): string {
  if (data.length === 0 || whereConditions.length === 0) {
    throw new Error("Data and where conditions must not be empty");
  }
  let columns = Object.keys(data[0]);
  let setClause = columns.map(col => `"${col}" = c."${col}"`).join(", ");
  let valuesClause = data
    .map(row => {
      let values = columns
        .map(col => {
          let value = row[col];
          return formatValueForSQL(value);
        })
        .join(", ");
      return `(${values})`;
    })
    .join(", ");

  let whereClause = whereConditions.map(key => `c."${key}" = t."${key}"`).join(" AND ");
  return `
      UPDATE "${table}" AS t
      SET ${setClause}
      FROM (VALUES ${valuesClause}) AS c(${columns.map(col => `"${col}"`).join(", ")})
      WHERE ${whereClause};
  `;
}

export function formatValueForSQL(value: any): string {
  if (value === null || value === undefined) {
    return "NULL";
  }
  switch (typeof value) {
    case "string":
      return `'${value.replace(/'/g, "''")}'`;
    case "number":
      return value.toString();
    case "boolean":
      return value ? "TRUE" : "FALSE";
    default:
      throw new Error(`Unsupported data type: ${typeof value}`);
  }
}

export function formatString(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "-");
}
