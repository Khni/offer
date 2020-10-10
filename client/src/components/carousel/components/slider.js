import React, { useState } from 'react'
import SliderContent from './SliderContent'

import { css, jsx } from '@emotion/core'

/**
 * @function Slider
 */
const Slider = () => {
	const getWidth = () => window.innerWidth
const [state, setState] = useState({
    translate: 0,
    transition: 0.45
  })
  const { translate, transition } = state

  
  return <div css={SliderCSS}><SliderContent
        translate={translate}
        transition={transition}
        width={getWidth()}
      >
        {/* */}
      </SliderContent></div>
}

const SliderCSS = css`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
`

export default Slider