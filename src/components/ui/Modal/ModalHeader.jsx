import React from 'react';

export const ModalHeader = ({ title }) => {
  return (
    <div className="border-b border-white/40 p-2">
      <span className="text-3xl font-bold">{title}</span>
    </div>
  );
};
