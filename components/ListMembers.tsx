import React, { useState } from "react";
import { Box, Paper, Stack, Title, Button, MultiSelect } from "@mantine/core";
import User from "@/components/User";
import type { Member, User as UserType } from "@/types/index";
import { X } from "tabler-icons-react";
import Image from "next/image";

export default function ListMembers({
  listId,
  users,
  members,
}: {
  listId: number;
  users: UserType[];
  members: Member[];
}) {
  const [addMember, setAddMember] = useState(false);
  const [addMembers, setAddMembers] = useState([]);

  const handleDeleteMember = async (member) => {
    const rawResponse = await fetch(`/lists/${listId}/members`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listId, users: [member] }),
    });
  };

  const handleRandomGoperClick = async () => {
    const ranGopherIndex = Math.floor(Math.random() * members.length);
    const rawResponse = await fetch(`/api/lists/${listId}/members`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listId, user: members[ranGopherIndex] }),
    });
  };

  const handleClaimGopher = async () => {
    // member needs to be current logged in memeber
    // const rawResponse = await fetch(`/api/lists/${listId}/members`, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ listId, user: member }),
    // });
  };

  const handleAddMemberClick = () => {
    setAddMember(true);
  };

  const handleConfirm = async () => {
    if (addMembers.length > 0) {
      const newMembers = users.filter((user) =>
        addMembers.includes(user.nickname)
      );
      const rawResponse = await fetch(`/api/lists/${listId}/members`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listId, users: newMembers }),
      });
    }
    setAddMembers([]);
    setAddMember(false);
  };

  return (
    <Paper>
      <Title order={2}>Members</Title>
      <Stack>
        {members.map((member) => (
          <Box key={member.id}>
            {member.gopher && (
              <Image
                src="/gopherIcon.png"
                width="10"
                height="10"
                alt="With default placeholder"
              />
            )}
            <User user={member} />
            <Button
              onClick={() => {
                handleDeleteMember(member);
              }}
              variant="default"
            >
              <X />
            </Button>
          </Box>
        ))}
        <Button onClick={handleAddMemberClick} variant="default">
          Add User
        </Button>
        {addMember && (
          <Stack>
            <MultiSelect
              label="Add Users:"
              placeholder="Select all that apply"
              value={addMembers}
              onChange={setAddMembers}
              data={users
                .filter(
                  (user) =>
                    !members.map((member) => member.id).includes(user.id)
                )
                .map((user) => user.nickname)}
            />
            <Button onClick={handleConfirm} variant="default">
              Confirm
            </Button>
          </Stack>
        )}
        <Button onClick={handleRandomGoperClick} variant="default">
          Randomize Gopher
        </Button>
        <Button onClick={handleClaimGopher} variant="default">
          Claim Gopher
        </Button>
      </Stack>
    </Paper>
  );
}
