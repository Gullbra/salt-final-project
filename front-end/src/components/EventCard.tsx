import axios from 'axios'
import { Link } from 'react-router-dom';
// import { DateTime } from 'luxon'

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
    <Link 
      className='event-list__event-card' 
      to={`/events/${event._id}`}>
        
      <h2 className="event-card__title">
        {/* {title} */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi suscipit doloremque itaque illo laborum culpa iste quisquam dolores deleniti accusamus et tempore delectus omnis, provident placeat assumenda veniam. Eaque, cum.
      </h2>
      <p className='event-card__desc'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quia perferendis sequi, dolore maiores inventore quo accusamus aliquid necessitatibus tempore sint aut accusantium nihil soluta labore. Pariatur quia iusto repellat.</p>
    </Link>
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
