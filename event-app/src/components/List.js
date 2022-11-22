import EventCard from "./EventCard"
import './List.css';

const List = ({ partyState }) => {
  
  return (
    <section className="list__section">
      {
        partyState.map( party => <EventCard key={party._id} party={party} />)
      }
    </section>
  )
}

export default List