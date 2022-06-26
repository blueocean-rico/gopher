import { Paper, List, Card, Stack } from '@mantine/core';
import TaskListItem from '../components/TaskListItem.tsx';
import TaskListAdd from '../components/TaskListAdd.tsx';

export default function TaskList({ tasks, members }) {

  return (
    <Paper
      sx={(theme) => ({
        width: 500,
      })}
    >
      <Stack>
        <TaskListAdd members={members} />
        {tasks.map((task) => (
          <TaskListItem key={task.id} item={task.name} members={task.members} />
        ))}
      </Stack>
    </Paper>
  );
}
