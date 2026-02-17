import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  category: text("category").notNull(), // 'special_offer' or 'special_care'
  notes: text("notes"),
  imageUrl: text("image_url"),
});

export const carouselImages = pgTable("carousel_images", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contact: text("contact").notNull(), // Phone or Email
  message: text("message"),
  serviceId: integer("service_id"),
});

export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertCarouselImageSchema = createInsertSchema(carouselImages).omit({ id: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true });

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type CarouselImage = typeof carouselImages.$inferSelect;
export type InsertCarouselImage = z.infer<typeof insertCarouselImageSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
