export interface List {
  id: number;
  items: ListItem[];
  users: User[];
}

export interface ListItem {
  id: number;
  list_id: number;
  name: string;
  price: number;
  users: User[];
  active?: boolean;
}

export interface ListItemEvent {
  id: number;
  list_id: number;
  event_type: 'add' | 'delete' | 'modify';
  created_by: User;
  start: ListItem;
  end: ListItem;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  picture: string;
}
