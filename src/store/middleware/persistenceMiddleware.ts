import type { Middleware } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export const persistenceMiddleware =
  (keysToPersist: (keyof RootState)[]): Middleware<unknown, RootState> =>
  store =>
  next =>
  action => {
    const result = next(action)
    const state = store.getState()
    keysToPersist.forEach(key => {
      localStorage.setItem(String(key), JSON.stringify(state[key]))
    })
    return result
  }
