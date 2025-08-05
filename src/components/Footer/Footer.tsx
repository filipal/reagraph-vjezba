
import styles from './Footer.module.scss'

export interface FooterProps {
  backText?: string;
  actionText: string;
  onBack: () => void;
  onAction: () => void;
  actionDisabled?: boolean;
  actionType?: 'primary' | 'black';
  topButtonText?: string;
  onTopButton?: () => void;
  topButtonDisabled?: boolean;
  topButtonType?: 'primary' | 'black';
  loadButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function Footer({
  backText = 'Back',
  actionText,
  onBack,
  onAction,
  actionDisabled = false,
  actionType = 'primary',
  topButtonText,
  onTopButton,
  topButtonDisabled = false,
  topButtonType = 'primary',
  loadButtonRef,
}: FooterProps) {
  return (
    <div className={styles.footer}>
      {topButtonText ? (
        <>
          <button
            ref={loadButtonRef}
            className={
              topButtonType === 'black'
                ? styles.buttonBlack
                : styles.footerTopButton
            }
            onClick={onTopButton}
            disabled={topButtonDisabled}
          >
            {topButtonText}
          </button>
          <div className={styles.footerActionsRow}>
            <button className={styles.buttonBack} onClick={onBack}>
              {backText}
            </button>
            <button
              className={
                actionType === 'black'
                  ? styles.buttonBlack
                  : styles.buttonPrimary
              }
              onClick={onAction}
              disabled={actionDisabled}
            >
              {actionText}
            </button>
          </div>
        </>
      ) : (
        <div className={styles.footerActions}>
          <button className={styles.buttonBack} onClick={onBack}>
            {backText}
          </button>
          <button
            className={
              actionType === 'black'
                ? styles.buttonBlack
                : styles.buttonPrimary
            }
            onClick={onAction}
            disabled={actionDisabled}
          >
            {actionText}
          </button>
        </div>
      )}
    </div>
  )
}