import { Xendit } from "xendit-node";

if (!process.env.XENDIT_SECRET_KEY) {
  throw new Error("Missing XENDIT_SECRET_KEY environment variable");
}

export const xenditClient = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
});
