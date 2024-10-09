import React from 'react'
import "./NextArrowButton.css"

const NextArrowButton = ({onClick, disabled}) => {
  return (
    <div>
        <div class="button-container">
            <button class="button-3d" onClick={onClick} disabled={disabled}>
                <div class="button-top">
                <span class="material-icons">❯</span>
                </div>
                <div class="button-bottom"></div>
                <div class="button-base"></div>
            </button>
        </div>
    </div>
  )
}

export default NextArrowButton