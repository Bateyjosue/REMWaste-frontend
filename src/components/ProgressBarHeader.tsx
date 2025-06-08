import {
  RiMapPin2Line,
  RiDeleteBinLine,
  RiTruckLine,
  RiShieldLine,
  RiCalendarLine,
  RiBankCard2Line,
} from '@remixicon/react'
//TODO: refactor the component and use clsx
export interface ProgressStep {
  id: string
  name: string
  icon: React.ReactNode
  completed: boolean
  current: boolean
}
export interface ProgressBarProps {
  currentStep?: string
}
export function ProgressBarHeader() {
  const progressSteps: ProgressStep[] = [
    {
      id: 'postcode',
      name: 'Postcode',
      icon: <RiMapPin2Line className='w-4 h-4' />,
      completed: true,
      current: false,
    },
    {
      id: 'waste',
      name: 'Waste Type',
      icon: <RiDeleteBinLine className='w-4 h-4' />,
      completed: true,
      current: false,
    },
    {
      id: 'skip',
      name: 'Select Skip',
      icon: <RiTruckLine className='w-4 h-4' />,
      completed: false,
      current: true,
    },
    {
      id: 'permit',
      name: 'Permit Check',
      icon: <RiShieldLine className='w-4 h-4' />,
      completed: false,
      current: false,
    },
    {
      id: 'date',
      name: 'Choose Date',
      icon: <RiCalendarLine className='w-4 h-4' />,
      completed: false,
      current: false,
    },
    {
      id: 'payment',
      name: 'Payment',
      icon: <RiBankCard2Line className='w-4 h-4' />,
      completed: false,
      current: false,
    },
  ]
  return (
    <div className='sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 shadow-sm border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm'>
      <div className='max-w-6xl mx-auto py-6'>
        <div className='flex items-center'>
          <div className='flex items-center w-full justify-center'>
            {progressSteps.map(
              ({ id, completed, current, icon, name }, index) => (
                <div key={id} className='flex items-center'>
                  <div
                    className={`flex items-center space-x-1 ${
                      current
                        ? 'text-blue-600 dark:text-blue-400'
                        : completed
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200  ${
                        current
                          ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 shadow-lg shadow-blue-100 dark:shadow-blue-900/20'
                          : completed
                          ? 'border-green-600 dark:border-green-400 bg-green-50 dark:bg-green-900/30'
                          : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
                      } `}
                    >
                      {icon}
                    </div>
                    <span className='hidden sm:block font-medium text-sm'>
                      {name}
                    </span>
                  </div>
                  {index < progressSteps.length - 1 && (
                    <div
                      className={`hidden sm:block w-12 h-0.5 mx-1 transition-colors duration-200 ${
                        completed
                          ? 'bg-green-600 dark:bg-green-400'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
