import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";

const findEmail = (primaryEmailId: string, emails: any[]) => {
  const emailObj = emails.find((email) => email.id === primaryEmailId);
  return emailObj.email_address;
};

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    await fetchMutation(api.users.mutations.createUser, {
      name: `${evt.data.first_name} ${evt.data.last_name}`,
      phone: "",
      email: findEmail(
        evt.data.primary_email_address_id,
        evt.data.email_addresses
      ),
      clerk_id: evt.data.id,
      company_id: null,
    });
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
