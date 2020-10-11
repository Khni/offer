/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

const Slide = ({ content }) => (
  <div
    css={css`
      height: 420px;
      width: 350px;
      background-image: url('${content}');
      background-size: 350px 420px;
      background-repeat: no-repeat;
      background-position: center;
      z-index: 10;
    `}
  />
)

export default Slide
