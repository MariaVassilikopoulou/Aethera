import React from 'react';
import classNames from 'classnames';
import styles from './styles/Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';

} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ size = 'md', variant = 'primary', children,   ...rest }: ButtonProps) {
    const btnClass = classNames(
      styles.button,
      styles[size],
      styles[variant]
    );
  
    return <button className={btnClass}{...rest}>{children}</button>;
  }