import { useRef, useState } from "react"
import validator from 'email-validator'

// Styles
import styles from '../styles/Globals.module.scss'

const EmailSignup = ({currentTheme}) => {
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const [buttonText, setButtonText] = useState('Submit')

  const handleInputChange = () => {
    setInputValue(inputRef.current.value)
  }

  const subscribeUser = async (e) => {
    e.preventDefault()

    // check to see if entered email is valid
    const email = inputRef.current.value
    const emailIsValid = validator.validate(email)

    // if not valid, return
    if (!emailIsValid) {
      alert('Please enter a valid email address.')
      return
    }

    // if valid, make request to subscribe user
    setButtonText('Sending...')

    // this is where your mailchimp request is made
    const res = await fetch('/api/subscribe-user', {
      body: JSON.stringify({
        email: inputRef.current.value,
      }),

      headers: {
        'Content-Type': 'application/json',
      },

      method: 'POST',
    })

    const subscribeConfirm = await res.json()

    if (subscribeConfirm.message === 'Success') {
      setButtonText('Subscribed!')
      setInputValue('')

      setTimeout(() => {
        setButtonText('Submit')
      }, 1200)
    } else {
      console.error(subscribeConfirm.error)
      alert('There was an error subscribing to the newsletter. Hit us up at info@furniture.xyz and we’ll add you the old fashioned way.')
      setButtonText('Submit')
      setInputValue('')
    }
  }

  return (
    <form
      onSubmit={subscribeUser}
      className={`${styles.email} flex items-center`}
    >
      <input 
        ref={inputRef}
        type="text" 
        placeholder='Email Address'
        className={`${currentTheme === 2 ? 'text-center' : 'text-left'} required email text-base text-grey-dark w-full py-4 px-6 mr-def`}
        autoCapitalize="off"
        autoCorrect="off"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="text-base py-4 px-6"
      >{buttonText}</button>
    </form>
  )
}

export default EmailSignup