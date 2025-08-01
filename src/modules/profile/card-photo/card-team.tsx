import { Button } from '@/components/button/button';
import { useLogout } from '@/hooks/use-logout';
import { useTranslation } from '@/libs/i18n';
import { AsteriskKey, KeyTwo, Logout } from '@icon-park/react';
import imgImage from '../assets/mock-profile.png';
import ChangePasswordDialog from '../components/change-password-dialog';
import ChangePinDialog from '../components/change-pin-dialog';
import LogoutDialog from '../components/logout-dialog';
import ProfileImage from './profile-image';

// Types
interface TeamCardProps {
  name?: string;
  image?: string;
  onUploadClick?: () => void;
  onPasswordChange?: () => void;
  onPinChange?: () => void;
  onLogout?: () => void;
}

// Constants
const CARD_STYLES = {
  container: 'bg-white rounded-2xl w-[258px]',
  content: 'p-6',
  nameContainer: 'flex flex-col items-center gap-1 w-full',
  nameText: 'font-semibold text-[#555555] text-center text-base leading-7',
  buttonContainer: 'flex flex-col gap-4 w-full',
  baseButton: 'w-full flex items-center gap-2',
  passwordButton: 'bg-white h-[38px] mt-2',
  pinButton: 'bg-white h-11',
  logoutButton: 'text-[#f08181] h-11',
};

// Reusable no-op function to prevent garbage collection
const NOOP = () => {};

/**
 * TeamCard Component
 *
 * A reusable profile card component that displays user information
 * and provides account management actions.
 *
 * Features:
 * - Profile image with upload functionality
 * - Change password dialog
 * - Change PIN dialog
 * - Logout functionality
 *
 * @param props - TeamCardProps
 * @returns JSX.Element
 */
export default function TeamCard({
  image,
  name = '',
  onUploadClick,
  onPasswordChange,
  onPinChange,
  onLogout,
}: TeamCardProps) {
  const logout = useLogout();
  const { t } = useTranslation();
  // Derived values
  const profileSrc = image || imgImage.src;

  // Use the same NOOP reference instead of creating new functions
  const handlePasswordChange = onPasswordChange || NOOP;
  const handlePinChange = onPinChange || NOOP;
  const handleLogout = onLogout || logout;

  return (
    <div className={CARD_STYLES.container}>
      <div className={CARD_STYLES.content}>
        {/* Profile Image Section */}
        <ProfileImage
          src={profileSrc}
          showUploadButton={true}
          onUploadClick={onUploadClick}
          className="mb-4"
        />

        {/* User Name Section */}
        <div className={CARD_STYLES.nameContainer}>
          <div className={CARD_STYLES.nameText}>{name}</div>
        </div>

        {/* Action Buttons Section */}
        <div className={CARD_STYLES.buttonContainer}>
          {/* Change Password Button */}
          <ChangePasswordDialog onConfirm={handlePasswordChange}>
            <Button
              variant="outline"
              className={`${CARD_STYLES.baseButton} ${CARD_STYLES.passwordButton}`}
            >
              <KeyTwo />
              {t('profile.userProfile.cardTeam.changePassword')}
            </Button>
          </ChangePasswordDialog>

          {/* Change PIN Button */}
          <ChangePinDialog onConfirm={handlePinChange}>
            <Button
              variant="outline"
              className={`${CARD_STYLES.baseButton} ${CARD_STYLES.pinButton}`}
            >
              <AsteriskKey />
              {t('profile.userProfile.cardTeam.changePin')}
            </Button>
          </ChangePinDialog>

          {/* Logout Button */}
          <LogoutDialog onConfirm={handleLogout}>
            <Button
              variant="ghost"
              className={`${CARD_STYLES.baseButton} ${CARD_STYLES.logoutButton}`}
            >
              <Logout />
              {t('profile.userProfile.cardTeam.logout')}
            </Button>
          </LogoutDialog>
        </div>
      </div>
    </div>
  );
}
