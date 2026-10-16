function loadState(key, fallback) {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return fallback
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error('Could not load state', err)
    return fallback
  }
}
export default loadState