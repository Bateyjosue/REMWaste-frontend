import wasteImage from '/waste.jpg'
import type { WasteData } from '../lib/api/useGetWaste'

export interface SkipCardProps {
  skip: WasteData
  isSelected: boolean
  onSelect: (skipId: number) => void
}

export function SkipCard({ skip, isSelected, onSelect }: SkipCardProps) {
  const handleCardClick = () => {
    if (skip.allowed_on_road) {
      onSelect(skip.id)
    }
  }

  const isPopular = skip.size === 6 // Mark 6-yard as popular
  const isUnavailable = !skip.allowed_on_road

  return (
    <div className='relative group'>
      {/* Popular Badge */}
      {isPopular && (
        <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 z-20'>
          <div className='bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg'>
            Most Popular
          </div>
        </div>
      )}

      <div
        className={`relative cursor-pointer transition-all duration-300 rounded-2xl border-2 overflow-hidden ${
          isSelected
            ? 'border-blue-500 shadow-2xl shadow-blue-500/25 dark:shadow-blue-500/20 scale-[1.02] bg-white dark:bg-slate-800'
            : isUnavailable
            ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 opacity-60'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:scale-[1.01]'
        } ${!isUnavailable ? 'hover:shadow-lg' : 'cursor-not-allowed'}`}
        onClick={handleCardClick}
      >
        {/* Unavailable Overlay */}
        {isUnavailable && (
          <div className='absolute inset-0 bg-slate-900/20 dark:bg-slate-900/40 backdrop-blur-sm z-10 flex items-center justify-center'>
            <div className='bg-slate-800 dark:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg'>
              Not Available On This Road
            </div>
          </div>
        )}

        {/* Selection Indicator */}
        {isSelected && (
          <div className='absolute top-4 right-4 z-20'>
            <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse'>
              <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
              </svg>
            </div>
          </div>
        )}

        {/* Image Section */}
        <div className='relative h-48 overflow-hidden'>
          <img
            src={wasteImage}
            alt={`${skip.size} yard skip`}
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
          
          {/* Size Badge */}
          <div className='absolute bottom-4 left-4'>
            <div className='bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg'>
              <span className='text-2xl font-bold text-slate-900 dark:text-slate-100'>{skip.size}</span>
              <span className='text-sm text-slate-600 dark:text-slate-400 ml-1'>Yards</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className='p-6'>
          <div className='flex items-start justify-between mb-4'>
            <div>
              <h3 className='text-xl font-bold text-slate-900 dark:text-slate-100 mb-1'>
                {skip.size} Yard Skip
              </h3>
              <p className='text-slate-600 dark:text-slate-400 text-sm'>
                {skip.hire_period_days} day{skip.hire_period_days > 1 ? 's' : ''} hire period
              </p>
            </div>
            <div className='text-right'>
              <div className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
                £{skip.price_before_vat}
              </div>
              <div className='text-xs text-slate-500 dark:text-slate-400'>
                + VAT
              </div>
            </div>
          </div>

          {/* Features */}
          <div className='space-y-2 mb-6'>
            <div className='flex items-center text-sm text-slate-600 dark:text-slate-400'>
              <svg className='w-4 h-4 text-green-500 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
              Free delivery & collection
            </div>
            <div className='flex items-center text-sm text-slate-600 dark:text-slate-400'>
              <svg className='w-4 h-4 text-green-500 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
              {skip.allows_heavy_waste ? 'Heavy waste allowed' : 'Standard waste only'}
            </div>
            <div className='flex items-center text-sm text-slate-600 dark:text-slate-400'>
              <svg className='w-4 h-4 text-green-500 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
              Perfect for {getSkipUseCase(skip.size)} projects
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleCardClick}
            disabled={isUnavailable}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
              isSelected
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg'
                : isUnavailable
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
            }`}
          >
            {isSelected ? (
              <span className='flex items-center justify-center'>
                <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                Selected - Click to Change
              </span>
            ) : isUnavailable ? (
              'Not Available'
            ) : (
              'Select This Skip'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function getSkipUseCase(size: number): string {
  if (size <= 4) return 'small home clearance'
  if (size <= 6) return 'bathroom/kitchen renovation'
  if (size <= 8) return 'medium renovation'
  if (size <= 10) return 'large home renovation'
  return 'major construction'
}