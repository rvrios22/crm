import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    clerk_id: v.string(),
    company_id: v.union(v.null(), v.string()),
  }).index("by_clerk_id", ["clerk_id"]),
  companies: defineTable({
    company_name: v.string(),
    company_email: v.string(),
    company_phone: v.optional(v.string()),
  }),
  customers: defineTable({
    company_id: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    default_billing_address: v.optional(v.union(v.string(), v.null())),
  }).index("by_comapny_id", ["company_id"]),
  addresses: defineTable({
    customer_id: v.string(),
    street_address_line1: v.string(),
    street_address_line2: v.optional(v.string()),
    city: v.string(),
    state: v.string(),
    zip_code: v.string(),
    country: v.string(),
    instructions: v.optional(v.string()),
  }).index("by_customer_id", ["customer_id"]),
});
