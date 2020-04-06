import dynamic from 'next/dynamic'

export default function() {
  let LogicEditor = dynamic(() => import('./LogicEditor'), {
    ssr: false
  })

  return <LogicEditor></LogicEditor>
}
