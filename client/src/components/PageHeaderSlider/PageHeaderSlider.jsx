import { useState, useEffect } from "react"
import sliderImage1 from "../../images/header-banner.jpg"
import sliderImage2 from "../../images/slider-image2.jpg"
import sliderImage3 from "../../images/slider-image3.jpg"
import styles from "./PageHeaderSlider.module.scss"
import Nav from "../Nav/Nav"

const PageHeaderSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const sliderImages = [
    sliderImage1,
    sliderImage2,
    sliderImage3
  ]

  useEffect(() => {
    const interval = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % sliderImages.length
      setActiveIndex(nextIndex)
    }, 10000)

    return () => clearTimeout(interval)
  }, [activeIndex, sliderImages])

  const handleSelectImage = (index) => setActiveIndex(index)

  return(
    <div className={styles.pageHeaderSlider}>
      <Nav></Nav>
      <div className={styles.pageHeaderSliderContainer} style={{ transform: `translateX(-${activeIndex * 100}vw)` }}>
        {sliderImages.map((image, index) => (
          <img
            key={`sliderImage${index}`}
            src={image}
            alt={`sliderImage${index}`}
          />
        ))}
      </div>
      <div className={styles.pageHeaderSliderSelectImage}>
        {sliderImages.map((image, index) => (
          <div
            key={`selectSliderImage${index}`}
            onClick={() => handleSelectImage(index)}
            className={activeIndex === index ? styles.active : ""}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default PageHeaderSlider