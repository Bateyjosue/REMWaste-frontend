import { useState, useCallback } from 'react'
import type { WasteData } from '../lib/api/useGetWaste'

// TODO: move the skip option type to a separate file
export function useSkipSelection() {
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const selectSkip = useCallback(
    (skipId: number) => {
      if (selectedSkip === skipId) {
        setSelectedSkip(null)
        setIsModalVisible(false)
      } else {
        setSelectedSkip(skipId)
        setIsModalVisible(true)
      }
    },
    [selectedSkip]
  )

  const getSelectedSkip = useCallback(
    (skipOptions: WasteData[] | undefined) => {
      return skipOptions?.find((skip) => skip.id === selectedSkip)
    },
    [selectedSkip]
  )

  const closeModal = () => setIsModalVisible(false)
  const openModal = () => selectedSkip && setIsModalVisible(true)
  const deselectSkip = () => {
    setSelectedSkip(null)
    setIsModalVisible(false)
  }

  return {
    selectedSkip,
    selectSkip,
    getSelectedSkip,
    isModalVisible,
    closeModal,
    openModal,
    deselectSkip,
  }
}
