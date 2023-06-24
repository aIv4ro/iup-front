import { useImageUploader } from '../hooks/use-image-uploader'
import { CopyToClipboardButton } from './copy-to-clipboard-button'
import { DropImagePlaceholder } from './drop-image-placeholder'

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
        {uploading &&
          <>
            <div>
              <svg aria-hidden='true' className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
                <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
              </svg>
            </div>
            <span>Uploading your image...</span>
          </>}
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
