// import React from 'react'
import styled from '@emotion/styled'

const SliderContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: 420px;
  width: ${props => props.width}px;
  display: flex;
`
export default SliderContent