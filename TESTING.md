# Verification

Verified on November 15, 2026.

- `npm ci`: pinned dependencies installed; audit reported zero vulnerabilities.
- `npm test`: all 6 focused tests passed (exact cents, listing validation, private message validation, literal search escaping, photo type/size checks).
- `npm run typecheck` and `npm run build`: passed. Routes are `/`, `/new`, and `/listings/[id]`.
- `npm run test:marketplace`: passed against the separate marketplace Supabase project. Checked image upload/public retrieval, listing persistence, category/title filters, private message submission, invalid input/ID/time rejection, denied public message reads, denied listing edits/deletes, and denied image overwrites/oversize/unsupported uploads.
- Browser: created a photo listing in Books, verified dedicated detail navigation, refresh persistence, category filtering, title search matches and empty results, and saved-message feedback.
- Browser photo removal/replacement and invalid price validation were checked before extracting the standalone source; those component flows were preserved.
- Supabase administrator query confirmed one private message on each of the standalone smoke listing and browser-created Books listing. RLS is enabled on both tables; listings allow public reads and messages deny them.
- Production: https://marks-marketplace.vercel.app is publicly reachable and uses its own Vercel project and GitHub repository. Verified live listing retrieval, details, photo upload and publishing, and saved buyer-message feedback.
- Responsive: measured a 387-pixel viewport; browse, detail, and listing form had no horizontal overflow. Category navigation and message submission worked at phone width. Restored the browser pane after the check.
- Stock mock data: one labelled Pexels-photo listing in each of the six categories. Seed script assertions verify category coverage, allowed local JPEG files, valid listing inputs, six saved records, and public image retrieval. All six category filters were also checked on the production site.

Screenshots are in `artifacts/screenshots/`. At the user's request, the four diagnostic Demo listings and their four linked test messages were removed. An administrator count and the live browse page confirm only the six stock-photo mock listings remain. The uploaded diagnostic images remain in Storage; no storage files were deleted. No actual offers are advertised. Source URLs and photographer credits for the six mock photos are recorded in PHOTO-CREDITS.md and the listing descriptions.

No email delivery, seller inbox, payments, authentication, moderation, or application submission was tested or included. Anonymous posting requires abuse controls before broader public use.

Cleanup verification: 6 listings, 0 Demo test listings, 0 buyer messages; live page has 6 mock listing links and 0 diagnostic Demo links. The live creation smoke test was not rerun after cleanup because it creates new diagnostic listings and messages.
