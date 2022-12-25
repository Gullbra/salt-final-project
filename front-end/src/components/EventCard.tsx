import axios from 'axios'
// import { DateTime } from 'luxon'
import { Link } from 'react-router-dom';

import '../styles/styling-EventCard.css'
import { IEvent } from '../util/typesAndInterfaces';

const EventCard = (
  //{ party, eventState, setPartyState, yourParties, setYourParties, showDelBtn }
  {event}:{event:IEvent}
  ) => {
  const { title } = event

  // const formatedDate = DateTime.fromISO(date)

  /*
  const deleteThis = event => {
    event.stopPropagation();
    event.preventDefault();
    axios.delete(`${process.env.REACT_APP_DOMAIN}/api/events/${party._id}`)
      .then(() => {
        if (yourParties) {
          const partyIndex = yourParties.indexOf(party)
          const newYourParties = yourParties.slice()
          newYourParties.splice(partyIndex, 1)
          setYourParties(newYourParties)
        }

        const bigIndex = eventState.findIndex(partyInState => partyInState._id === party._id)
        if (bigIndex !== -1) {
          const newPartyState = eventState.slice()
          newPartyState.splice(bigIndex, 1)
          setPartyState(newPartyState)
        } else {
          throw new Error('Can\'t find party in state')
        }
      })
  }
  */

  return (
    <>
      <div className='list__card'>
        <h2 className="eventCard__title">{title}</h2>
      </div>
    </>
    // <Link className="eventCard" to={`/events/${party._id}`}>
    //   <h2 className="eventCard__title">{title}</h2>
    //   <ul className='eventCard__list'>
    //     <li className='eventCard__location'>Location: {location}</li>
    //     <li className='eventCard__date'>{formatedDate.toLocaleString(DateTime.DATE_MED)}</li>
    //     <li className='eventCard__time'>Time: {formatedDate.toLocaleString(DateTime.TIME_24_SIMPLE)}</li>
    //   </ul>
    //   {showDelBtn &&
    //     (<span onClick={deleteThis} className="material-symbols-outlined eventCard__delete">delete</span>)}
    // </Link>
  )
}

export default EventCard
