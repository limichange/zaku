import { useLayoutEffect } from 'react'

export default function useSubscribe(store: any, setState: any) {
  useLayoutEffect(() => {
    const sub = store.subscribe(setState)

    return () => {
      sub.unsubscribe()
    }
  }, [])
}
