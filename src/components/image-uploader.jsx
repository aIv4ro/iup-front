import { useImageUploader } from '../hooks/use-image-uploader'
import { CopyToClipboardButton } from './copy-to-clipboard-button'
import { DropImagePlaceholder } from './drop-image-placeholder'
import { UploadingImagePlaceholder } from './uploading-image-placeholder'

const imageFileTypeRegex = /^image\/.+/g

export function ImageUploader () {
  const { ref, dragging, setDragging, upload, uploading, imageUrl } = useImageUploader()

  const showError = (err) => {
    console.error(err)
  }

  const handleChange = () => {
    const [file] = ref.current.files
    if (file) {
      upload(file)
    }
  }

  const handleDrop = evt => {
    setDragging(false)
    evt.preventDefault()
    evt.stopPropagation()
    const { files } = evt.dataTransfer
    const [firstFile] = files
    if (firstFile == null) {
      showError({ errorIdentifier: 'null-file', message: 'first file null' })
      return
    }
    const { type } = firstFile
    if (!imageFileTypeRegex.test(type)) {
      showError({ errorIdentifier: 'file-type', type })
      return
    }
    upload(firstFile)
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
  /*
  <div>
                       </div>
  */

  return (
    <div className='bg-gray-900 font-semibold py-10 px-20 rounded-md flex flex-col items-center justify-center gap-3'>
      <h4 className='text-xl'>Upload your image</h4>
      <small className='mb-5 '>File should be Jpeg, Png...</small>
      <div
        className='px-10 py-8 rounded-md overflow-hidden bg-gray-800 class flex flex-col justify-center items-center gap-4 relative'
      >
        {uploading && <UploadingImagePlaceholder />}
        {!uploading && <DropImagePlaceholder imageUrl={imageUrl} />}
        <div
          id='draggable-area'
          onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
          className={`absolute inset-0 z-10 grid place-content-center transition-colors [&>*]:pointer-events-none ${dragging && 'bg-gray-800'}`}
        >
          <svg xmlns='http://www.w3.org/2000/svg' className={`transition-opacity opacity-0 ${dragging && 'opacity-100 animate-scale'}`} width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
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
      <input ref={ref} id='file-input' type='file' className='hidden' accept='image/*' onChange={handleChange} />
      {imageUrl && <CopyToClipboardButton text={imageUrl} />}
    </div>
  )
}
