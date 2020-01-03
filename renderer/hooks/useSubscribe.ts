import { useEffect } from 'react'

export default function useSubscribe(store: any, setState: any) {
  useEffect(() => {
    const sub = store.subscribe(setState)

    return () => {
      sub.unsubscribe()
    }
  }, [])
}
