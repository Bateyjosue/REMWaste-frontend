import {
  RiMapPin2Line,
  RiDeleteBinLine,
  RiTruckLine,
  RiShieldLine,
  RiCalendarLine,
  RiBankCard2Line,
} from '@remixicon/react'

export interface ProgressStep {
  id: string
  name: string
  icon: React.ReactNode
  completed: boolean
  current: boolean
}

export function ProgressBarHeader() {
  const progressSteps: ProgressStep[] = [
    {
      id: 'postcode',
      name: 'Postcode',
      icon: <RiMapPin2Line className='w-5 h-5' />,
      completed: true,
      current: false,
    },
    {
      id: 'waste',
      name: 'Waste Type',
      icon: <RiDeleteBinLine className='w-5 h-5' />,
      completed: true,
      current: false,
    },
    {
      id: 'skip',
      name: 'Select Skip',
      icon: <RiTruckLine className='w-5 h-5' />,
      completed: false,
      current: true,
    },
    {
      id: 'permit',
      name: 'Permit Check',
      icon: <RiShieldLine className='w-5 h-5' />,
      completed: false,
      current: false,
    },
    {
      id: 'date',
      name: 'Choose Date',
      icon: <RiCalendarLine className='w-5 h-5' />,
      completed: false,
      current: false,
    },
    {
      id: 'payment',
      name: 'Payment',
      icon: <RiBankCard2Line className='w-5 h-5' />,
      completed: false,
      current: false,
    },
  ]

  return (
    <div className='sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        {/* Mobile Progress */}
        <div className='sm:hidden'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm font-medium text-slate-600 dark:text-slate-400'>
              Step 3 of 6
            </span>
            <span className='text-sm font-medium text-blue-600 dark:text-blue-400'>
              50% Complete
            </span>
          </div>
          <div className='w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2'>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500' style={{ width: '50%' }}></div>
          </div>
          <div className='mt-3 text-center'>
            <h3 className='font-semibold text-slate-900 dark:text-slate-100'>Select Skip</h3>
          </div>
        </div>

        {/* Desktop Progress */}
        <div className='hidden sm:block'>
          <div className='flex items-center justify-center'>
            {progressSteps.map(({ id, completed, current, icon, name }, index) => (
              <div key={id} className='flex items-center'>
                <div className='flex flex-col items-center'>
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      current
                        ? 'border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {completed && !current ? (
                      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                      </svg>
                    ) : (
                      icon
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium transition-colors ${
                    current
                      ? 'text-blue-600 dark:text-blue-400'
                      : completed
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {name}
                  </span>
                </div>
                {index < progressSteps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 transition-colors duration-300 ${
                      completed
                        ? 'bg-green-500'
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}