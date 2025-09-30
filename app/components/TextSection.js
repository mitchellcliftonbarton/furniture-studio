const TextSection = ({ block, font }) => {
  const { fontStyles } = font || {}

  return (
    <div className={`mb-32 lg:mb-60 grid grid-cols-3 gap-x-20 gap-y-16`}>
      <div
        className="col-span-3 lg:col-span-2 text-base"
        dangerouslySetInnerHTML={{ __html: block.text }}
      ></div>

      {block.showWeights && fontStyles && fontStyles.length > 0 && (
        <div className={`${fontStyles.length > 12 ? 'grid grid-cols-2 col-span-3' : 'col-span-3 lg:col-span-1'}`}>
          {fontStyles.map((style, index) => {
            const family = `"${style.cssFamily} ${style.name}"`

            return (
              <p
                key={index}
                style={{
                  fontFamily: family,
                  fontSize: '2.5rem',
                  lineHeight: '1.2',
                }}
              >
                {style.name}
              </p>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TextSection
