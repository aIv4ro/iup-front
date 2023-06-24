import { Toaster } from 'react-hot-toast'
import { ImageUploader } from './components/image-uploader'

const toastOptions = { style: { background: '#111827', color: 'rgb(229 231 235)' } }

function App () {
  return (
    <>
      <main className='h-full grid place-content-center'>
        <ImageUploader />
      </main>
      <Toaster position='bottom-right' toastOptions={toastOptions} />
    </>
  )
}

export default App
