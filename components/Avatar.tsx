import { Avatar as MantineAvatar } from '@mantine/core';
import type { User } from '@/types/index';

const Avatar = ({ user, size }: {user: User; size: 'xs' | 'sm' | 'md';}) => {
  return (
    <MantineAvatar src={user.picture} alt={user.nickname} radius="md" size={size}>
      {user.nickname.charAt(0)}
   </MantineAvatar>
  );
};

export default Avatar;
