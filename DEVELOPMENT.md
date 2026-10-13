# Փոքրիկ ընթերցասերներ — development handoff

## Implemented frontend
- `/`: illustrated Armenian homepage, featured and recent stories, reading progress, six categories, creative activity.
- `/library`, `/categories/$id`: search, category filters and sorting.
- `/story/$id`: paginated Armenian reader, adjustable type size, completion state, related stories.
- `/quiz/$id`: multiple choice, true/false, image, written and event-order questions; answer review and automatic scoring excluding written answers.
- `/cartoons`: search and category filtering, embedded YouTube or native MP4/WebM/OGG player, user-supplied URL preview.
- `/student`: name/class identification, session-only reading history, quiz results and earned badges.
- `/admin`: explicitly public DEMONSTRATION ONLY; separate management interface with overview, story/question/category/video CRUD, ordering, file previews, results filters, submission review, Unicode CSV export and homepage settings.
- Ctrl+Shift+A opens the administrator entry dialog. Credential submission intentionally reports the missing authentication service. A separate labeled demonstration link opens only mock management data; this is not a login bypass.

## Components and dependencies
Reusable navigation/footer, story and category cards, progress bar, reading controls, five-kind question renderer, video player, admin tables, edit forms, confirmation dialogs. React 19, TypeScript, TanStack Start/Router, Tailwind v4, Radix/shadcn, Lucide. No new third-party dependency was needed. Noto Sans Armenian loads through the root head. Four generated illustration assets are bundled.

## Demonstration boundary
All records use React provider state and reset on reload. Student fixtures are invented and labeled. File selection creates session-only object URLs, never uploads to a server. No credentials are validated, transmitted or stored. Cartoon cards intentionally do not invent playable copyrighted-video URLs; add school-approved media to preview it. External hosting may deny embeds. The fox and sparrow stories are original educational samples; Nazar is a short educational adaptation, not the complete original tale.

## Still to connect
1. Enable Lovable Cloud and decide student profile/identification and teacher-account policies before implementing authentication.
2. Replace provider mutation/read boundaries with persisted queries; tables for curriculum categories, stories, questions/options, approved videos, students, submissions/answers and homepage settings.
3. Implement authenticated administration and database-enforced authorization. Never deploy real student records through the public demonstration admin.
4. Add cover/video object storage with validation, limits and access policies.
5. Persist teacher written-answer grades and feedback; comments in the demonstration review dialog currently remain unsaved.
6. Configure approved school contact details, complete licensed literary texts and verified embeddable media.
7. Add privacy/consent, backups, retention and safeguards for children's data before production.

## Verification
Run `bunx vitest run src/test/reading-rules.test.ts src/test/app-routing.test.tsx`. Tests live outside the file-route directory.
