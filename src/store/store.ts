import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { transformersApiSlice } from "./slices/api/useTransformers"
import { persistenceMiddleware } from "./middleware/persistenceMiddleware"
import { selectedReducer } from "./slices/selectedSlice"

const rootReducer = combineSlices(transformersApiSlice, {
  selected: selectedReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const PERSISTED_KEYS: (keyof RootState)[] = ["selected"]

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(transformersApiSlice.middleware)
        .concat(persistenceMiddleware(PERSISTED_KEYS)),
    preloadedState,
  })
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch)
  return store
}

const loadPersistedState = <T extends keyof RootState>(
  keys: T[],
): Partial<RootState> => {
  const state: Partial<RootState> = {}
  keys.forEach(key => {
    try {
      const value = localStorage.getItem(key)
      if (value !== null) {
        state[key] = JSON.parse(value) as RootState[T]
      }
    } catch (e) {
      console.error(`Failed to parse persisted state for key "${key}":`, e)
      localStorage.removeItem(key)
    }
  })
  return state
}

const preloadedState = loadPersistedState(PERSISTED_KEYS)
export const store = makeStore(preloadedState)

type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
