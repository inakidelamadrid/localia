// import {useQuery, gql} from '@apollo/client';
import {Layout} from 'src/components/Layout';
import {Map} from 'src/components/Map';

// const HELLO_QUERY = gql`
// query HelloQuery {
// hello
// }
// `;

const Home = () => {
  return (
    <Layout
      main={
        <div className="flex">
          <div
            className="w-1/2 p-4 overflow-y-scroll"
            style={{maxHeight: 'calc(100vh - 4rem)'}}>
            Places
          </div>
          <div className="w-1/2 p-4">
            <Map />
          </div>
        </div>
      }
    />
  );
};

export default Home;
