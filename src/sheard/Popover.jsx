import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const Popover = ({ className, flag, children, onClose }) => {
  const popoverRef = useRef();

  useEffect(() => {
    if (!flag) return;

    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [flag, onClose]);

  if (!flag) {
    return null; // Return null if flag is false, so the Popover is not rendered
  }

  return (
    <div  className={`fixed inset-0  bg-black bg-opacity-20 backdrop-blur-md flex items-center justify-center ${className}`}>
      <div  className="relative bg-white rounded-xl p-4 shadow-lg w-5/6 h-auto ">
        {children}
      </div>
    </div>
  );
};

Popover.propTypes = {
  className: PropTypes.string,
  flag: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

Popover.defaultProps = {
  className: '',
};

