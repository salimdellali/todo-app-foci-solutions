# Todo App

- This Todo App enables users to perform full CRUD operations (Create / Read / Update / Delete) on Todos
- It is possible to filter Todos based on their status: "Completed" / "In Progress" / "Due Soon" / "Overdue"
- It is also possible to sort Todos based on: "Last Created" / "Last Updated" / "Due Date" / "Title"
- Full specifications for this Todo App project can be found inside [CHALLENGE.md](CHALLENGE.md)

## Try the app online

- This project is hosted on Vercel, you can try it out via this link [https://todo-app-foci-solutions.vercel.app/](https://todo-app-foci-solutions.vercel.app/)

## Try the app locally

1. Create a fresh PostgreSQL DB instance
1. Clone this project to your local machine
1. Create an `.env` file and copy the contents of `.env.example` inside
1. Fill in the `DATABASE_URL` env variable with your PostgreSQL DB instance URL
1. Then run the following scripts

```bash
# install dependencies
npm i

# generate a migration file to create and apply the DB schema to your PostgreSQL instance
npx drizzle-kit generate

# apply the migration to your PostgreSQL instance
npx drizzle-kit migrate

# create a production ready build locally
npm run build

# start the project
npm start
```

It is also possible to perform development on this project

```bash
# run the dev server
npm run dev

# before committing any new changes, run tests
npm test
```

## Main Technologies used

- `Next.js` App router
- `ShadCN UI` as design library
- Next.js server actions approach
- `date-fns` npm package to work with dates
- `Supabase` for `PostgreSQL` DB
- ~~Prisma~~ `Drizzle ORM` to interact with the DB
- `Jest` for testing
- `Vercel` for hosting

## Choosing the right ORM

You may have noticed that Prisma is striken-hrough, it was my first choice as I have previously worked with it, but unfortunately I found a lot of issues using it in this project. Not only I am using server actions, but I am hosting my project on Vercel. I was able to make Prisma work locally, but not when the app got deployed to Vercel. I had to switch to a new ORM for me, which was Drizzle ORM

## Development journey

1. Initiate a new Next.js project
1. Downgrade `React` and `ReactDOM` to version `18.x.x` because of dependencies issues with `ShadCN UI` design library
1. Implement the UI for: add Todo form, Todo item, Todo Listing, add Todo button
1. Configure Frontend state management for all Todos and newly added Todo
1. Attempt to install `Prisma` and try to make it work on local and Vercel, it was successful on local but not on Vercel
1. Regress from using Prisma
1. Install `Drizzle ORM` instead and ensure it was properly working on local and Vercel
1. Implement server actions such as: get all Todos, add Todo, delete Todo, update Todo, toggle Todo completion, and wire all the actions to the Frontend
1. Improve Todo item rendering by taking into consideration it's status
1. Implement filtering and sorting Todos UI
1. Major refactoring: centralize all calculation functions inside the `/lib` folder, first of all for concerns separation, then also for cleaner implementation of tests
1. install `Jest` and write unit tests

## Improvements

- Prevent spam toggle completion on a Todo
- Improve Todo add/edit form validation (use some external validation package like `Zod`)
- Use global state as it becomes tedious to pass props between parent component <-> child components (something like `Zustand`)
- Add more unit tests
- Add integration and E2E tests

## Last words

I enjoyed working on this project =), it gave me the ability to put together my expertise, also apply my knowledge of working with server actions instead of the traditional REST API approach, I also had the chance to learn how to work with Drizzle ORM
