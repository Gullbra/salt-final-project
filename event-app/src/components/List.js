import EventCard from "./EventCard"
import './List.css';
import { Link } from 'react-router-dom'

const List = ({ partyState, setPartyState, yourParties, setYourParties, showDelBtn }) => {
  
  const partiesToShow = yourParties ? yourParties : partyState

  return (
    <section className={`list${showDelBtn ? ' list--profile' : ''}`}>
      {
        partiesToShow.map( (party, i) => (
          <EventCard 
            key={i} 
            party={party}
            showDelBtn={showDelBtn}
            partyState={partyState} 
            setPartyState={setPartyState} 
            yourParties={yourParties} 
            setYourParties={setYourParties}/>
        ))
      }
      <Link className="list_eventLink " to='/addevent'><span className="material-symbols-outlined plus-icon">add_circle</span></Link>
    </section>
  )
}

export default List