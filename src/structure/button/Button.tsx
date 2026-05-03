import styles from './button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  children,
  className = '',
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {variant === 'primary' && <span className={styles.btnShine} />}
      {variant === 'secondary' && <span className={styles.btnShineSecondary} />}
    </button>
  );
};

export default Button;
