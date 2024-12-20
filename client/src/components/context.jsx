import { createContext, useContext, useState } from 'react'

const AppContext = createContext()
export const useGlobalContext = () => useContext(AppContext)

const getInitialTheme = () => {
  const theme = localStorage.getItem('theme') || 'light'
  return theme
}

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('/dashboard')

  const handleCurrentPage = (page) => {
    setCurrentPage(page)
    localStorage.setItem('page', page)
  }
  const [theme, setTheme] = useState(getInitialTheme())
  const [chart, setChart] = useState('Bar Chart')
  const handleChart = () => {
    chart === "Bar Chart" ? setChart("Area Chart") : setChart("Bar Chart")
    localStorage.setItem('chart', chart)
  }
  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        handleCurrentPage,
        theme,
        setTheme,
        chart,
        setChart,
        handleChart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
