import { query } from "../_generated/server";
import { v } from "convex/values";
export const getUserByClerkId = query({
  args: { clerk_id: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("clerk_id"), args.clerk_id))
      .first();
    return user;
  },
});
