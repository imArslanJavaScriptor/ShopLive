import { useAuth, } from '@clerk/react'
import PageLoader from './components/PageLoader'
import Layout from './components/Layout'

function App() {

  const {isLoaded} = useAuth()

  if(!isLoaded) return <PageLoader/>
  
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <button className="btn btn-primary">Get Started</button>
        </div>
    </Layout>
  )
}

export default App