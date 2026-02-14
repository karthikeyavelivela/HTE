import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './badge.module.css';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'outline' | 'filled';
    skew?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'filled', skew = false, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(styles.badge, styles[variant], skew && styles.skew, className)}
                {...props}
            />
        );
    }
);
Badge.displayName = "Badge";

export { Badge };
