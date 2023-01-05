import { useState } from "react"
import copy from 'copy-to-clipboard'

const CopyPasteLink = ({ link }) => {
  const [buttonText, setButtonText] = useState(link.linkText)

  const handleClick = e => {
    e.preventDefault()

    copy(link.linkText)
    setButtonText('Copied!')

    setTimeout(() => {
      setButtonText(link.linkText)
    }, 1000)
  }

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer fade text-base break-all text-left pr-6 lg:pr-0"
    >{buttonText}</button>
  )
}

export default CopyPasteLink