import Image from 'next/image';
import Link from 'next/link';

import { fetchBuddyList } from '../lib/data';
import styles from './buddyListStyles.module.scss';

export default async function BuddyList() {
  let data = await fetchBuddyList() || { totalOnline: 0, buddies: [] };

  return (
    <div className={`window ${styles.buddywindow}`}>
      <div className="title-bar">
        <div className="title-bar-text">{process.env.CURRENT_USER_NAME}&apos;s Buddy List</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <div>
          Controls go here
        </div>
        <div className={styles.bannerimage}>
          <Image
            src='/aol_splash_image.png'
            alt='AOL Splash Image'
            width={0}
            height={0}
            sizes="100vw"
            className={styles.splashimage}
          />
        </div>
        <div className={styles.buddylistcontainer}>
          <ul className={`tree-view ${styles.buddyList}`}>
            <details open>
              <summary>Buddies ({data.totalOnline}/{data.buddies.length})</summary>
              <ul>
                {data.buddies.map((data: { userName: string, isOnline: boolean }, index) => (
                  <li key={index} id={data.userName}>
                    <Link href={`/${data.userName}`}>
                      <span className={data.isOnline ? styles.onlineusername : ''}>{data.userName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </ul>
        </div>
      </div>
    </div>
  )
}