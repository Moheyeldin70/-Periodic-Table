import React from 'react';
import { Droplets, Box, Wind } from 'lucide-react';
import { MatterState } from '../types/element';

interface StateIconProps {
  state: MatterState;
  className?: string;
}

export const StateIcon: React.FC<StateIconProps> = ({ state, className = 'w-3.5 h-3.5' }) => {
  if (state === 'liquid') {
    return <Droplets className={className} aria-hidden="true" />;
  }
  if (state === 'gas') {
    return <Wind className={className} aria-hidden="true" />;
  }
  return <Box className={className} aria-hidden="true" />;
};
