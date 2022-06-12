import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Layout } from '../../components/Layout'
import { ProvideAuth } from '../../hooks/useAuth'

const TopPage = dynamic(() => import('../../components/TopPage'), {
  ssr: false,
})

const IndexPage: NextPage = () => {
  return (
    <Layout title="Koyomi - WaiWai Wiki">
      <ProvideAuth>
        <TopPage />
      </ProvideAuth>
    </Layout>
  )
}

export default IndexPage
