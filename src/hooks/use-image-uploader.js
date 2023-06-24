import { useRef, useState } from 'react'

const url = 'https://api.cloudinary.com/v1_1/demo/image/upload'

export function useImageUploader () {
  const [dragging, setDragging] = useState(false)
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
      })
      .catch(err => {
        console.error(err)
      }).finally(() => {
        setUploading(false)
      })
  }

  return { ref, dragging, setDragging, upload, uploading, imageUrl }
}
