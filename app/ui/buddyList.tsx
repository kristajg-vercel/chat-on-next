// 'use client';

// import { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from './buddyListStyles.module.scss';

export default function BuddyList() {
  return (
    <div className={`window ${styles.buddywindow}`}>
      <div className="title-bar">
        <div className="title-bar-text">Buddy List</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <Image
          src='/aol_splash_image.png'
          alt='AOL Splash Image'
          width={0}
          height={0}
          sizes="100vw"
          className={styles.splashimage}
        />
        Buddy list goes here
      </div>
    </div>
  )
}