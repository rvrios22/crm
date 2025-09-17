import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    clerk_id: v.string(),
    company_id: v.union(v.null(), v.string()),
  }),
  companies: defineTable({
    name: v.string(),
    business_email: v.string(),
    business_phone: v.optional(v.string()),
  })
});
