import ThemeSwitch from './components/ThemeSwitch'

const themes = [
  { id: 'light', name: 'Светлая', bg: '#ffffff', text: '#1e293b', accent: '#0ea5e9' },
  { id: 'dark', name: 'Тёмная', bg: '#1e293b', text: '#f1f5f9', accent: '#facc15' },
  { id: 'sea', name: 'Морская', bg: '#cffafe', text: '#164e63', accent: '#0891b2' },
  { id: 'sunset', name: 'Закат', bg: '#ffedd5', text: '#7c2d12', accent: '#ea580c' }
]

const App = () => {
  return (
    <div className="container">
      <h1>Переключатель темы</h1>
      <p className="desc">Лабораторная работа №11, вариант 3</p>

      <ThemeSwitch title="Выберите тему оформления" themes={themes} />
    </div>
  )
}

export default App
