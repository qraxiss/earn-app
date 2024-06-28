import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

interface SlideUpPanelProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SlideUpPanel: React.FC<SlideUpPanelProps> = ({ show, onClose, children }) => {
  return (
    <div className={`slide-up-panel ${show ? 'show' : ''}`}>
      <div className="panel-body text-center d-flex flex-column align-items-center ">
        {children}
      </div>
    </div>
  );
};

export default SlideUpPanel;
