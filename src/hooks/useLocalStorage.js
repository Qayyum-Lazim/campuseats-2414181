
import { useEffect, useRef, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (!key) return initialValue

    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  const previousKey = useRef(key)

  useEffect(() => {
    if (previousKey.current !== key) {
      previousKey.current = key

      if (!key) {
        setValue(initialValue)
        return
      }

      try {
        const saved = localStorage.getItem(key)
        setValue(saved !== null ? JSON.parse(saved) : initialValue)
      } catch {
        setValue(initialValue)
      }

      return
    }

    if (!key) return

    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage errors
    }
  }, [key, value, initialValue])

  return [value, setValue]
}
