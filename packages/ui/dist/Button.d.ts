import type { ReactNode } from 'react';
export interface ButtonProps {
    /** Button label. */
    children?: ReactNode;
    /** Click handler. */
    onClick?: () => void;
    /** Disabled state: muted background, no hover, not clickable. Defaults to false. */
    disabled?: boolean;
    /** Native button type. Defaults to "button". */
    type?: 'button' | 'submit' | 'reset';
}
export declare function Button({ children, onClick, disabled, type }: ButtonProps): import("react").JSX.Element;
