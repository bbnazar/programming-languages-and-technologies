// Карточка одного вопроса. props: number, count, data, onAnswer, onSkip
const QuestionCard = ({ number, count, data, onAnswer, onSkip }) => {
  return (
    <div className="box">
      <div className="q-head">
        <span>Вопрос {number} / {count}</span>
        <button className="btn-light" onClick={onSkip}>Пропустить</button>
      </div>

      <h2 className="q-text">{data.question}</h2>

      <div className="q-answers">
        {data.answers.map((answer) => (
          <button key={answer} className="q-answer" onClick={() => onAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard
