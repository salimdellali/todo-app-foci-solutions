import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

// Create the connection
// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(process.env.DATABASE_URL!, { prepare: false })

// Create the DrizzleORM client
export const db = drizzle(client)
