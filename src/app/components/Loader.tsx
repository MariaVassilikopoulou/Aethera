import styles from './styles/Loader.module.scss';

interface LoaderProps {
  fullscreen?: boolean;
}

export default function Loader({ fullscreen = false }: LoaderProps) {
  if (fullscreen) {
    return (
      <div className={styles.fullscreen}>
        <div className={styles.spinner} />
      </div>
    );
  }
  return (
    <div className={styles.inline}>
      <div className={styles.spinner} />
    </div>
  );
}
