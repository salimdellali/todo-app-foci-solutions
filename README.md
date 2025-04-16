# Todo App

- This Todo App enables users to perform full CRUD operations (Create / Read / Update / Delete) on Todos.
- You can filter Todos based on their status: "Completed" / "In Progress" / "Due Soon" / "Overdue".
- You can also sort Todos based on: "Last Created" / "Last Updated" / "Due Date" / "Title".
- Full specifications for this Todo App project can be found inside [CHALLENGE.md](CHALLENGE.md).

## Try the app online

- This project is hosted on Vercel. You can try it out via this link: [https://todo-app-foci-solutions.vercel.app/](https://todo-app-foci-solutions.vercel.app/)

## Try the app locally

1. Create a fresh PostgreSQL DB instance.
2. Clone this project to your local machine.
3. Create an `.env` file and copy the contents of `.env.example` into it.
4. Fill in the `DATABASE_URL` env variable with your PostgreSQL DB instance URL.
5. Then run the following scripts:

```bash
# install dependencies
npm i

# generate a migration file to create and apply the DB schema to your PostgreSQL instance
npx drizzle-kit generate

# apply the migration to your PostgreSQL instance
npx drizzle-kit migrate

# create a production-ready build locally
npm run build

# start the project
npm start
```

You can also run the app in development mode:

```bash
# run the dev server
npm run dev

# before committing any new changes, run tests
npm test
```

## Main Technologies Used

- `Next.js` App Router
- `ShadCN UI` design library
- Next.js server actions
- `date-fns` npm package for date handling
- `Supabase` with a `PostgreSQL` database
- ~~Prisma~~ `Drizzle ORM` to interact with the DB
- `Jest` for testing
- `Vercel` for hosting

## Choosing the Right ORM

You may have noticed Prisma is strikethrough — it was my initial choice, as I’ve used it in previous projects. However, I encountered several issues in this setup. Since I’m using server actions and hosting on Vercel, Prisma worked locally but not in production. I ultimately switched to Drizzle ORM, which was new to me but worked seamlessly both locally and on Vercel.

## Development Journey

1. Initiated a new Next.js project.
1. Downgraded `React` and `ReactDOM` to version `18.x.x` due to compatibility issues with `ShadCN UI`.
1. Built the UI components: add Todo form, Todo item, Todo list, and add button.
1. Configured frontend state management for Todos.
1. Attempted to use `Prisma`: successful locally, but failed on Vercel.
1. Regress from using `Prisma`
1. Replaced Prisma with `Drizzle ORM` and confirmed functionality both locally and on Vercel.
1. Implemented server actions: get all Todos, add, delete, update, and toggle completion, and connected them to the frontend.
1. Improved Todo item rendering based on status.
1. Implemented filtering and sorting UI for Todos.
1. Refactored code to move calculation functions into the `/lib` folder for better separation of concerns and cleaner testing.
1. Installed `Jest` and wrote unit tests.

## Improvements To Consider

- Prevent spam toggling of Todo completion.
- Improve Todo add/edit form validation (e.g., using `Zod`).
- Implement a global state solution like `Zustand` to simplify props passing between parents and child components.
- Add more unit tests.
- Add integration and E2E tests.

## Final Thoughts

I really enjoyed working on this project 😊.

I got the chance to deploy a Fullstack App using server actions on the Backend, as I mainly have deployed Fullstack apps using the traditional REST API approach in the past.

I also got the chance to learn how to work with Drizzle ORM.
