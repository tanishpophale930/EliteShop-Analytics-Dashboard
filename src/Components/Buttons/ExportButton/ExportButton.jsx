import React, { useState } from 'react';
import './ExportButton.css';

const ExportButton = ({ exportToExcel }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    // Optionally reset the animation after a delay
    setTimeout(() => {
      setIsClicked(false);
    }, 2000); // Duration should match your animation time.

    // Here you can handle the download functionality (e.g., export table to Excel)
    exportToExcel();
  };

  return (
    <div>
      <button className={`botao ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mysvg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Interface / Download">
              <path
                id="Vector"
                d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </g>
        </svg>
        {/* 
        <span className="texto">Download</span>
        */}
      </button>
    </div>
  );
};

export default ExportButton;
