// eslint-disable-next-line react/prop-types
export function CopyToClipboardButton ({ text }) {
  const handleClick = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className='max-w-[40ch] p-3 bg-blue-600/5 rounded-md flex gap-3 items-center'>
      <div className='overflow-hidden whitespace-nowrap text-clip'>{text}</div>
      <button onClick={handleClick} className='transition-colors hover:bg-blue-700 p-2 rounded-full'>
        <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-copy' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z' />
          <path d='M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2' />
        </svg>
      </button>
    </div>
  )
}
