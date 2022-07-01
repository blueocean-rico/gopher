import {
  Stack,
  CloseButton,
  Box,
  Text,
  Paper,
  Group,
  ActionIcon,
} from '@mantine/core';
import { Pencil } from 'tabler-icons-react';
import { Avatar } from '@/components/index';
import type { ListItem } from '@/types/index';

export function ListItem({ item, small }: { item: ListItem; small: true });
export function ListItem({
  item,
  editable,
}: {
  item: ListItem;
  editable: boolean;
});
export function ListItem({
  item,
  editable,
  small,
}: {
  item: ListItem;
  editable?: boolean;
  small?: boolean;
}) {
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
    //TODO make work with the listItemEdit
  };

  if (small) {
    console.log(item);
    return (
      <Text>
        Avatar {item.name}, ${item.price}
      </Text>
    );
  } else if (editable) {
    return (
      <Paper shadow="xs" p="xs" withBorder>
        <Stack>
          <Group position="apart">
            <Box>{item.name}</Box>
            <ActionIcon variant="hover" onClick={handleEdit}>
              <Pencil />
            </ActionIcon>
            <CloseButton variant="hover" onClick={handleDelete} />
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
