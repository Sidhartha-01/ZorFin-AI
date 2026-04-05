import React from 'react';
import './ZorfinCard.scss';

interface ZorfinCardProps {
  title: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const ZorfinCard: React.FC<ZorfinCardProps> = ({ title, extra, children, className = '' }) => {
  return (
    <div className={`zorfin-card ${className}`}>
      <div className="zorfin-card-header">
        <div className="zorfin-card-title">{title}</div>
        {extra && <div className="zorfin-card-extra">{extra}</div>}
      </div>
      <div className="zorfin-card-body">
        {children}
      </div>
    </div>
  );
};

export default ZorfinCard;
