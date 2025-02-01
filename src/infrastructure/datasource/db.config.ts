import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

// Singleton PrismaClient implementation
export class DatabaseConnection {
  private static instance: PrismaClient | null = null;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new PrismaClient({
        log: ["error", "warn"],
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });
    }
    return DatabaseConnection.instance;
  }

  public static async connect(): Promise<void> {
    try {
      const client = DatabaseConnection.getInstance();
      await client.$connect();
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1);
    }
  }

  public static async disconnect(): Promise<void> {
    if (DatabaseConnection.instance) {
      await DatabaseConnection.instance.$disconnect();
      DatabaseConnection.instance = null;
      console.log("Database disconnected");
    }
  }
}

// Export the singleton methods
export const prisma = DatabaseConnection.getInstance();
export const DBInit = DatabaseConnection.connect;
export const DBDisconnect = DatabaseConnection.disconnect;
