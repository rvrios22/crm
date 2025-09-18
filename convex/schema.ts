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
});
