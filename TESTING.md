# Verification

- Database schema applied to the separate marketplace project in the marks organization, Singapore.
- Verified RLS on both tables, public listing reads, denied public message reads, and the 5 MB photo bucket.
- Original connected live smoke check passed: upload, persistence, filters, private message insertion, invalid field rejection, and denied mutation.
- Standalone route and deployment checks are in progress.
