
import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  let color = '';

  if (percentage <= 33) {
    color = '#FF5E5E';
  } else if (percentage > 33 && percentage < 66) {
    color = '#0D99FF';
  } else {
    color = '#35C549';
  }

  const progressContainerStyle = {
    display: 'flex',
    alignItem: 'center',
    height: '5px',
    width: '100%',
    backgroundColor: 'lightgray',
    borderRadius: '5px',
    marginRight: '5px'
  };

  const progressBarStyle = {
    width: `${percentage}%`,
    backgroundColor: color,
    height: '100%',
    borderRadius: '5px',
  };



  const div = {
 
    alignItems: 'center',
  
  };

  return (
    <div className='d-flex' style={div}>
        <div className="progress-container" style={progressContainerStyle}>
            <div className="progress-bar" style={progressBarStyle} />
        
        </div>
        <span className="progress-text">{percentage}%</span>
    </div>
  
  );
};

export default ProgressBar;
