import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import styled, { ThemeProvider } from 'styled-components'
import useThemeStore from './store/useThemeStore'
import CounterDisplay from './components/CounterDisplay'
import CounterControls from './components/CounterControls'
import TodoIput from './components/TodoIput'
import TodoList from './components/TodoList'
 
const themes = {
  light: {
    backgroud: "#fff",
    text: "#333",
    primary: "#323dcd",
    secondary: "#f3f3f3",
    border: "#e7e7e7"
  }, 
  dark: {
    backgroud: "#1a1a1a",
    text: "#fff",
    primary: "#4650d6",
    secondary: "#2d2d2d",
    border: "#404040"
  }
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vh;
  padding: 40px;
  text-align: center;
  background: ${props => props.theme.backgroud};
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
`

const ThemeToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: ${props => props.theme.primary};
  color: white;
  cursor: pointer;

  &:hover{
    opacity: 0.9;
  }
`

const Seccion = styled.section`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: ${props => props.theme.secondary};
  border-radius: 8px;
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  margin-bottom: 20px;
`

function App() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  

  return (
    <ThemeProvider theme={themes[theme]}>
      <AppContainer>
        <ThemeToggleButton onClick={toggleTheme}>
          {theme === "light" ? "다크모드" : "라이트모드"}
        </ThemeToggleButton>

        <Seccion>
          <SectionTitle>Zustand로 전역 상태관리</SectionTitle>
          <CounterDisplay />
          <CounterControls />
        </Seccion>

        <Seccion>
          <SectionTitle>TodoList</SectionTitle>
          <TodoIput />
          <TodoList />
        </Seccion>
      </AppContainer> 
    </ThemeProvider>
  )
}

export default App
