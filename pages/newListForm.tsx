import type { NextPage } from "next";
import {  Input, TextInput, InputWrapper, Button, MultiSelect} from '@mantine/core';
import { At } from 'tabler-icons-react';

const data = [
  { value: 'user_id', label: 'Alex' },
  { value: 'user_id', label: 'Phil' },
  { value: 'user_id', label: 'Jessica' },
  { value: 'user_id', label: 'Vlad' },
  { value: 'user_id', label: 'Rico' },
  { value: 'user_id', label: 'Nora' },
  { value: 'user_id', label: 'Beth' },
];

const newListForm: NextPage = () => {
  return (
    <form
      action="/api/form"
      method="post"
      style={{maxWidth:"500px", padding:"50px"}
    }
    >
      {/* <Input
      placeholder="Your email"
      label="email"
      required
      />
      <Input
        placeholder="Your name"
        label="Full name"
        required
      /> */}
      <InputWrapper
        label="list name"
        description="Please enter the name of your new list"
        required
      >
        <TextInput name="name" placeholder="grocery list"/>
      </InputWrapper>
      <InputWrapper
        label="location"
        description="Please enter your location"
        required
      >
        <TextInput name="location" placeholder="1234 street, city, state"/>
      </InputWrapper>
      <InputWrapper
        label="users"
        description="Pleaseselect friends to add to the list"
        required
      >
        <MultiSelect name="users" data={data} />
      </InputWrapper>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default newListForm;
