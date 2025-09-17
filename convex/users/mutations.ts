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
