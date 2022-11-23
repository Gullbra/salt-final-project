import './EventCard.css';

const EventCard = ({ party }) => {

  const { title, location, date } = party

  return (
    <article className="eventCard">
      <h2 className="eventCard__title">{title}</h2>
      <ul className='eventCard__list'>
        <li className='eventCard__location'>{location}</li>
        <li className='eventCard__date'>{date}</li>
      </ul>
    </article>
  )
}

export default EventCard