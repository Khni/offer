/** @jsx jsx */

import { css, jsx } from '@emotion/core'


const Dot = ({ active, slides, slide,DotSet }) =>{ 
  
  
  
  return(
  <span onClick={()=> DotSet( slides.indexOf(slide))}
    css={css`
      padding: 10px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 50%;
      background: ${active ? 'black' : 'white'};
    `}
  />
  
)}

const Dots = ({ slides, activeIndex, DotSet}) => (
  <div
    css={css`
      position: absolute;
      bottom: 25px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  >
    {slides.map((slide, i) => (
      <Dot key={slide} active={activeIndex === i} DotSet={DotSet} slides={slides} slide={slide}/>
    ))}
  </div>
)

export default Dots