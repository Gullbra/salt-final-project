import './EventCard.css';
import axios from 'axios'
import partyimage from '../assets/partyimage.png'

const EventCard = ({ party }) => {

  const { title, location, date } = party

  // const deleteThis = () => {
  //   axios.delete(`http://localhost:9000/events/${_id}`)
  //     .then(res => console.log(res))
  // }

  return (
    <article className="eventCard">
      <div className="eventCard__card">
      <h2 className="eventCard__title">{title}</h2>
      <ul className='eventCard__list'>
        <li className='eventCard__location'>Location: {location}</li>
        <li className='eventCard__date'>Date & Time: {date}</li>
      </ul>
      {/* <span onClick={deleteThis} className="material-symbols-outlined eventCard__delete">delete</span> */}
      </div>
    </article>
  )
}

export default EventCard