import EventCard from "./EventCard"
import './List.css';
import { Link } from 'react-router-dom'

const List = ({ partyState }) => {
  
  return (
    <section className="list">
      {
        partyState.map( party => <EventCard key={party._id} party={party} />)
      }
      <Link className="list_eventLink" to='/addevent'><span className="material-symbols-outlined plus-icon">add_circle</span></Link>
    </section>
  )
}

export default List