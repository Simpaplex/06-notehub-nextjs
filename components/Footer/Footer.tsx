import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={styles.wrap}>
          <p>Developer: Olexander Hadion</p>
          <p>
            Contact us: <a href="mailto:gadion_alex@ukr.net"> gadion_alex@ukr.net</a>
          </p>
        </div>
      </div>
    </footer>
  );
  
}