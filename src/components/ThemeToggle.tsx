import { RiMoonLine, RiSunLine } from '@remixicon/react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className='fixed bottom-6 right-6 z-50 rounded-full h-12 w-12 shadow-lg flex items-center justify-center  bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-600'
    >
      <span className='text-xl'>
        {theme === 'dark' ? (
          <RiSunLine className='text-slate-200' />
        ) : (
          <RiMoonLine />
        )}
      </span>
    </button>
  )
}
