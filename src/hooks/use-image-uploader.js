import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

const url = 'https://api.cloudinary.com/v1_1/demo/image/upload'

export function useImageUploader () {
  const ref = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  const upload = file => {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'docs_upload_example_us_preset')
    fetch(url, { method: 'POST', body: formData })
      .then(res => res.json())
      .then(res => {
        const { url } = res
        setImageUrl(url)
        toast.success('Image uploaded successfully')
      })
      .catch(() => {
        toast.error('Unexpected error occoured uploading your image')
      }).finally(() => {
        setUploading(false)
      })
  }

  return { ref, upload, uploading, imageUrl }
}
