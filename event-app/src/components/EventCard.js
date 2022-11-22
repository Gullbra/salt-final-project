import './EventCard.css';

const EventCard = ({ party }) => {

  const { title, desc } = party

  return (
    <article className="eventCard__article">
      <h1 className="eventCard__title">{title}</h1>
      <p className="eventCard__desc">{desc}</p>
    </article>
  )
}

export default EventCard