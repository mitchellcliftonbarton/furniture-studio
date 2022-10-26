import { useState } from "react"

// Styles
import styles from '../styles/Blocks.module.scss'

const CharacterGrid = ({ font }) => {
  const { fontStyles } = font

  const [currentFont, setCurrentFont] = useState(0)

  const handleChange = (event) => {
    const fontIndex = fontStyles.findIndex(font => font.name === event.target.value)

    setCurrentFont(fontIndex)
  }

  return (
    <div className={`mb-32 lg:mb-60`}>
      <div className="controls flex mb-10">
        <select 
          className={`${styles.select} text-md w-full lg:w-1/4`} 
          name="weight" 
          id="weight"
          onChange={handleChange}
          value={fontStyles[currentFont].name}
        >
          {fontStyles.map((style, index) => (
            <option
              value={style.name}
              key={index}
            >{style.name}</option>
          ))}
        </select>
      </div>

      <div className="fonts">
        {fontStyles.map((style, index) => {
          const allCharacters = []

          style.characterBlocks.forEach(block => {
            block.characters.forEach(character => {
              allCharacters.push(character)
            })
          })

          const family = `${style.cssFamily} ${style.name}`

          return (
            <div 
              className={`${currentFont === index ? 'flex flex-wrap' : 'hidden'}`} 
              key={index}
            >
              {allCharacters.map((character, idx) => (
                <span 
                  key={idx} 
                  className={`${styles.character} mb-3 flex justify-center items-start`} 
                  style={{
                    fontFamily: family,
                    lineHeight: '1.2',
                    fontSize: '2.4rem'
                  }}
                >{character}</span>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CharacterGrid