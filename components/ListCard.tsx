import {Card, Group, Title, Text, Badge, Button} from '@mantine/core';

export default function ListCard({ name, date, members }) {
  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
        <Title>
          Name: {name}
        </Title>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          members: xx, xx, xx
        </Text>

        <Badge color="pink" variant="light">
          current gopher: xx
        </Badge>

        <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
          view list
        </Button>
      </Card>
    </div>
  );
}