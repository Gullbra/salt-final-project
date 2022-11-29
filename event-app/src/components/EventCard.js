import './EventCard.css';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

const EventCard = ({ party, partyState, setPartyState, yourParties, setYourParties, showDelBtn }) => {
  const { title, location, date } = party

  const deleteThis = () => {
    axios.delete(`http://localhost:9000/events/${party._id}`)
      .then(() => {
        if (yourParties) {
          const partyIndex = yourParties.indexOf(party)
          const newYourParties = yourParties.slice()
          newYourParties.splice(partyIndex, 1)
          setYourParties(newYourParties)
        }

        const bigIndex = partyState.findIndex(partyInState => partyInState._id === party._id)
        if (bigIndex !== -1) {
          const newPartyState = partyState.slice()
          newPartyState.splice(bigIndex, 1)
          setPartyState(newPartyState)
        } else {
          throw new Error('Can\'t find party in state')
        }
      })
  }

  return (
    <article className="eventCard">
      <h2 className="eventCard__title">{title}</h2>
      <ul className='eventCard__list'>
        <li className='eventCard__location'>Location: {location}</li>
        <li className='eventCard__date'>Date: {date}</li>
      </ul>
      {showDelBtn &&
        (<span onClick={deleteThis} className="material-symbols-outlined eventCard__delete">delete</span>)}
    </article>
  )
}

export default EventCard
