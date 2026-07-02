import React, { useEffect, useState } from 'react'
import api from '../utils/axiosInstance'

const LocationSearchPanel = ({ activeField, inputValue, onSelectSuggestion, setPanelOpen, setvehiclePanel }) => {
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!activeField || inputValue.length < 3) {
      setSuggestions([])
      setError(null)
      return
    }

    const controller = new AbortController()
    const fetchSuggestions = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await api.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: inputValue },
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          signal: controller.signal,
        })

        setSuggestions(response.data || [])
      } catch (err) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setError('Failed to load suggestions')
          setSuggestions([])
        }
      } finally {
        setIsLoading(false)
      }
    }

    const timeout = setTimeout(fetchSuggestions, 250)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [activeField, inputValue])

  const handleSelect = (suggestion) => {
    onSelectSuggestion(suggestion.name)
    // setPanelOpen(false)
    // setvehiclePanel(true)
  }

  return (
    <div>
      {isLoading && <div className='px-3 py-4 text-sm text-gray-600'>Loading suggestions...</div>}
      {!isLoading && error && <div className='px-3 py-4 text-sm text-red-500'>{error}</div>}
      {!isLoading && !error && suggestions.length === 0 && activeField && inputValue.length >= 3 && (
        <div className='px-3 py-4 text-sm text-gray-600'>No suggestions found.</div>
      )}
      {!isLoading && !error && suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => handleSelect(suggestion)}
          className='border-2 p-3 rounded-xl border-gray-100 active:border-black flex gap-4 items-center my-4 justify-start cursor-pointer'
        >
          <h2 className='tex-lg font-medium bg-[#eee] h-5 w-5 flex items-center justify-center rounded-full'>
            <i className='ri-map-pin-4-fill text-xl bg-white'></i>
          </h2>
          <h4>{suggestion.name}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
