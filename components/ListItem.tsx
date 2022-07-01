import { useState } from 'react';
import {
  Stack,
  CloseButton,
  Box,
  Text,
  Paper,
  Modal,
  Group,
  ActionIcon,
} from '@mantine/core';
import { Pencil } from 'tabler-icons-react';
import { Avatar } from '@/components/index';
import type { ListItem, Member } from '@/types/index';
import { ListItemEdit } from '@/components/index';

export function ListItem({ item, small }: { item: ListItem; small: true });
export function ListItem({
  item,
  editable,
  members,
}: {
  item: ListItem;
  editable: boolean;
  small: boolean;
  members: Member[];
});
export function ListItem({
  item,
  editable,
  small,
  members,
}: {
  item: ListItem;
  editable?: boolean;
  small?: boolean;
  members?: Member[];
}) {
  const [opened, setOpened] = useState(false);

  const handleDelete = () => {
    fetch(`api/lists/${item.listId}/items`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listId: item.listId,
        // TODO: deal with logged in user
        createdBy: { id: 6 },
        eventType: 'delete',
        start: item,
        end: null,
      }),
    });
  };

  const handleEdit = (event) => {
    setOpened(true);
  };

  if (small) {
    console.log(item);
    return (
      <Text>
        ${item.name} ${item.price}
      </Text>
    );
  } else if (editable) {
    return (
      <Paper shadow="xs" p="xs" withBorder>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={`edit item`}
        >
          <ListItemEdit
            listId={item.listId}
            members={members}
            item={item}
            setOpened={setOpened}
          />
        </Modal>

        <Stack>
          <Group position="apart">
            {item.name}
            <Group>
              <ActionIcon variant="hover" onClick={handleEdit} size="sm">
                <Pencil strokeWidth={1} />
              </ActionIcon>
              <CloseButton variant="hover" onClick={handleDelete} />
            </Group>
          </Group>
          <Group>
            <Box>${item.price}</Box>
            {/*TODO: your price*/}
            <Box>${item.price}</Box>
            <Group>
              {item.users.map((user) => (
                <Avatar key={user.id} user={user} size="sm" />
              ))}
            </Group>
          </Group>
        </Stack>
      </Paper>
    );
  }
}
