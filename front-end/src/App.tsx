import { useState } from 'react'

import './styles/base.css'
import './styles/google-symbols.css'
import './styles/loading_spinner.css'
import {IEvent} from './util/typesAndInterfaces'

import Routing from './AppRouting'
import Layout from './AppLayout'

function App() {
  const [ eventState, setEventState ] = useState<IEvent[]>([]);

  return (
    <>
      <Layout>
        <Routing eventState={eventState} setEventState={setEventState}/>
      </Layout>
    </>
  );
}

export default App;
