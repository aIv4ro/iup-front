export function ImagePicker () {
  return (
    <div className='bg-gray-900 font-semibold py-10 px-20 rounded-md flex flex-col items-center justify-center gap-3'>
      <h4 className='text-xl'>Upload your image</h4>
      <small className='mb-5 '>File should be Jpeg, Png...</small>
      <div className='px-10 py-8 rounded-md bg-gray-800 class flex flex-col justify-center items-center gap-4'>
        <img src='/drop-image.svg' className='w-40' />
        <span>Drag & Drop your image here</span>
      </div>
      <span>Or</span>
      <button className='bg-blue-700 rounded-lg px-5 py-2'>Choose a file</button>
    </div>
  )
}
