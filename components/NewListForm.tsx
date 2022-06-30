import { useState } from 'react';
import { Button, TextInput } from '@mantine/core';
import { UserSelect } from '@/components/UserSelect';
import { addShoppingList } from '@/server/lists/index';

export default function AddListForm({ friends, setOpened }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [users, setUsers] = useState([]);

  const handleSubmit = async () => {
    await fetch('/api/lists', { method: 'POST', body: JSON.stringify({ name })});
    setName('');
    setLocation('');
    setOpened(false);
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




