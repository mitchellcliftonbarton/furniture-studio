// React
import { useRef } from 'react'

// Styles
import styles from '../styles/Blocks.module.scss'

// Components
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const CharacterCarousel = ({ block, font }) => {
  const swiperRef = useRef(null)

  const { fontStyles } = font
  const selectedWeight = fontStyles.find(style => style.name === block.weight)

  if (!selectedWeight) {
    alert('No weight selected')
    return
  }

  const allCharacters = []

  selectedWeight.characterBlocks.forEach(block => {
    block.characters.forEach(character => {
      allCharacters.push(character)
    })
  })

  const handlePrev = () => {
    if (!swiperRef.current) return

    swiperRef.current.swiper.slidePrev()
  }

  const handleNext = () => {
    if (!swiperRef.current) return

    swiperRef.current.swiper.slideNext()
  }

  return (
    <div className={`mb-60 flex`}>
      <div
        className={`${styles.carousel} bg-grey-med relative w-full`}
        style={{
          backgroundColor: block.backgroundColor
        }}
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          allowTouchMove={false}
          className={styles['carousel-el']}
        >
          {allCharacters.map((character, index) => (
            <SwiperSlide key={index} className={`${styles.slide} flex justify-center items-center`}>
              {character}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute top-0 left-0 w-full h-full flex z-20">
          <button 
            className={`${styles['left-button']} w-1/2 h-full`} 
            onClick={handlePrev}
          ></button>
          <button
            className={`${styles['right-button']} w-1/2 h-full`}
            onClick={handleNext}
          ></button>
        </div>
      </div>
    </div>
  )
}

export default CharacterCarousel