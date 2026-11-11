import { useState } from 'react'
import Preview from './Preview'

// props: title, themes (массив тем)
// state: selected (индекс выбранной темы), clicks (сколько раз меняли тему)
const ThemeSwitch = ({ title, themes }) => {
  const [selected, setSelected] = useState(0)
  const [clicks, setClicks] = useState(0)

  const chooseTheme = (index) => {
    setSelected(index)
    setClicks(clicks + 1)
  }

  const nextTheme = () => {
    // после последней темы возвращаемся к первой
    chooseTheme((selected + 1) % themes.length)
  }

  const reset = () => {
    setSelected(0)
    setClicks(0)
  }

  return (
    <div className="box">
      <h3 className="switch-title">{title}</h3>

      <div className="theme-list">
        {themes.map((theme, index) => (
          <button
            key={theme.id}
            className={index === selected ? 'theme-btn active' : 'theme-btn'}
            onClick={() => chooseTheme(index)}
          >
            {theme.name}
          </button>
        ))}
      </div>

      <Preview theme={themes[selected]} />

      <div className="switch-bottom">
        <span>Тему меняли: {clicks} раз</span>
        <div>
          <button onClick={nextTheme}>Следующая</button>{' '}
          <button className="btn-light" onClick={reset}>Сброс</button>
        </div>
      </div>
    </div>
  )
}

export default ThemeSwitch
