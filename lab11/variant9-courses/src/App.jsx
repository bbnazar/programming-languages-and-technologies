import { useState } from 'react'
import CourseCard from './components/CourseCard'
import CourseInfo from './components/CourseInfo'

const courses = [
  {
    id: 1,
    name: 'Python для начинающих',
    short: 'Основы языка Python с нуля',
    hours: 40,
    teacher: 'Ахметов А.С.',
    about: 'Переменные, условия, циклы, функции и работа с файлами. В конце курса — небольшой консольный проект.'
  },
  {
    id: 2,
    name: 'Веб-разработка',
    short: 'HTML, CSS и JavaScript',
    hours: 60,
    teacher: 'Ким Е.В.',
    about: 'Вёрстка страниц, адаптивный дизайн, основы JavaScript и работа с DOM. Итог — свой сайт-визитка.'
  },
  {
    id: 3,
    name: 'Базы данных',
    short: 'SQL и проектирование БД',
    hours: 36,
    teacher: 'Нурланова Г.Б.',
    about: 'Таблицы, связи, запросы SELECT, JOIN, группировка. Практика на MySQL.'
  },
  {
    id: 4,
    name: 'Компьютерные сети',
    short: 'Как устроен интернет',
    hours: 30,
    teacher: 'Сериков Д.М.',
    about: 'Модель OSI, IP-адресация, маршрутизация, настройка сети в Cisco Packet Tracer.'
  }
]

const App = () => {
  // выбранный курс (id) и список курсов, на которые записались
  const [selectedId, setSelectedId] = useState(null)
  const [myCourses, setMyCourses] = useState([])

  const selectedCourse = courses.find((c) => c.id === selectedId)

  const toggleEnroll = (id) => {
    if (myCourses.includes(id)) {
      setMyCourses(myCourses.filter((x) => x !== id))
    } else {
      setMyCourses([...myCourses, id])
    }
  }

  return (
    <div className="container">
      <h1>Каталог курсов</h1>
      <p className="desc">Лабораторная работа №11, вариант 9 · Записано курсов: {myCourses.length}</p>

      <div className="layout">
        <div className="course-list">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              name={course.name}
              short={course.short}
              hours={course.hours}
              selected={course.id === selectedId}
              enrolled={myCourses.includes(course.id)}
              onClick={() => setSelectedId(course.id)}
            />
          ))}
        </div>

        {selectedCourse ? (
          <CourseInfo
            course={selectedCourse}
            enrolled={myCourses.includes(selectedCourse.id)}
            onEnroll={() => toggleEnroll(selectedCourse.id)}
            onClose={() => setSelectedId(null)}
          />
        ) : (
          <div className="box empty">Выберите курс слева, чтобы посмотреть подробности</div>
        )}
      </div>
    </div>
  )
}

export default App
