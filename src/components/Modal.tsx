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

  
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity ${
          isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='rounded-t-2xl shadow-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'>
          <div className='flex justify-center pt-3 pb-2'>
            <div className='w-12 h-1 bg-slate-300 dark:bg-slate-600 rounded-full' />
          </div>

          <div className='absolute top-4 right-4'>
            <button
              onClick={onClose}
              className='h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center'
            >
              <RiCloseLine />
            </button>
          </div>

          <div className='px-6 pb-6'>
            <div className='mb-6'>
              <div className='flex items-center justify-between mb-3'>
                <div>
                  <h3 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
                    Selected Skip
                  </h3>
                  <p className='text-lg text-slate-600 dark:text-slate-400'>
                    Ready to continue with your booking
                  </p>
                </div>
              </div>

              <div className='bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-16 h-16 bg-yellow-40k0 rounded-lg flex items-center justify-center'>
                      <img src={wasteImage} alt='' />
                    </div>
                    <div>
                      <h4 className='font-semibold text-slate-900 dark:text-slate-100 '>
                        {selectedSkip.size} Skip
                      </h4>
                      <p className='text-sm text-slate-600 dark:text-slate-400'>
                        {selectedSkip.hire_period_days} days hire period
                      </p>
                      <p className='text-xs text-slate-500 dark:text-slate-400 mt-1'>
                        Imagery and information shown may not reflect the exact
                        shape or size specification.
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                      £{selectedSkip.price_before_vat}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Price Breakdown</h4>
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Skip hire (14 days)</span>
              <span className="text-gray-900 dark:text-white">£{selectedSkip.price_before_vat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Delivery & Collection</span>
                  <span className="text-green-600 dark:text-green-400">
                    {
                      calculateDelivery(selectedSkip.transport_cost, selectedSkip.per_tonne_cost)
                    }
                </span>
              </div>
              <div className="border-t border-blue-200 dark:border-blue-700 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span className="text-gray-900 dark:text-white">Total (inc. VAT)</span>
                  <span className="text-blue-600 dark:text-blue-400">£{selectedSkip.price_before_vat - calculateVAT(selectedSkip.price_before_vat)}</span>
                </div>
              </div>
            </div>
          </div>

            <div className='md:flex md:flex-row md:items-center md:justify-between space-y-2  flex flex-col md:space-x-4'>
              <button
                onClick={onClose}
                className='bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 px-6 py-3 rounded-lg font-medium'
              >
                Back to Waste type
              </button>

              <button
                onClick={onClose}
                className=' bg-blue-600 hover:bg-blue-700 text-white p-3  text-base font-semibold rounded-lg'
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

// function to calculate delevery on transport_cost and per_tone_cost
function calculateDelivery(transportCost: number | null, perTonneCost: number | null): number | string {
  if (!transportCost || !perTonneCost) return 'Free'
  return '£' + transportCost * perTonneCost
}