import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const newUser = fetchMutation(api.users.mutations.createUser, {
      name: evt.data.first_name as string,
      phone: "",
      email: evt.data.email_address,
      clerk_id: evt.data.id,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
