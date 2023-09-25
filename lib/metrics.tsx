import { cache } from "react"
import { queryBuilder } from "./planetscale"

export const getViewsCount = cache(async () => {
  return queryBuilder.selectFrom("views").select(["slug", "count"]).execute()
})
