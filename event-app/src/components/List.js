import EventCard from "./EventCard"
import './List.css';

const List = ({ partyState }) => {
  
  return (
    <section className="list">
      {
        partyState.map( party => <EventCard key={party._id} party={party} />)
      }
    </section>
  )
}

export default List