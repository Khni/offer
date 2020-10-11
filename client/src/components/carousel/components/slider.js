/** @jsx jsx */
import React, { useState, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/core'
import SliderContent from './SliderContent'
import Slide from './slide'

import Arrow from './Arrow'

import Dots from './Dots'

/**
 * @function Slider
 */
const Slider = props => {
	const autoPlayRef = useRef()

useEffect(() => {
  autoPlayRef.current = nextSlide
})

useEffect(() => {
    const play = () => {
      autoPlayRef.current()
    }

    const interval = setInterval(play, props.autoPlay * 1000)
    return () => clearInterval(interval)
  }, [])
	
  const getWidth = () => 350

  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.98
  })

  const { translate, transition, activeIndex } = state

  const nextSlide = () => {
    if (activeIndex === props.slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth()
    })
  }


const DotSet =(position) =>{
setState({
      ...state,
      activeIndex: position ,
      translate: position * getWidth()
    })
} 
  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (props.slides.length - 1) * getWidth(),
        activeIndex: props.slides.length - 1
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth()
    })
  }
  
  return (
    <div css={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * props.slides.length}
      >
        {props.slides.map((slide, i) => (
          <Slide key={slide + i} content={slide} />
        ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      <Dots slides={props.slides} activeIndex={activeIndex} DotSet={DotSet} />
    </div>
  )
}

const SliderCSS = css`
  position: relative;
  z-index: 100;
  height: 420px;
  width: 350px;
  margin: 0 auto;
  overflow: hidden;
`
export default Slider