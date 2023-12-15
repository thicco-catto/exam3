import dynamic from 'next/dynamic'

const LazyMap = dynamic(() => import('./Map'), { ssr: false })

export const LazyMarker = dynamic(
  () => import('./MarkerWrapper'),
  { ssr: false }
)

export default LazyMap