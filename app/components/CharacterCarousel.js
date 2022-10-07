// React
import { useRef } from 'react'

// Styles
import styles from '../styles/Blocks.module.scss'

// Components
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const CharacterCarousel = ({ block, font }) => {
  const swiperRef = useRef(null)

  const { slides } = block
  const { fontStyles } = font

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
          {slides.map((slide, index) => {
            const selectedWeight = fontStyles.find(style => style.name === slide.weight)

            if (!selectedWeight) {
              alert('No weight selected')
              return
            }

            const family = `${selectedWeight.cssFamily} ${selectedWeight.name}`

            return (
              <SwiperSlide className={`${styles.slide} relative`} key={index}>
                {slide.description ? (
                  <div className='flex items-start p-10'>
                    <div 
                      className="w-2/3 flex justify-center items-center" 
                      style={{ fontFamily: family }}
                    >
                      {slide.character}
                    </div>

                    <div 
                      className="w-1/3 text-md" 
                      dangerouslySetInnerHTML={{ __html: slide.description }}
                    ></div>
                  </div>
                ): (
                  <div 
                    className="flex justify-center items-center w-full h-full p-6" 
                    style={{ fontFamily: family }}
                  >
                    {slide.character}
                  </div>
                )}
              </SwiperSlide>
            )
          })}
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