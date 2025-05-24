import { Prisma, PrismaClient } from "@prisma/client";

export type PrismaModels = {
  [K in keyof PrismaClient]: PrismaClient[K] extends { create: any } ? K : never;
}[keyof PrismaClient & string];

export type ExtensionFn = (prisma: PrismaClient) => PrismaClient;

export interface TransactionOptions {
  transaction?: Prisma.TransactionClient;
}

export interface InternalFilterOptions {
  page_size?: number;
  page?: number;
  filter_type?: string;
  sort?: any;
  search?: { keys: string[]; value: string; properties?: string[]; mode?: string };
  select?: string[];
  include?: string[];
}

export interface FilterOptions {
  page_size?: number;
  page?: number;
  filter_type?: string;
  sort?: any;
  search?: { keys: string[]; value: string; properties?: string[]; mode?: string };
}
