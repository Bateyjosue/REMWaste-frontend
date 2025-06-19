import { useState, useEffect } from 'react'
import { RiCloseLine } from '@remixicon/react'
import wasteImage from '../../public/waste.jpg'
import type { WasteData } from '../lib/api/useGetWaste'

interface ModalProps {
  selectedSkip: WasteData | undefined
  onClose: () => void
  onDeselect?: () => void
  isVisible: boolean
}

export function Modal({ selectedSkip, onClose, isVisible }: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible && selectedSkip) {
      const timer = setTimeout(() => setIsAnimating(true), 100)
      document.body.style.overflow = 'hidden'
      return () => {
        clearTimeout(timer)
        document.body.style.overflow = ''
      }
    } else {
      setIsAnimating(false)
    }
  }, [isVisible, selectedSkip])

  if (!selectedSkip || !isVisible) return null

  const vatAmount = calculateVAT(selectedSkip.price_before_vat)
  const totalWithVAT = selectedSkip.price_before_vat + vatAmount
  const deliveryCost = calculateDelivery(selectedSkip.transport_cost, selectedSkip.per_tonne_cost)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='rounded-t-3xl shadow-2xl bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto'>
          {/* Handle */}
          <div className='flex justify-center pt-4 pb-2'>
            <div className='w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full' />
          </div>

          {/* Close Button */}
          <div className='absolute top-6 right-6 z-10'>
            <button
              onClick={onClose}
              className='w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-colors'
            >
              <RiCloseLine className='w-5 h-5 text-slate-600 dark:text-slate-400' />
            </button>
          </div>

          <div className='px-6 pb-8'>
            {/* Header */}
            <div className='text-center mb-8'>
              <div className='inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4'>
                <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                Skip Selected
              </div>
              <h2 className='text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2'>
                Ready to Continue?
              </h2>
              <p className='text-slate-600 dark:text-slate-400'>
                Review your selection and proceed to the next step
              </p>
            </div>

            {/* Selected Skip Card */}
            <div className='bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 border border-blue-200 dark:border-slate-600 mb-8'>
              <div className='flex items-center space-x-6'>
                <div className='relative'>
                  <img 
                    src={wasteImage} 
                    alt={`${selectedSkip.size} yard skip`}
                    className='w-20 h-20 rounded-xl object-cover'
                  />
                  <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                    <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                    </svg>
                  </div>
                </div>
                <div className='flex-1'>
                  <h3 className='text-xl font-bold text-slate-900 dark:text-slate-100 mb-1'>
                    {selectedSkip.size} Yard Skip
                  </h3>
                  <p className='text-slate-600 dark:text-slate-400 mb-2'>
                    {selectedSkip.hire_period_days} day{selectedSkip.hire_period_days > 1 ? 's' : ''} hire period
                  </p>
                  <div className='flex items-center space-x-4 text-sm'>
                    <span className='flex items-center text-green-600 dark:text-green-400'>
                      <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                      </svg>
                      Free delivery
                    </span>
                    <span className='flex items-center text-green-600 dark:text-green-400'>
                      <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                      </svg>
                      {selectedSkip.allows_heavy_waste ? 'Heavy waste OK' : 'Standard waste'}
                    </span>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
                    £{selectedSkip.price_before_vat}
                  </div>
                  <div className='text-sm text-slate-500 dark:text-slate-400'>
                    + VAT
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className='bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 mb-8'>
              <h4 className='font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center'>
                <svg className='w-5 h-5 mr-2 text-blue-600 dark:text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' />
                </svg>
                Price Breakdown
              </h4>
              <div className='space-y-3'>
                <div className='flex justify-between items-center py-2'>
                  <span className='text-slate-700 dark:text-slate-300'>Skip hire ({selectedSkip.hire_period_days} days)</span>
                  <span className='font-semibold text-slate-900 dark:text-slate-100'>£{selectedSkip.price_before_vat}</span>
                </div>
                <div className='flex justify-between items-center py-2'>
                  <span className='text-slate-700 dark:text-slate-300'>Delivery & Collection</span>
                  <span className='font-semibold text-green-600 dark:text-green-400'>
                    {typeof deliveryCost === 'string' ? deliveryCost : `£${deliveryCost}`}
                  </span>
                </div>
                <div className='flex justify-between items-center py-2'>
                  <span className='text-slate-700 dark:text-slate-300'>VAT (20%)</span>
                  <span className='font-semibold text-slate-900 dark:text-slate-100'>£{vatAmount}</span>
                </div>
                <div className='border-t border-slate-200 dark:border-slate-600 pt-3 mt-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-lg font-bold text-slate-900 dark:text-slate-100'>Total</span>
                    <span className='text-2xl font-bold text-blue-600 dark:text-blue-400'>£{totalWithVAT.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Info */}
            <div className='bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8'>
              <div className='flex items-start space-x-3'>
                <svg className='w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <div>
                  <h5 className='font-semibold text-amber-800 dark:text-amber-200 mb-1'>Important Information</h5>
                  <p className='text-sm text-amber-700 dark:text-amber-300'>
                    Next, we'll check if you need a permit for your location. This is required by law for skips placed on public roads.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <button
                onClick={onClose}
                className='flex-1 py-4 px-6 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 font-semibold rounded-xl transition-colors'
              >
                Change Selection
              </button>
              <button
                onClick={onClose}
                className='flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]'
              >
                Continue to Permit Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function calculateVAT(price: number): number {
  const vatRate = 0.2 // 20% VAT
  return parseFloat((price * vatRate).toFixed(2))
}

function calculateDelivery(transportCost: number | null, perTonneCost: number | null): number | string {
  if (!transportCost || !perTonneCost) return 'Free'
  return transportCost * perTonneCost
}