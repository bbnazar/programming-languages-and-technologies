// Показывает, как выглядит выбранная тема. props: theme
const Preview = ({ theme }) => {
  const style = {
    background: theme.bg,
    color: theme.text
  }

  return (
    <div className="preview" style={style}>
      <h2>Тема: {theme.name}</h2>
      <p>Так будет выглядеть текст на странице с этой темой оформления.</p>
      <span className="preview-btn" style={{ background: theme.accent, color: theme.bg }}>
        Пример кнопки
      </span>
    </div>
  )
}

export default Preview
