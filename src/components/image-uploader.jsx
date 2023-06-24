import { toast } from 'react-hot-toast'
import { useImageUploader } from '../hooks/use-image-uploader'
import { CopyToClipboardButton } from './copy-to-clipboard-button'
import { DraggableArea } from './draggable-area'
import { DropImagePlaceholder } from './drop-image-placeholder'
import { UploadingImagePlaceholder } from './uploading-image-placeholder'

const imageFileTypeRegex = /^image\/.+/g

export function ImageUploader () {
  const { ref, upload, uploading, imageUrl } = useImageUploader()

  const handleChange = () => {
    const [file] = ref.current.files
    if (file) {
      upload(file)
    }
  }

  const handleDrop = evt => {
    const { files } = evt.dataTransfer
    const [firstFile] = files
    if (firstFile == null) {
      toast.error('One file at least is required')
      return
    }
    const { type } = firstFile
    if (!imageFileTypeRegex.test(type)) {
      toast.error('File type not suported, only images can be uploaded')
      return
    }
    upload(firstFile)
  }

  return (
    <div className='bg-gray-900 font-semibold py-10 px-20 rounded-md flex flex-col items-center justify-center gap-3'>
      <h4 className='text-xl'>Upload your image</h4>
      <small className='mb-5 '>File should be Jpeg, Png...</small>
      <div
        className='px-10 py-8 rounded-md overflow-hidden bg-gray-800 class flex flex-col justify-center items-center gap-4 relative'
      >
        {uploading && <UploadingImagePlaceholder />}
        {!uploading && <DropImagePlaceholder imageUrl={imageUrl} />}
        <DraggableArea onDrop={handleDrop} />
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
