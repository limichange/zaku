import { useEffect, useState } from 'react'
import { initialStateInterface } from '../pages/main/Editor/store/editorStore'

export default function useSubscribe(store: any) {
  const [storeData, setStateData] = useState(store.initialState)

  useEffect(() => {
    const sub = store.subscribe(setStateData)

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return [storeData, setStateData]
}
