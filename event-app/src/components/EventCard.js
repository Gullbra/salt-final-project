import './EventCard.css';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

const EventCard = ({ party, partyState, setPartyState, yourParties, setYourParties }) => {
  const { user, isAuthenticated } = useAuth0();
  const { title, location, date, userID } = party


  const deleteThis = () => {
    axios.delete(`http://localhost:9000/events/${party._id}`)
      .then(() => {
        const partyIndex = yourParties.indexOf(party)
        const newYourParties = yourParties.slice()
        newYourParties.splice(partyIndex, 1)
        setYourParties(newYourParties)

        const newPartyState = partyState.slice()
        const bigIndex = partyState.indexOf(party)
        newPartyState.splice(bigIndex, 1)
        setPartyState(newPartyState)
      })
  }

  return (
    <article className="eventCard">
      <h2 className="eventCard__title">{title}</h2>
      <ul className='eventCard__list'>
        <li className='eventCard__location'>Location: {location}</li>
        <li className='eventCard__date'>Date: {date}</li>
      </ul>
      {isAuthenticated && userID === user.sub 
        ? <span onClick={deleteThis} className="material-symbols-outlined eventCard__delete">delete</span> 
        : null}
    </article>
  )
}

export default EventCard
