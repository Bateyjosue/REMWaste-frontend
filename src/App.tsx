import { Modal } from './components/Modal'
import { ProgressBarHeader } from './components/ProgressBarHeader'
import Skeleton from './components/Skeleton'
import { SkipCard } from './components/SkipCard'
import { ThemeToggle } from './components/ThemeToggle'
import { useSkipSelection } from './hooks/useSkipSelection'
import { useGetWaste } from './lib/api/useGetWaste'

function App() {
  const {
    selectedSkip,
    selectSkip,
    getSelectedSkip,
    isModalVisible,
    closeModal,
    openModal,
    deselectSkip,
  } = useSkipSelection()

  const { data, isLoading, error } = useGetWaste()
  const selectedSkipData = getSelectedSkip(data)

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      <ProgressBarHeader />
      
      {isLoading && <Skeleton />}

      {!isLoading && !error && (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          {/* Hero Section */}
          <div className='text-center mb-16'>
            <div className='inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6'>
              <span className='w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse'></span>
              Step 3 of 6 - Choose Your Skip Size
            </div>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight'>
              Find Your Perfect
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'>
                Skip Size
              </span>
            </h1>
            <p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed'>
              Choose from our range of skip sizes, each designed to handle different project needs. 
              All prices include delivery, collection, and 14-day hire period.
            </p>
          </div>

          {/* Skip Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16'>
            {data?.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip === skip.id}
                onSelect={selectSkip}
              />
            ))}
          </div>

          {/* Selected Skip Actions */}
          {selectedSkip && selectedSkipData && (
            <div className='fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 p-6 z-40'>
              <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
                <div className='flex items-center space-x-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg'>
                    {selectedSkipData.size}
                  </div>
                  <div>
                    <h3 className='font-semibold text-slate-900 dark:text-slate-100'>
                      {selectedSkipData.size} Yard Skip Selected
                    </h3>
                    <p className='text-sm text-slate-600 dark:text-slate-400'>
                      £{selectedSkipData.price_before_vat} • {selectedSkipData.hire_period_days} days hire
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <button
                    onClick={deselectSkip}
                    className='px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium transition-colors'
                  >
                    Change Selection
                  </button>
                  <button
                    onClick={openModal}
                    className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'
                  >
                    Continue to Permit Check
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Trust Indicators */}
          <div className='text-center mt-16 pt-8 border-t border-slate-200 dark:border-slate-700'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
              <div className='flex flex-col items-center'>
                <div className='w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-3'>
                  <svg className='w-6 h-6 text-green-600 dark:text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
                <h3 className='font-semibold text-slate-900 dark:text-slate-100 mb-1'>Free Delivery & Collection</h3>
                <p className='text-sm text-slate-600 dark:text-slate-400'>No hidden costs or surprise fees</p>
              </div>
              <div className='flex flex-col items-center'>
                <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-3'>
                  <svg className='w-6 h-6 text-blue-600 dark:text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <h3 className='font-semibold text-slate-900 dark:text-slate-100 mb-1'>14-Day Hire Period</h3>
                <p className='text-sm text-slate-600 dark:text-slate-400'>Plenty of time for your project</p>
              </div>
              <div className='flex flex-col items-center'>
                <div className='w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-3'>
                  <svg className='w-6 h-6 text-purple-600 dark:text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <h3 className='font-semibold text-slate-900 dark:text-slate-100 mb-1'>Licensed & Insured</h3>
                <p className='text-sm text-slate-600 dark:text-slate-400'>Fully compliant waste disposal</p>
              </div>
            </div>
            <p className='text-sm text-slate-500 dark:text-slate-400 max-w-4xl mx-auto mt-8 leading-relaxed'>
              All imagery and information shown may not reflect the exact shape or size specification. 
              Prices shown are before VAT. Final pricing will be confirmed during checkout.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className='min-h-[60vh] flex items-center justify-center px-4'>
          <div className='text-center max-w-md'>
            <div className='w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6'>
              <svg className='w-8 h-8 text-red-600 dark:text-red-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3'>
              Unable to Load Skip Options
            </h2>
            <p className='text-slate-600 dark:text-slate-400 mb-6'>
              We're having trouble connecting to our services. Please check your internet connection and try again.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors'
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <ThemeToggle />

      <Modal
        selectedSkip={selectedSkipData}
        onClose={closeModal}
        onDeselect={deselectSkip}
        isVisible={isModalVisible}
      />
    </div>
  )
}

export default App