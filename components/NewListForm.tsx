import { useState } from 'react';
import { Button, TextInput } from '@mantine/core';
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
      body: JSON.stringify({list: { name }, users: []}),
    });
    setName('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        required
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <TextInput
        label="Location"
        required
        value={location}
        onChange={(event) => setLocation(event.currentTarget.value)}
      />
      {/*<UserSelect data={friends} value={users} setValue={setUsers}/>*/}
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
}
