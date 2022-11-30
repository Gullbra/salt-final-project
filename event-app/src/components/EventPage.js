import './EventPage.css'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

const EventPage = ({ party }) => {
  const { user } = useAuth0()

  const formatedDate = DateTime.fromISO(party.date)

  const editFunc = () => {

  }

  return (
    <section className="EventPage">
      <Link className="userProfile__listLink" to='/'>
        <span className="material-symbols-outlined back-icon">arrow_back_ios_new</span>
      </Link>

      <h2 className="EventPage__title">{party.title}</h2>
      <p>{party.desc}</p>
      <ul>
        <li className='EventPage__location'><span>Location:</span> {party.location}</li>
        <li className='EventPage__date'><span>Date:</span> {formatedDate.toLocaleString(DateTime.DATE_MED)}</li>
        <li className='EventPage__time'><span>Time:</span> {formatedDate.toLocaleString(DateTime.TIME_24_SIMPLE)}</li>
      </ul>

      <button type='button' onClick={editFunc}>button</button>

    </section>
  )
}

export default EventPage