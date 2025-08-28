// React
import { useState, useRef } from 'react'

// Styles
import styles from '../styles/ProjectItem.module.scss'

// Components
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import DefImage from './DefImage'

// Lib
import classnames from 'classnames'

const Carousel = ({ images, priority }) => {
  const swiperRef = useRef(null)
  const descriptionRef = useRef(null)

  const [carouselIndex, setCarouselIndex] = useState(1)
  const [descriptionOpen, setDescriptionOpen] = useState(false)
  const [descriptionHeight, setDescriptionHeight] = useState(0)

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

  const toggleDescription = () => {
    if (descriptionOpen) {
      setDescriptionHeight(0)
    } else {
      const height = descriptionRef.current.clientHeight
      setDescriptionHeight(height)
    }

    setDescriptionOpen(!descriptionOpen)
  }

  return (
    <div className="project-item grid grid-cols-4 gap-4 mb-28 lg:mb-40 enter-in-1">
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
              </Swiper>

              <div className="absolute top-0 left-0 w-full h-full hidden lg:flex z-20">
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
