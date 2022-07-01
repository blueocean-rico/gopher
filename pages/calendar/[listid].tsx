import type { NextPage, GetServerSideProps } from "next";
import { Calendar } from "@mantine/dates";
import { useRouter } from "next/router";
import {
  Modal,
  Button,
  Tooltip,
  Text,
  Title,
  Center,
  Space,
} from "@mantine/core";
import { useState } from "react";

const CalendarPage: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const [dates, setDates] = useState<Date[]>([]);
  const router = useRouter();
  console.log(router.query);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="">
        <Center>
          <Text size="xl">Select every day you are free</Text>
        </Center>
        <Space h="md" />
        <Center>
          <Calendar
            hideOutsideDates={true}
            month={new Date()}
            multiple
            value={dates}
            onChange={(dates) => setDates(dates)}
            allowLevelChange={false}
          />
        </Center>
        <Space h="xl" />
        <Center>
          <Button
            onClick={() => console.log(dates.map((date) => date.getDate()))}
            // This will need to make a req to a api route to add in the data to db
          >
            Submit availability
          </Button>
        </Center>
      </Modal>

      <Title order={2} align="center">
        {router.query.name}
      </Title>
      <Title order={4} align="center">
      </Title>
      <Calendar
        renderDay={(date) => (
          // We could use SSR to get a obj with (day): [people] then display that for whatever day you hover
          <Tooltip style={{ width: "100%" }} label="No one is free" withArrow>
            <Text style={{ width: "100%" }}>{date.getDate()}</Text>
          </Tooltip>
        )}
        hideOutsideDates={true}
        month={new Date()}
        value={new Date()}
        onChange={() => {}}
        fullWidth
        size="xl"
        allowLevelChange={false}
        styles={(theme) => ({
          cell: {
            border: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          },
          day: { borderRadius: 0, height: 70, fontSize: theme.fontSizes.lg },
          weekday: { fontSize: theme.fontSizes.lg },
          weekdayCell: {
            fontSize: theme.fontSizes.xl,
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[0],
            border: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
            height: 70,
          },
        })}
      />
      <Space h="xl" />
      <Space h="xl" />
      <Center>
        <Button onClick={() => setOpened(true)}>Fill out availability</Button>
      </Center>
      <Space h="xl" />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query)
  // For each user in the current list,
  // Query the calander table where user_id = current user
  // Return a array of the days + user for the current month (new Date())
  // add them all together and send that as props
  return {
    props: {},
    // {day: [users free], day: [users free]}
  };
};

export default CalendarPage;
