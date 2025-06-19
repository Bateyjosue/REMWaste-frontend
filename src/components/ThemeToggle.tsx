import { RiMoonLine, RiSunLine } from '@remixicon/react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className='fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110'
    >
      <div className='relative'>
        {theme === 'dark' ? (
          <RiSunLine className='w-6 h-6 text-amber-500 transition-transform group-hover:rotate-12' />
        ) : (
          <RiMoonLine className='w-6 h-6 text-slate-600 transition-transform group-hover:-rotate-12' />
        )}
      </div>
    </button>
  )
}