import { Group, Paper, Stack, Text } from '@mantine/core';
import type { ListItemEvent, List } from '@/types/index';
import { ListItem } from '@/components/index';
import { ArrowRightBar } from 'tabler-icons-react';

export function Notification({
  event,
  list,
  lists,
}: {
  event: ListItemEvent;
  list?: List;
  lists?: List[];
}) {
  let verb: string;
  let connector: string;

  if (event.eventType === 'add') {
    verb = 'added';
    connector = 'to';
  } else if (event.eventType === 'delete') {
    verb = 'deleted';
    connector = 'from';
  } else if (event.eventType === 'modify') {
    verb = 'modified';
    connector = 'in';
  }

  //TODO change list name to be a link to the list
  return (
    <Paper shadow="xs" p="xs" withBorder>
      <Stack>
        <Group>
          <Text weight={700}>{event.createdBy.nickname}</Text>{' '}
            <Text>
            {verb} an item{' '}
            {list
              ? null
              : connector + ' ' + lists.find((l) => l.id === list.id).name}
          </Text>
        </Group>
        <Paper>
          <ListItem
            item={event.eventType !== 'add' ? event.start : event.end}
            small={true}
          />
          {event.eventType === 'modify' && (
            <>
              <ArrowRightBar strokeWidth={1} />
              <ListItem item={event.end} small={true} />
            </>
          )}
        </Paper>
      </Stack>
    </Paper>
  );
}
