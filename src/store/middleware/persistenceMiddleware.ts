export const persistenceMiddleware =
  (keysToPersist: string[]) => store => next => action => {
    const result = next(action)

    const state = store.getState()
    keysToPersist.forEach(key => {
      localStorage.setItem(key, JSON.stringify(state[key]))
    })

    return result
  }
