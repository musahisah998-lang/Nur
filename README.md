# Nur

Nur is a clean foundation for a future Islamic learning platform with a trustworthy design and role-ready architecture.

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL

## Local setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and add your values.
3. Run the SQL in `supabase/schema.sql` in the Supabase SQL editor.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the app:
   ```bash
   npm run dev
   ```

## Default auth behavior

- New users are automatically assigned the `student` role.
- User profiles are created in the `profiles` table.
- Only `admin` and `super_admin` roles can reach the admin area.
- Role updates from clients are blocked by the database trigger.

## Main routes

- `/`
- `/login`
- `/signup`
- `/dashboard`
- `/profile`
- `/admin`

## Notes

This is the foundation build only. Advanced academy, Quran, library, AI, teacher, and subscription features are intentionally left for future prompts.
