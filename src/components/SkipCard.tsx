import wasteImage from '../../public/waste.jpg'
import type { WasteData } from '../lib/api/useGetWaste'
export interface Step {
  id: number
  name: string
  icon: string
  completed: boolean
  current?: boolean
}

export interface SkipCardProps {
  skip: WasteData
  isSelected: boolean
  onSelect: (skipId: number) => void
}
export function SkipCard({ skip, isSelected, onSelect }: SkipCardProps) {
  const handleCardClick = () => {
    if (skip.allowed_on_road) {
      onSelect(skip.id)
      console.log('Card clicked:', skip.id, 'Selected:', !isSelected)
    }
  }

  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg dark:hover:shadow-slate-700/25 rounded-lg border ${
        isSelected
          ? 'ring-2 ring-blue-600 shadow-lg dark:shadow-slate-700/25 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]'
          : 'hover:shadow-md dark:hover:shadow-slate-700/20 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:scale-[1.01]'
      } ${!skip.allowed_on_road ? 'opacity-60 cursor-not-allowed' : ''}`}
      onClick={handleCardClick}
    >
      {!skip.allowed_on_road && (
        <div className='absolute inset-0 bg-slate-900/20 dark:bg-slate-900/40 rounded-lg flex items-center justify-center z-10'>
          <div className='bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium'>
            Not Available On This Road
          </div>
        </div>
      )}
      {isSelected && (
        <div className='absolute -top-2 -right-2 z-10 bg-blue-600 text-white rounded-full shadow-lg animate-bounce h-6 w-6 flex items-center justify-center'>
          <span className='text-sm'>✓</span>
        </div>
      )}

      <div className='p-0'>
        <div className='relative'>
          <img
            src={wasteImage}
            alt={`${skip.size} skip`}
            className='w-full h-48 object-cover rounded-t-lg'
          />
          <div className='absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium'>
            {skip.size} Yards
          </div>
        </div>

        <div className='p-6'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-xl font-semibold text-slate-900 dark:text-slate-100'>
              {skip.size} Skip
            </h3>
            <div className='text-right'>
              <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                £{skip.price_before_vat}
              </div>
            </div>
          </div>

          <p className='text-sm text-slate-600 dark:text-slate-400 mb-2'>
            {skip.hire_period_days > 1
              ? `${skip.hire_period_days} days hire period`
              : `${skip.hire_period_days} day hire period`}
          </p>
          <p className='text-sm text-slate-700 dark:text-slate-300 mb-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
            explicabo?
          </p>

          <button
            onClick={handleCardClick}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              isSelected
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } ${!skip.allowed_on_road ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!skip.allowed_on_road}
          >
            {isSelected ? (
              <span className='flex items-center justify-center'>
                <span className='mr-2'>✓</span>
                <span className='font-bold'>SELECTED</span> - Click to Unselect
              </span>
            ) : (
              <span className='flex items-center justify-center'>
                Select This Skip
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
