/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

const Slide = ({ content }) => (
  <div
    css={css`
      height: 300px;
      width: 250px;
      background-image: url('${content}');
      background-size: 250px 300px;
      background-repeat: no-repeat;
      background-position: center;
    `}
  />
)

export default Slide
