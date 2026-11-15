import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
import { searchPattern } from "../src/lib/marketplace.ts";

const url = process.env.NEXT_PUBLIC_MARKETPLACE_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_MARKETPLACE_SUPABASE_PUBLISHABLE_KEY;
assert.ok(url && key, "Configure the separate marketplace Supabase project first.");
const options = { auth: { persistSession: false, autoRefreshToken: false } };
const writer = createClient(url, key, options);
const reader = createClient(url, key, options);
const token = randomUUID();
const path = `${token}.png`;
const fixture = await readFile(new URL("../public/mark-portrait.png", import.meta.url));
const bucket = writer.storage.from("listing-images");
assert.ifError((await bucket.upload(path, fixture, { contentType: "image/png", upsert: false })).error);
const image = await fetch(bucket.getPublicUrl(path).data.publicUrl);
assert.equal(image.status, 200);

const listing = {
  title: `Demo portrait print ${token}`,
  description: "Automated marketplace check using the public profile portrait. This is a demonstration, not an actual offer.",
  price_cents: 1250, category: "Other", seller_email: "seller@example.com", image_path: path,
};
const inserted = await writer.from("listings").insert(listing).select().single();
assert.ifError(inserted.error);
console.log(`Diagnostic listing: ${inserted.data.id}`);
const persisted = await reader.from("listings").select().eq("id", inserted.data.id).single();
assert.ifError(persisted.error);
assert.equal(persisted.data.price_cents, 1250);
assert.equal(persisted.data.image_path, path);

const filtered = await reader.from("listings").select().eq("category", "Other").ilike("title", searchPattern(token));
assert.ifError(filtered.error);
assert.equal(filtered.data.length, 1);
const hiddenByCategory = await reader.from("listings").select().eq("category", "Books").eq("id", inserted.data.id);
assert.ifError(hiddenByCategory.error);
assert.equal(hiddenByCategory.data.length, 0);

for (const invalid of [
  { title: " \n" }, { title: "a".repeat(121) }, { title: `a${" ".repeat(120)}` },
  { description: "" }, { description: `a${" ".repeat(3000)}` }, { price_cents: -1 },
  { price_cents: 100000000 }, { category: "Unknown" }, { seller_email: "bad" },
  { image_path: "https://example.com/private.jpg" }, { id: randomUUID() }, { created_at: "2008-01-01T00:00:00Z" },
]) {
  assert.ok((await writer.from("listings").insert({ ...listing, ...invalid })).error, JSON.stringify(invalid));
}
const message = { listing_id: inserted.data.id, buyer_email: "buyer@example.com", message: "Automated check — is this demo listing available?" };
assert.ifError((await writer.from("messages").insert(message)).error);
assert.ok((await reader.from("messages").select()).error, "Buyer messages must not be publicly readable.");
for (const invalid of [{ message: " \t" }, { message: "a".repeat(2001) }, { message: `a${" ".repeat(2000)}` }, { buyer_email: "invalid" }, { listing_id: randomUUID() }]) {
  assert.ok((await writer.from("messages").insert({ ...message, ...invalid })).error);
}
assert.ok((await writer.from("listings").update({ title: "Changed" }).eq("id", inserted.data.id)).error);
assert.ok((await writer.from("listings").delete().eq("id", inserted.data.id)).error);
assert.ok((await bucket.upload(path, fixture, { contentType: "image/png", upsert: true })).error);
assert.ok((await bucket.upload(`${randomUUID()}.jpg`, Buffer.alloc(5 * 1024 * 1024 + 1), { contentType: "image/png" })).error);
assert.ok((await bucket.upload(`${randomUUID()}.jpg`, Buffer.from("<svg/>"), { contentType: "image/svg+xml" })).error);
console.log("Passed: photo upload, listing persistence, category/title filters, private message insertion, validation, and denied mutation.");
console.log("The diagnostic listing/photo and private test message remain for administrator review and cleanup.");
