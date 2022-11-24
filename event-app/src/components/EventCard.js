import './EventCard.css';
// import axios from 'axios'

const EventCard = ({ party }) => {

  const { title, location, date } = party

  // const deleteThis = () => {
  //   axios.delete(`http://localhost:9000/events/${_id}`)
  //     .then(res => console.log(res))
  // }

  return (
    <article className="eventCard">
      <h2 className="eventCard__title">{title}</h2>
      <ul className='eventCard__list'>
        <li className='eventCard__location'>{location}</li>
        <li className='eventCard__date'>{date}</li>
      </ul>
      {/* <span onClick={deleteThis} className="material-symbols-outlined eventCard__delete">delete</span> */}
    </article>
  )
}

export default EventCard