import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { TopLayout } from '../components/Layout'
import { ProvideAuth } from '../hooks/useAuth'

const TopPage = dynamic(() => import('../components/TopPage'), { ssr: false })

const IndexPage: NextPage = () => {
  return (
    <TopLayout title="WaiWai Wiki">
      <ProvideAuth>
        <TopPage />
      </ProvideAuth>
    </TopLayout>
  )
}

export default IndexPage
