import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { ProvideAuth } from '../hooks/useAuth'

const TopPage = dynamic(() => import('../components/TopPage'), { ssr: false })

const IndexPage: NextPage = () => {
  return (
    <ProvideAuth>
      <TopPage />
    </ProvideAuth>
  )
}

export default IndexPage
