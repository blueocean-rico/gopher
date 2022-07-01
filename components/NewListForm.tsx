import { useState } from 'react';
import { Button, InputWrapper, TextInput, Title, Box, MultiSelect } from '@mantine/core';
//import { UserSelect } from '@/components/UserSelect';
import { addList } from '@/server/lists/index';

export default function NewListForm({ users }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [members, setMembers] = useState([]);

  // {list: { name: string }; users: User[]}
  const handleSubmit = async () => {
    await fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({list: { name }, users: members}),
    });
    setName('');
    setLocation('');
    setMembers([]);
  };


  return (
    <Box style={{maxWidth: "100%"}} >
      <form onSubmit={handleSubmit}>
        <InputWrapper
          label="Name"
          description="Please enter the name of your new list"
          required
        >
          <TextInput
            value={name}
            placeholder="grocery list"
            onChange={(event) => setName(event.currentTarget.value)}/>
        </InputWrapper>
        <InputWrapper
          label="Location"
          description="Please enter the location for the list"
          required
        >
          <TextInput
            value={location}
            placeholder="123 Street, City, State"
            onChange={(event) => setLocation(event.currentTarget.value)}/>
        </InputWrapper>
        <InputWrapper
          label="Members"
          description="Add friend to this list"
          required
        >
          <MultiSelect
            data={users.map((user) => (
              {value: user, label: user.nickname}
            ))}
            value={members}
            onChange={setMembers}
            />
        </InputWrapper>
        {/*<UserSelect data={friends} value={users} setValue={setUsers}/>*/}
        <Button onClick={handleSubmit} style={{marginTop: 10}}>Create List</Button>
      </form>
    </Box>
  );
}
