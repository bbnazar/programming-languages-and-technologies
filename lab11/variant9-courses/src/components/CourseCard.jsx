// Карточка курса в списке. Все данные приходят через props
const CourseCard = ({ name, short, hours, selected, enrolled, onClick }) => {
  return (
    <div className={selected ? 'card card-selected' : 'card'} onClick={onClick}>
      <div className="card-top">
        <b>{name}</b>
        {enrolled && <span className="mark">✔ записан</span>}
      </div>
      <p>{short}</p>
      <small>{hours} часов</small>
    </div>
  )
}

export default CourseCard
