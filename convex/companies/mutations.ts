import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createCompany = mutation({
  args: {
    company_name: v.string(),
    company_email: v.string(),
    comapny_phone: v.string(),
  },
  handler: async (ctx, args) => {
    const newCompany = await ctx.db.insert("companies", {
      company_name: args.company_name,
      company_email: args.company_email,
      company_phone: args.comapny_phone,
    });
    return newCompany;
  },
});
