import './EventCard.css';

const EventCard = ({ party }) => {

  const { title, desc } = party

  return (
    <article>
      <h1>{title}</h1>
      <p>{desc}</p>
    </article>
  )
}

export default EventCard