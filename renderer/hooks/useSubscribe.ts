import { useEffect, useState } from 'react'
import { initialStateInterface } from '../store/editorStore'

export default function useSubscribe(store: any) {
  const [storeData, setStateData] = useState(store.state)

  useEffect(() => {
    const sub = store.subscribe(setStateData)

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return [storeData, setStateData]
}
