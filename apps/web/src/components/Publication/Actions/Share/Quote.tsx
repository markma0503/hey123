import { Menu } from '@headlessui/react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import type { Publication } from '@hey/lens';
import cn from '@hey/ui/cn';
import { Trans } from '@lingui/macro';
import type { FC } from 'react';
import { useGlobalModalStateStore } from 'src/store/modals';
import { usePublicationStore } from 'src/store/publication';

interface QuoteProps {
  publication: Publication;
}

const Quote: FC<QuoteProps> = ({ publication }) => {
  const isMirror = publication.__typename === 'Mirror';
  const publicationType = isMirror
    ? publication.mirrorOf.__typename
    : publication.__typename;

  const setShowNewPostModal = useGlobalModalStateStore(
    (state) => state.setShowNewPostModal
  );
  const setQuotedPublication = usePublicationStore(
    (state) => state.setQuotedPublication
  );

  return (
    <Menu.Item
      as="div"
      className={({ active }) =>
        cn(
          { 'dropdown-active': active },
          'm-2 block cursor-pointer rounded-lg px-4 py-1.5 text-sm'
        )
      }
      onClick={() => {
        setQuotedPublication(publication);
        setShowNewPostModal(true);
      }}
    >
      <div className="flex items-center space-x-2">
        <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
        <div>
          {publicationType === 'Comment' ? (
            <Trans>Quote comment</Trans>
          ) : (
            <Trans>Quote post</Trans>
          )}
        </div>
      </div>
    </Menu.Item>
  );
};

export default Quote;
