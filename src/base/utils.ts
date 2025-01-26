import axios from "axios";
import { handleError } from "./handlers/error.handler";
import { Prisma, PrismaClient } from "@prisma/client";

export type PrismaModels = {
  [K in keyof PrismaClient]: PrismaClient[K] extends { create: any } ? K : never;
}[keyof PrismaClient & string];

export type ExtensionFn = (prisma: PrismaClient) => PrismaClient;

export interface TransactionOptions {
  transaction?: Prisma.TransactionClient;
}

export interface FilterOptions {
  pageSize?: number;
  page?: number;
  filterType?: string;
  sort?: any;
  search?: { keys: string[]; value: string; properties?: string[]; mode?: string };
  select?: string[];
  include?: string[];
}

const createInstance = () => {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.response.use(
    response => response?.data,
    error => {
      if (error?.response && error?.response?.data) {
        return error.response.data;
      } else {
        let service = error.config.url.split("/")[3];
        return { status: false, message: `Unable to reach ${service}` };
      }
    },
  );
  return instance;
};
export const api = createInstance();

export function getFirstConstraintMessage(errorArray: any[]) {
  if (!Array.isArray(errorArray) || errorArray.length === 0) {
    return "No error found";
  }

  function findConstraint(errors: any[]): string | null {
    for (let error of errors) {
      let currentPath = `${error.property} >`;

      if (error.constraints) {
        let firstConstraint: any = Object.values(error.constraints)[0];
        return firstConstraint;
      }

      if (Array.isArray(error.children) && error.children.length > 0) {
        let childConstraint = findConstraint(error.children);
        if (childConstraint) {
          return childConstraint ? `${currentPath} ${childConstraint}` : null;
        }
      }
    }
    return null;
  }

  let constraintMessage = findConstraint(errorArray);
  return constraintMessage || "No constraints found";
}

export function buildInclude(includePaths: string[]): any {
  let includeObject: any = {};
  for (let path of includePaths) {
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

export function capitalizeFirstLetter(message: string): string {
  return message.charAt(0).toUpperCase() + message.slice(1);
}

export function removeFields(items: any[], keysToExclude: any[]) {
  if (!items.length) return [];
  return items.map(item => {
    const { ...rest } = item;
    keysToExclude.forEach(key => {
      delete rest[key];
    });
    return rest;
  });
}

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
  let newFilterCriteria: any = {};
  for (const key in filterCriteria) {
    if (filterCriteria.hasOwnProperty(key)) {
      newFilterCriteria[key] = Array.isArray(filterCriteria[key])
        ? { in: removeDuplicates(filterCriteria[key].filter(Boolean)) }
        : filterCriteria[key];
    }
  }
  if (search && search.keys?.length && search?.value) {
    const searchConditions = search?.keys?.map((key: any) => {
      if (search?.properties?.length) {
        return {
          OR: search?.properties?.map((property: any) => ({
            [key]: {
              [property]: search?.value,
              mode: search?.mode || "insensitive",
            },
          })),
        };
      }
      return {
        [key]: {
          contains: search?.value,
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

export const conversionOfOrder = (value: any, decimals: number = 2) => {
  let number = Math.round(value * 100) / 100;
  return parseFloat(number.toFixed(decimals));
};

export function removeEmptyObjectsFromArray(objects: any[]) {
  return objects.filter(obj => {
    return !(obj && Object.keys(obj).length === 0 && obj.constructor === Object);
  });
}

export async function getAndCreateItems(
  adapter: any,
  key: string,
  items: any[],
  batchSize: number = 5000,
): Promise<any[]> {
  const uniqueItemsMap = new Map<string, any>();
  items.forEach(item => {
    if (item[key]) {
      uniqueItemsMap.set(item[key], item);
    }
  });
  items = Array.from(uniqueItemsMap.values());
  if (!items.length) {
    return [];
  }
  const result: any[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    let currentBatch = items.slice(i, i + batchSize);
    let uniqueKeys = Array.from(new Set(currentBatch.map(item => item[key])));
    let filterCriteria = { [key]: uniqueKeys.filter(Boolean) };
    let existingDataResponse = await adapter.filter(filterCriteria);
    let existingData = handleError(existingDataResponse);
    let existingKeysSet = new Set(existingData.map((data: any) => data[key]));
    let newItems = currentBatch.filter(item => !existingKeysSet.has(item[key]));
    newItems = removeEmptyObjectsFromArray(newItems);
    let createdItems: any[] = [];
    if (newItems.length > 0) {
      let createdDataResponse = await adapter.createMany(newItems);
      createdItems = handleError(createdDataResponse);
    }
    result.push(...existingData, ...createdItems);
  }
  return result;
}

export async function createAndUpdateItems(
  adapter: any,
  key: string,
  items: any[],
  batchSize: number = 5000,
): Promise<any> {
  const uniqueItemsMap = new Map<string, any>();
  items.forEach(item => {
    if (item[key]) {
      uniqueItemsMap.set(item[key], item);
    }
  });
  items = Array.from(uniqueItemsMap.values());
  if (!items.length) {
    return [];
  }
  for (let i = 0; i < items.length; i += batchSize) {
    let currentBatch = items.slice(i, i + batchSize);
    let uniqueKeys = Array.from(new Set(currentBatch.map(item => item[key])));
    let filterCriteria = { [key]: uniqueKeys.filter(Boolean) };
    let existingDataResponse = await adapter.filter(filterCriteria);
    let existingData = handleError(existingDataResponse);
    let existingKeysSet = new Set(existingData.map((data: any) => data[key]));
    let newItems = currentBatch.filter(item => !existingKeysSet.has(item[key]));
    let updateItems = currentBatch.filter(item => existingKeysSet.has(item[key]));
    let updateManyQuery: any = [];
    for (const item of updateItems) {
      updateManyQuery.push({ where: { [key]: item[key] }, data: item });
    }
    await adapter.updateMany(updateManyQuery);
    newItems = removeEmptyObjectsFromArray(newItems);
    if (newItems.length > 0) {
      let createdDataResponse = await adapter.createMany(newItems);
      handleError(createdDataResponse);
    }
  }
  return;
}

export async function createAndUpdateItemsWithMultipleFilterConditions(
  adapter: any,
  keys: string[],
  items: any[],
  batchSize: number = 5000,
): Promise<any> {
  const uniqueItemsMap = new Map<string, any>();
  items.forEach(item => {
    const compositeKey = keys.map(key => item[key]).join("|");
    if (compositeKey) {
      uniqueItemsMap.set(compositeKey, item);
    }
  });
  items = Array.from(uniqueItemsMap.values());
  if (!items.length) {
    return [];
  }
  for (let i = 0; i < items.length; i += batchSize) {
    let currentBatch = items.slice(i, i + batchSize);
    let filterCriteria: any = {};
    keys.forEach(key => {
      const uniqueKeys = Array.from(new Set(currentBatch.map(item => item[key])));
      filterCriteria[key] = uniqueKeys.filter(Boolean);
    });
    let existingDataResponse = await adapter.filter(filterCriteria);
    let existingData = handleError(existingDataResponse);
    let existingKeysSet = new Set(existingData.map((data: any) => keys.map(key => data[key]).join("|")));
    let newItems = currentBatch.filter(item => {
      const compositeKey = keys.map(key => item[key]).join("|");
      return !existingKeysSet.has(compositeKey);
    });
    let updateItems = currentBatch.filter(item => {
      const compositeKey = keys.map(key => item[key]).join("|");
      return existingKeysSet.has(compositeKey);
    });
    let updateManyQuery: any = [];
    for (const item of updateItems) {
      const whereClause: any = {};
      keys.forEach(key => {
        whereClause[key] = item[key];
      });
      updateManyQuery.push({ where: whereClause, data: item });
    }
    let updateManyResponse = updateManyQuery?.length ? await adapter.updateMany(updateManyQuery) : { status: true };
    handleError(updateManyResponse);
    newItems = removeEmptyObjectsFromArray(newItems);
    if (newItems.length > 0) {
      let createdDataResponse = await adapter.createMany(newItems);
      handleError(createdDataResponse);
    }
  }
  return;
}

export async function createAndUpdateItemsWithMultipleConditions(
  adapter: any,
  key: string,
  items: any[],
  batchSize: number = 5000,
  whereConditions: string[] = ["id"],
): Promise<any> {
  const uniqueItemsMap = new Map<string, any>();
  items.forEach(item => {
    if (item[key]) {
      uniqueItemsMap.set(item[key], item);
    }
  });
  items = Array.from(uniqueItemsMap.values());
  if (!items.length) {
    return [];
  }
  const result: any[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    let currentBatch = items.slice(i, i + batchSize);
    let uniqueKeys = Array.from(new Set(currentBatch.map(item => item[key])));
    let filterCriteria = { [key]: uniqueKeys.filter(Boolean) };
    let existingDataResponse = await adapter.filter(filterCriteria);
    let existingData = handleError(existingDataResponse);
    let existingKeysSet = new Set(existingData.map((data: any) => data[key]));
    let newItems = currentBatch.filter(item => !existingKeysSet.has(item[key]));
    let updateItems = currentBatch.filter(item => existingKeysSet.has(item[key]));
    let updateManyQuery: any = [];
    for (const item of updateItems) {
      const conditions = whereConditions.reduce((acc: any, conditionKey: any) => {
        acc[conditionKey] = item[conditionKey];
        return acc;
      }, {});
      updateManyQuery.push({ where: conditions, data: item });
    }
    await adapter.updateMany(updateManyQuery);
    newItems = removeEmptyObjectsFromArray(newItems);
    let createdItems: any[] = [];
    if (newItems.length > 0) {
      let createdDataResponse = await adapter.createMany(newItems);
      createdItems = handleError(createdDataResponse);
    }
    result.push(...existingData, ...createdItems);
  }
  return result;
}

export async function executeCreateManyInBatches(adapter: any, items: any[], batchSize: number = 5000): Promise<any> {
  for (let i = 0; i < items.length; i += batchSize) {
    let currentBatch = items.slice(i, i + batchSize);
    if (currentBatch.length > 0) {
      await adapter.createMany(currentBatch);
    }
  }
  return;
}

export async function executeFilterInBatches(
  adapter: any,
  filterCriteria: any,
  batchSize: number = 5000,
): Promise<any> {
  let result: any[] = [];
  let pageCount = 1;
  for (let i = 1; i <= pageCount; i++) {
    let data = await adapter.filter({ page: i, pageSize: batchSize, ...filterCriteria });
    let handledData = handleError(data);
    result.push(...handledData);
    pageCount = data?.pageCount || 0;
  }
  return result;
}

export async function executeUpdateManyInBatches(adapter: any, items: any[], batchSize: number = 5000): Promise<any> {
  for (let i = 0; i < items.length; i += batchSize) {
    let currentBatch = items.slice(i, i + batchSize);
    if (currentBatch.length > 0) {
      await adapter.updateMany(currentBatch);
    }
  }
  return;
}

export function trimObject(obj: any) {
  if (typeof obj !== "object" || obj === null) return obj;
  const trimmedObj: any = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    const trimmedKey = key.trim();
    trimmedObj[trimmedKey] =
      typeof obj[key] === "object" ? trimObject(obj[key]) : typeof obj[key] === "string" ? obj[key].trim() : obj[key];
  }
  return trimmedObj;
}

export function parseObject(obj: any): any {
  if (Array.isArray(obj)) {
    const cleanedArray = obj
      .map(parseObject)
      .filter(item => item !== null && item !== undefined && !(Array.isArray(item) && item.length === 0));
    return cleanedArray.length > 0 ? cleanedArray : null;
  } else if (typeof obj === "object" && obj !== null) {
    const cleanedObject = Object.entries(obj).reduce((acc: any, [key, value]) => {
      const cleanedValue = parseObject(value);
      if (
        cleanedValue !== null &&
        cleanedValue !== undefined &&
        !(typeof cleanedValue === "object" && Object.keys(cleanedValue).length === 0)
      ) {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {});
    return Object.keys(cleanedObject).length > 0 ? cleanedObject : null;
  } else if (obj === 0 || obj === "" || obj === null || obj === undefined) {
    return null;
  }
  return obj;
}
