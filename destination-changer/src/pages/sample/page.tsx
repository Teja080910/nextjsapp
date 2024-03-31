import { useState } from 'react';
import Link from 'next/link';
import styles from './Menu.module.css'; // Example CSS module

const Sample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.menu}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <span className={styles.icon}></span>
        <span className={styles.icon}></span>
        <span className={styles.icon}></span>
      </button>
      {isOpen && (
        <div className={styles.menuItems}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sample;
