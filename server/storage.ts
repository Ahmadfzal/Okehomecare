import { services, carouselImages, inquiries, type Service, type InsertService, type CarouselImage, type InsertCarouselImage, type Inquiry, type InsertInquiry } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  deleteService(id: number): Promise<void>;
  getCarouselImages(): Promise<CarouselImage[]>;
  createCarouselImage(image: InsertCarouselImage): Promise<CarouselImage>;
  deleteCarouselImage(id: number): Promise<void>;
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class DatabaseStorage implements IStorage {
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }

  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  async getCarouselImages(): Promise<CarouselImage[]> {
    return await db.select().from(carouselImages);
  }

  async createCarouselImage(insertImage: InsertCarouselImage): Promise<CarouselImage> {
    const [image] = await db.insert(carouselImages).values(insertImage).returning();
    return image;
  }

  async deleteCarouselImage(id: number): Promise<void> {
    await db.delete(carouselImages).where(eq(carouselImages.id, id));
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }
}

export const storage = new DatabaseStorage();
