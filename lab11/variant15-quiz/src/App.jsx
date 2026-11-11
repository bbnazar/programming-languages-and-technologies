import { useState } from 'react'
import QuestionCard from './components/QuestionCard'

const quiz = [
  { question: 'Сколько бит в одном байте?', answers: ['4', '8', '16', '32'], right: '8' },
  { question: 'Какой язык используется для стилей веб-страниц?', answers: ['HTML', 'Python', 'CSS', 'SQL'], right: 'CSS' },
  { question: 'Что означает аббревиатура CPU?', answers: ['Центральный процессор', 'Видеокарта', 'Оперативная память', 'Блок питания'], right: 'Центральный процессор' },
  { question: 'Какая команда SQL выбирает данные из таблицы?', answers: ['INSERT', 'DELETE', 'UPDATE', 'SELECT'], right: 'SELECT' },
  { question: 'Какое расширение у файлов React-компонентов?', answers: ['.jsx', '.exe', '.docx', '.png'], right: '.jsx' }
]

const App = () => {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)

  const finished = index >= quiz.length

  // ответ на вопрос — сразу переходим к следующему
  const handleAnswer = (answer) => {
    setAnswers([...answers, answer])
    if (answer === quiz[index].right) {
      setScore(score + 1)
    }
    setIndex(index + 1)
  }

  const handleSkip = () => {
    setAnswers([...answers, null])
    setIndex(index + 1)
  }

  const restart = () => {
    setIndex(0)
    setAnswers([])
    setScore(0)
  }

  return (
    <div className="container">
      <h1>Викторина по информатике</h1>
      <p className="desc">Лабораторная работа №11, вариант 15</p>

      {!finished && (
        <QuestionCard
          number={index + 1}
          count={quiz.length}
          data={quiz[index]}
          onAnswer={handleAnswer}
          onSkip={handleSkip}
        />
      )}

      {finished && (
        <div className="box">
          <h2>Результат: {score} из {quiz.length}</h2>

          <table className="results">
            <thead>
              <tr>
                <th>№</th>
                <th>Ваш ответ</th>
                <th>Правильный</th>
              </tr>
            </thead>
            <tbody>
              {quiz.map((q, i) => (
                <tr key={i} className={answers[i] === q.right ? 'ok' : 'wrong'}>
                  <td>{i + 1}</td>
                  <td>{answers[i] === null ? 'пропущен' : answers[i]}</td>
                  <td>{q.right}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={restart}>Начать заново</button>
        </div>
      )}
    </div>
  )
}

export default App
