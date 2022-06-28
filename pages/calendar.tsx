import type { NextPage } from "next";
import { Calendar } from "@mantine/dates";
import { Modal, Button, Tooltip } from "@mantine/core";
import { useState } from "react";

const CalendarPage: NextPage = () => {
  const [value, setValue] = useState(new Date());
  const [opened, setOpened] = useState(false);
  const test = (e: Date) => {
    setValue(e);
    setOpened(true);
  };

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="">
        <div>People free on {value.toLocaleDateString("en-US")} [names]</div>
        {/* Here I need to get user data from the DB */}
        <Button>Change who is free</Button>
      </Modal>
      <Calendar
        renderDay={(date) => (
          // We could use SSR to get a obj with (day): [people] then display that for whatever day you hover
          <Tooltip style={{width: '100%'}} label="Name, Name" withArrow>
              <div style={{width: '100%'}}>{date.toLocaleDateString("en-US").split("/")[1]}</div>
          </Tooltip>
        )}
        hideOutsideDates={true}
        month={new Date()}
        value={value}
        onChange={test}
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
    </>
  );
};

export default CalendarPage;
