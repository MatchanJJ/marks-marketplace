# Verification

Verified on November 15, 2026.

- `npm ci`: pinned dependencies installed; audit reported zero vulnerabilities.
- `npm test`: all 6 focused tests passed (exact cents, listing validation, private message validation, literal search escaping, photo type/size checks).
- `npm run typecheck` and `npm run build`: passed. Routes are `/`, `/new`, and `/listings/[id]`.
- `npm run test:marketplace`: passed against the separate marketplace Supabase project. Checked image upload/public retrieval, listing persistence, category/title filters, private message submission, invalid input/ID/time rejection, denied public message reads, denied listing edits/deletes, and denied image overwrites/oversize/unsupported uploads.
- Browser: created a photo listing in Books, verified dedicated detail navigation, refresh persistence, category filtering, title search matches and empty results, and saved-message feedback.
- Browser photo removal/replacement and invalid price validation were checked before extracting the standalone source; those component flows were preserved.
- Supabase administrator query confirmed one private message on each of the standalone smoke listing and browser-created Books listing. RLS is enabled on both tables; listings allow public reads and messages deny them.
- Production deployment checks are pending. A true phone-width viewport has not yet been verified.

Screenshots are in `artifacts/screenshots/`. The diagnostic demo listings/photos and private test messages remain for administrator review; all use `example.com` test contacts. No actual offers are advertised.

No email delivery, seller inbox, payments, authentication, moderation, or application submission was tested or included. Anonymous posting requires abuse controls before broader public use.
