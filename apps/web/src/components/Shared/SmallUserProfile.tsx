import {
  CheckBadgeIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/solid';
import type { Profile } from '@hey/lens';
import formatHandle from '@hey/lib/formatHandle';
import getAvatar from '@hey/lib/getAvatar';
import hasMisused from '@hey/lib/hasMisused';
import sanitizeDisplayName from '@hey/lib/sanitizeDisplayName';
import { Image } from '@hey/ui';
import cn from '@hey/ui/cn';
import { formatTime, getTwitterFormat } from '@lib/formatTime';
import isVerified from '@lib/isVerified';
import Link from 'next/link';
import type { FC } from 'react';
import { memo } from 'react';

import Slug from './Slug';

interface UserProfileProps {
  profile: Profile;
  timestamp?: Date;
  smallAvatar?: boolean;
}

const SmallUserProfile: FC<UserProfileProps> = ({
  profile,
  timestamp = '',
  smallAvatar = false
}) => {
  const UserAvatar = () => (
    <Image
      src={getAvatar(profile)}
      loading="lazy"
      className={cn(
        smallAvatar ? 'h-5 w-5' : 'h-6 w-6',
        'rounded-full border bg-gray-200 dark:border-gray-700'
      )}
      height={smallAvatar ? 20 : 24}
      width={smallAvatar ? 20 : 24}
      alt={formatHandle(profile?.handle)}
    />
  );

  const UserName = () => (
    <div className="flex max-w-full flex-wrap items-center">
      <div className="mr-2 max-w-[75%] truncate">
        {sanitizeDisplayName(profile?.name) ?? formatHandle(profile?.handle)}
      </div>
      {isVerified(profile.id) ? (
        <CheckBadgeIcon className="text-brand mr-1 h-4 w-4" />
      ) : null}
      {hasMisused(profile.id) ? (
        <ExclamationCircleIcon className="mr-2 h-4 w-4 text-red-500" />
      ) : null}
      <Slug
        className="text-sm"
        slug={formatHandle(profile?.handle)}
        prefix="@"
      />
      {timestamp ? (
        <span className="lt-text-gray-500">
          <span className="mx-1.5">·</span>
          <span className="text-xs" title={formatTime(timestamp as Date)}>
            {getTwitterFormat(timestamp)}
          </span>
        </span>
      ) : null}
    </div>
  );

  return (
    <Link href={`/u/${formatHandle(profile?.handle)}`}>
      <div className="flex items-center space-x-2">
        <UserAvatar />
        <UserName />
      </div>
    </Link>
  );
};

export default memo(SmallUserProfile);
