# Marketplace development

- Keep this a standalone Test 3 app; do not add wall routes or depend on the wall repository.
- Use small conventional commits and conventional branches. No coauthor trailers.
- Run npm test, npm run typecheck, and npm run build before finishing.
- Public clients may read listings and insert validated listings/messages. Buyer messages must remain private; never permit public update/delete or ID/timestamp overrides.
- Only publishable Supabase keys belong in browser code. Never commit .env.local or service-role keys.
- Run supabase/marketplace.sql only once against a new marketplace project. Preserve existing data.
