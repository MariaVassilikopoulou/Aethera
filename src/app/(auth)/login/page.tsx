
import LoginForm from '../../components/LoginForm';
import styles from './login.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.authWrapper}>
      <main className={styles.content}>
        <h1>Login</h1>
        <LoginForm />
      </main>
    </div>
  );
}
