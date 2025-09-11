import { useState, useEffect } from 'react'

// Styles
import styles from '../styles/Blocks.module.scss'

// Components
import { LeftAlignment, CenterAlignment, OneColumn, TwoColumn, ThreeColumn } from './icons/Icons'

const TypeTester = ({ block, font }) => {
  const { fontStyles } = font
  const alignmentOptions = ['left', 'center']

  const columnOptions = [1, 2, 3]

  const [currentFont, setCurrentFont] = useState(0)
  const [currentFontSize, setCurrentFontSize] = useState(block.fontSize)
  const [currentAlignment, setCurrentAlignment] = useState(block.alignment)
  const [currentColumns, setCurrentColumns] = useState(parseInt(block.columns))

  useEffect(() => {
    if (block.defaultWeight) {
      const weight = fontStyles.findIndex((style) => style.name === block.defaultWeight)
      setCurrentFont(weight)
    }
  }, [block])

  const handleFontChange = (event) => {
    const fontIndex = fontStyles.findIndex((font) => font.name === event.target.value)

    setCurrentFont(fontIndex)
  }

  const handleSizeChange = (event) => {
    setCurrentFontSize(event.target.value)
  }

  return (
    <div className={`mb-32 lg:mb-60`}>
      <div className="controls flex items-start lg:items-center justify-between lg:justify-start flex-wrap lg:flex-nowrap mb-10 bg-grey-1 p-def-half">
        <select
          className={`${styles.select} text-base w-1/2 lg:w-1/4 lg:mr-8 mb-8 lg:mb-0`}
          name="weight"
          id="weight"
          onChange={handleFontChange}
          value={fontStyles[currentFont].name}
        >
          {fontStyles.map((style, index) => (
            <option
              value={style.name}
              key={index}
            >
              {style.name}
            </option>
          ))}
        </select>

        <input
          className={`${styles.range} lg:mr-12`}
          type="range"
          min="10"
          max="300"
          onChange={handleSizeChange}
          value={currentFontSize}
        />

        <div className={`${styles.alignment} flex items-center lg:mr-12`}>
          {alignmentOptions.map((option, index) => {
            switch (option) {
              case 'left':
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentAlignment(option)}
                    className={option === currentAlignment ? styles.active : null}
                  >
                    <LeftAlignment />
                  </button>
                )
              case 'center':
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentAlignment(option)}
                    className={option === currentAlignment ? styles.active : null}
                  >
                    <CenterAlignment />
                  </button>
                )
            }
          })}
        </div>

        <div className={`${styles.columns} flex items-center lg:mr-12`}>
          {columnOptions.map((option, index) => {
            switch (option) {
              case 1:
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentColumns(option)}
                    className={option === currentColumns ? styles.active : null}
                  >
                    <OneColumn />
                  </button>
                )
              case 2:
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentColumns(option)}
                    className={option === currentColumns ? styles.active : null}
                  >
                    <TwoColumn />
                  </button>
                )
              case 3:
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentColumns(option)}
                    className={option === currentColumns ? styles.active : null}
                  >
                    <ThreeColumn />
                  </button>
                )
            }
          })}
        </div>
      </div>

      <div
        className={`${styles.textarea} ignore-global-fonts`}
        style={{
          fontFamily: `${font.name} ${fontStyles[currentFont].name}`,
          fontSize: `${currentFontSize}px`,
          textAlign: currentAlignment,
          columnCount: currentColumns,
        }}
        contentEditable
        dangerouslySetInnerHTML={{ __html: block.placeholder }}
      ></div>
    </div>
  )
}

export default TypeTester
