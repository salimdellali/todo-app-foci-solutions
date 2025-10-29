# Supabase DB Recovery

This project is running on Supabase free tier, if the project becomes inactive for too long, Supabase tend to delete the Supabase project

## Steps to recover the DB

1. Create a new project on Supabase
1. Get the new Connection String (Click "Connect" → Select "ORMs" tab → Choose "Drizzle" from the dropdown → Copy the "DATABASE_URL")

### Then, on local
1. Paste `DATABASE_URL` it in `.env`
1. Since we have the migration file `0000_round_captain_universe.sql`, run `npx drizzle-kit push` to push the migration to Supabase (this will create the `Todo` table)
1. Check if the migration was successful by running `npx drizzle-kit studio` and create a Todo

### Then, on Vercel (prod)
1. Go to the project's environment variables, and replace the value of `DATABASE_URL` with the new value

The project should be up and running
