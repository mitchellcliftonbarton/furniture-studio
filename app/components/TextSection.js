const TextSection = ({ block, font }) => {
  const { fontStyles } = font

  return (
    <div className={`mb-60 flex`}>
      <div 
        className="w-full lg:w-2/3 text-md lg:pr-20" 
        dangerouslySetInnerHTML={{ __html: block.text }}
      ></div>

      {block.showWeights && (
        <div className="w-full lg:w-1/3">
          {fontStyles.map((style, index) => {
            const family = `${style.cssFamily} ${style.name}`

            return (
              <p 
                key={index} 
                style={{
                  fontFamily: family,
                  fontSize: '2.5rem',
                  lineHeight: '1.2'
                }}
              >{style.name}</p>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TextSection