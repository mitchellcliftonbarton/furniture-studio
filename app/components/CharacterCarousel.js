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
  const { fontStyles } = font || {}

  const handlePrev = () => {
    if (!swiperRef.current) return

    swiperRef.current.swiper.slidePrev()
  }

  const handleNext = () => {
    if (!swiperRef.current) return

    swiperRef.current.swiper.slideNext()
  }

  return (
    <div className={`mb-32 lg:mb-60 flex`}>
      <div
        className={`${styles.carousel} bg-grey-med relative w-full`}
        style={{
          backgroundColor: block.backgroundColor,
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
            let selectedWeight =
              fontStyles && fontStyles.length > 0 ? fontStyles.find((style) => style.name === slide.weight) : null

            if (!selectedWeight && fontStyles && fontStyles.length > 0) {
              // default to first font style if there isnt one chosen
              selectedWeight = fontStyles[0]
            }

            if (!selectedWeight) {
              return null
            }

            const family = `${selectedWeight.cssFamily} ${selectedWeight.name}`

            return (
              <SwiperSlide
                className={`${styles.slide} relative`}
                key={index}
              >
                {slide.description ? (
                  <div className="flex items-start flex-wrap lg:flex-nowrap p-10 h-full">
                    <div
                      className={`${styles['character-slide']} order-2 lg:order-1 w-full lg:w-2/3 flex justify-center items-center h-full flex-1`}
                      style={{ fontFamily: family }}
                    >
                      {slide.character}
                    </div>

                    <div
                      className="order-1 lg:order-2 w-full lg:w-1/3 text-base flex-0-0 lg:flex-auto"
                      dangerouslySetInnerHTML={{ __html: slide.description }}
                    ></div>
                  </div>
                ) : (
                  <div
                    className={`${styles['character-slide']} flex justify-center items-center w-full h-full p-6`}
                    style={{ fontFamily: family }}
                  >
                    {slide.character}
                  </div>
                )}
              </SwiperSlide>
            )
          })}
        </Swiper>

        <div className="absolute bottom-0 lg:bottom-auto lg:top-0 left-0 w-full h-auto lg:h-full flex justify-between items-center z-20 p-12 lg:p-0">
          <button
            className={`${styles['left-button']} w-auto lg:w-1/2 h-auto lg:h-full`}
            onClick={handlePrev}
          >
            <svg
              className={styles['arrow-button']}
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.35355 1.35355C6.54882 1.15829 6.54882 0.841709 6.35355 0.646447C6.15829 0.451184 5.84171 0.451184 5.64645 0.646447L6.35355 1.35355ZM1 6L0.646447 5.64645C0.451184 5.84171 0.451184 6.15829 0.646446 6.35355L1 6ZM5.64645 11.3536C5.84171 11.5488 6.15829 11.5488 6.35355 11.3536C6.54882 11.1583 6.54882 10.8417 6.35355 10.6464L5.64645 11.3536ZM5.64645 0.646447L0.646447 5.64645L1.35355 6.35355L6.35355 1.35355L5.64645 0.646447ZM0.646446 6.35355L5.64645 11.3536L6.35355 10.6464L1.35355 5.64645L0.646446 6.35355Z"
                fill="#323232"
              />
            </svg>
          </button>
          <button
            className={`${styles['right-button']} w-auto lg:w-1/2 h-auto lg:h-full`}
            onClick={handleNext}
          >
            <svg
              className={styles['arrow-button']}
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.646447 10.6464C0.451184 10.8417 0.451184 11.1583 0.646447 11.3536C0.841709 11.5488 1.15829 11.5488 1.35355 11.3536L0.646447 10.6464ZM6 6L6.35355 6.35355C6.54882 6.15829 6.54882 5.84171 6.35355 5.64645L6 6ZM1.35355 0.646446C1.15829 0.451184 0.841708 0.451184 0.646446 0.646446C0.451184 0.841709 0.451184 1.15829 0.646446 1.35355L1.35355 0.646446ZM1.35355 11.3536L6.35355 6.35355L5.64645 5.64645L0.646447 10.6464L1.35355 11.3536ZM6.35355 5.64645L1.35355 0.646446L0.646446 1.35355L5.64645 6.35355L6.35355 5.64645Z"
                fill="#323232"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CharacterCarousel
