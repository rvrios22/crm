import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    clerk_id: v.string(),
    company_id: v.union(v.null(), v.string()),
  },
  handler: async (ctx, args) => {
    const newUser = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      clerk_id: args.clerk_id,
      company_id: null,
    });
    return newUser;
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company_id: v.union(v.null(), v.string()),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.patch(id, {
      name: args.name,
      email: args.email,
      phone: args.phone,
      company_id: args.company_id,
    });
  },
});
