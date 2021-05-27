import { Layout } from 'src/components/Layout'
import { Map } from 'src/components/Map'

const Home = () => (
  <Layout
    main={
      <div className="flex">
        <div
          className="w-1/2 p-4 overflow-y-scroll"
          style={{ maxHeight: 'calc(100vh - 4rem)' }}
        >
          Places
        </div>
        <div className="w-1/2 p-4">
          <Map />
        </div>
      </div>
    }
  />
)

export default Home
