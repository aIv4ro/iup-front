import { useState } from 'react'

const imageFileTypeRegex = /^image\/.+/g

export function ImagePicker () {
  const [dragging, setDragging] = useState(false)

  const handleChange = evt => {
    console.log(evt)
  }

  const handleDragOver = evt => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  const handleDragEnter = evt => {
    evt.preventDefault()
    evt.stopPropagation()
    setDragging(true)
  }

  const handleDragLeave = evt => {
    evt.preventDefault()
    evt.stopPropagation()
    setDragging(false)
  }

  const handleDrop = evt => {
    setDragging(false)
    evt.preventDefault()
    evt.stopPropagation()
    const { files } = evt.dataTransfer
    console.log(files)
    if (files.length > 1) {
      console.warn('only first file will be take in count')
    }
    const [firstFile] = files
    if (firstFile == null) {
      console.error('can not save empty files')
      return
    }
    const { type } = firstFile
    if (!imageFileTypeRegex.test(type)) {
      console.error('file type doesnt match image')
      return
    }
    console.log('image is valid')
  }

  return (
    <div className='bg-gray-900 font-semibold py-10 px-20 rounded-md flex flex-col items-center justify-center gap-3'>
      <h4 className='text-xl'>Upload your image</h4>
      <small className='mb-5 '>File should be Jpeg, Png...</small>
      <div
        className='px-10 py-8 rounded-md overflow-hidden bg-gray-800 class flex flex-col justify-center items-center gap-4 relative'
      >
        <img src='/drop-image.svg' className='w-40' />
        <span>Drag & Drop your image here</span>
        <div
          id='draggable-area'
          onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
          className={`absolute inset-0 z-10 grid place-content-center transition-colors ${dragging && 'bg-gray-800'}`}
        >
          <svg xmlns='http://www.w3.org/2000/svg' className={`pointer-events-none transition-opacity opacity-0 ${dragging && 'opacity-100 animate-scale'}`} width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M15 8h.01' />
            <path d='M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5' />
            <path d='M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4' />
            <path d='M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54' />
            <path d='M16 19h6' />
            <path d='M19 16v6' />
          </svg>
        </div>
      </div>
      <span>Or</span>
      <label htmlFor='file-input' className='bg-blue-700 rounded-lg px-5 py-2 cursor-pointer hover:bg-blue-800 transition-colors'>
        Choose a file
      </label>
      <input id='file-input' type='file' className='hidden' accept='image/*' onChange={handleChange} />
    </div>
  )
}
