import React, { useState } from 'react';
import {
  Group,
  CloseButton,
  Box,
  Paper,
  Stack,
  Title,
  Button,
  MultiSelect,
} from '@mantine/core';
import { User } from '@/components/index';
import type { Member, User as UserType } from '@/types/index';
import Image from 'next/image';

export function ListMembers({
  listId,
  users,
  members,
}: {
  listId: number;
  users: UserType[];
  members: Member[];
}) {
  const [addMemberVisible, setAddMemberVisible] = useState(false);
  const [addMembers, setAddMembers] = useState([]);

  const handleDeleteMember = async (member) => {
    await fetch(`/lists/${listId}/members`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listId, users: [member] }),
    });
  };

  const handleRandomGopherClick = async () => {
    const randomGopherIndex = Math.floor(Math.random() * members.length);
    await fetch(`/api/lists/${listId}/members`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listId, user: members[randomGopherIndex] }),
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
    setAddMemberVisible(true);
  };

  const handleConfirm = async () => {
    if (addMembers.length > 0) {
      const newMembers = users.filter((user) =>
        addMembers.includes(user.nickname)
      );
      await fetch(`/api/lists/${listId}/members`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listId, users: newMembers }),
      });
    }
    setAddMembers([]);
    setAddMemberVisible(false);
  };

  return (
    <Paper>
      <Stack>
        {members.map((member) => (
          <Group key={member.id}>
            {member.gopher && (
              <Image
                src="/gopherIcon.png"
                width="10"
                height="10"
                alt="With default placeholder"
              />
            )}
            <User user={member} />
            <CloseButton
              onClick={() => {
                handleDeleteMember(member);
              }}
              variant="default"
            />
          </Group>
        ))}
        <Button onClick={handleAddMemberClick} variant="default">
          Add User
        </Button>
        {addMemberVisible && (
          <>
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
          </>
        )}
        <Button onClick={handleRandomGopherClick} variant="default">
          Randomize Gopher
        </Button>
        <Button onClick={handleClaimGopher} variant="default">
          Claim Gopher
        </Button>
      </Stack>
    </Paper>
  );
}
