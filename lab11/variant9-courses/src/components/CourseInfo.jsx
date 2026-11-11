// Подробная информация о выбранном курсе
const CourseInfo = ({ course, enrolled, onEnroll, onClose }) => {
  return (
    <div className="box info">
      <h2>{course.name}</h2>
      <p>{course.about}</p>

      <table>
        <tbody>
          <tr>
            <td>Преподаватель:</td>
            <td>{course.teacher}</td>
          </tr>
          <tr>
            <td>Объём:</td>
            <td>{course.hours} ч.</td>
          </tr>
          <tr>
            <td>Статус:</td>
            <td>{enrolled ? 'Вы записаны' : 'Не записаны'}</td>
          </tr>
        </tbody>
      </table>

      <div className="info-buttons">
        <button onClick={onEnroll}>{enrolled ? 'Отменить запись' : 'Записаться'}</button>
        <button className="btn-light" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  )
}

export default CourseInfo
