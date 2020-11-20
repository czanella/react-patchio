import React from 'react';

import styles from './styles.module.scss';

interface PatchProps {
  className?: string,
}

const Patch = ({ className } : PatchProps) => {
  return <div className={[styles.patch, className].join(' ')} />;
};

export default Patch;
