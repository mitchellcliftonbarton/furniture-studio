// React
import { useState, useRef } from 'react'

// Styles
import styles from '../styles/ProjectItem.module.scss'

// Components
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import DefImage from './DefImage'

const Carousel = ({ images, priority, title, noMargin, autoplayDuration }) => {
  const swiperRef = useRef(null)

  const [carouselIndex, setCarouselIndex] = useState(1)

  const handleSlideChange = (index, swiper) => {
    setCarouselIndex(index)
  }

  const handlePrev = () => {
    if (!swiperRef.current) return

    swiperRef.current.swiper.slidePrev()
  }

  const handleNext = () => {
    if (!swiperRef.current) return

    swiperRef.current.swiper.slideNext()
  }

  return (
    <div className={`project-item grid grid-cols-4 gap-4 ${noMargin ? '' : 'mb-28 lg:mb-40'} enter-in-1`}>
      <div className="project-item-inner col-span-4">
        <div className={`${styles.carousel} bg-grey-med mb-6 relative`}>
          {images.length > 0 && (
            <>
              <Swiper
                ref={swiperRef}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                allowTouchMove={true}
                onSlideChange={(swiper) => handleSlideChange(swiper.realIndex + 1, swiper)}
                className={styles['carousel-el']}
                modules={[EffectFade, Autoplay]}
                effect="fade"
                autoplay={{
                  delay: autoplayDuration ?? 5000,
                  disableOnInteraction: false,
                }}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    {image.type === 'video' ? (
                      <video
                        src={image.url}
                        className="object-cover object-center w-full h-full"
                        autoPlay
                        muted
                        playsInline
                        loop
                        preload="true"
                      ></video>
                    ) : (
                      <DefImage
                        src={image.url}
                        layout="fill"
                        objectFit={image.height > image.width ? 'contain' : 'cover'}
                        alt={image.alt}
                        priority={priority}
                      />
                    )}
                  </SwiperSlide>
                ))}

                {title && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
                    <h2 className="text-base text-black">{title}</h2>
                  </div>
                )}
              </Swiper>

              <div className="absolute top-0 left-0 w-full h-full hidden z-20">
                <button
                  className={`${styles['left-button']} w-1/2 h-full`}
                  onClick={handlePrev}
                ></button>

                <button
                  className={`${styles['right-button']} w-1/2 h-full`}
                  onClick={handleNext}
                ></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Carousel
