import { useState } from 'react';
import { Paper, ScrollArea, Button } from '@mantine/core';
import { Notification } from '@/components/index';
import type { List, ListItemEvent } from '../types';

export function Notifications({
  events,
  lists,
}: {
  events: ListItemEvent[];
  lists: List[];
}) {
  const [displayCount, setDisplayCount] = useState(10);

  return (
    <Paper>
      <ScrollArea>
        {events.slice(0, displayCount).map((event) => (
          <Notification
            key={event.id}
            event={event}
            list={lists.find((list) => list.id === event.listId)}
          />
        ))}
        <Button onClick={() => setDisplayCount(displayCount + 5)}>
          See More
        </Button>
      </ScrollArea>
    </Paper>
  );
}
