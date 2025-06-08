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

  const { data, isLoading } = useGetWaste()
  const selectedSkipData = getSelectedSkip(data)
  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-900'>
      <ProgressBarHeader />
      {isLoading && <Skeleton />}

      {!isLoading && (
        <div className='max-w-6xl mx-auto p-8 lg:p-8 lg:p-0'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl'>
              Choose Your Skip Size
            </h1>
            <p className='mt-3 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto'>
              Select the skip size that best suits your needs.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
            {data?.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip === skip.id}
                onSelect={selectSkip}
              />
            ))}
          </div>
          {selectedSkip && (
            <div className='flex justify-center mb-8'>
              <button
                onClick={deselectSkip}
                className='bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 px-6 py-4 rounded-lg font-medium'
              >
                Unselect {selectedSkipData?.size} Skip
              </button>
            </div>
          )}
          {selectedSkipData && !isModalVisible && (
            <div className='fixed bottom-6 left-0 right-0 flex justify-center z-30'>
              <button
                onClick={openModal}
                className='bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-6 py-4 rounded-lg'
              >
                View Selected Skip: {selectedSkipData.size} - £
                {selectedSkipData.price_before_vat}
              </button>
            </div>
          )}
          <div className='text-center'>
            <p className='text-sm text-slate-500 dark:text-slate-400 max-w-4xl mx-auto'>
              Imagery and information shown may not reflect the exact shape or
              size specification.
            </p>
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
