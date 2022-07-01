import type { NextPage } from "next";
import {
  Group,
  Title,
  Image,
  ScrollArea,
  Button,
  Divider,
  Grid,
  Card,
  Text,
  Badge,
} from "@mantine/core";
import { useUser } from "@auth0/nextjs-auth0";

const UserProfile: NextPage = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      <Title>Hello {user?.given_name}</Title>
      <Grid>
        <Grid.Col>
          <Image
            src={user?.picture}
            width={50}
            height={50}
            radius="lg"
            alt="google profile image"
            withPlaceholder
          />
        </Grid.Col>
        <Grid.Col>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Nickname: {user.nickname}</Text>
          <Button>edit details</Button>
        </Grid.Col>
      </Grid>
      {/* <Divider />
      <Title order={3}>Households</Title>
       *
       *
       ***** These cards will be a map of the users households *****
       *
       *
      <div style={{ width: 340, margin: 50 }}>
        <Card shadow="sm" p="lg" radius="lg">
          <Card.Section>
            <Image
              src="https://seattlemag.com/sites/default/files/field/image/iStock-471370245.jpg"
              height={160}
              alt="Seattle"
            />
          </Card.Section>

          <Group position="apart" style={{ marginBottom: 5, marginTop: 10 }}>
            <Text weight={500}>Household name</Text>
            <Badge color="pink" variant="light">
              Default
            </Badge>
          </Group>

          <Text size="sm">Adress: abcd 123</Text>
          <Text size="sm">Housemates: abc, def, ghi</Text>
          <Text size="sm">Cart total: $123</Text>
          <Text size="sm">Your total: $123</Text>

          <Button
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
            Book classic tour now
          </Button>
        </Card>
      </div>
      <Divider /> */}
    </div>
  );
};

export default UserProfile;
