export interface List {
  id: number;
  name: string;
  createdAt: Date;
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

interface BasicListEvent {
  id: number;
  list_id: number;
  created_by: User;
}

export interface AddListItemEvent extends BasicListEvent {
  event_type: 'add';
  start: null;
  end: ListItem;
}

export interface DeleteListItemEvent extends BasicListEvent {
  event_type: 'delete';
  start: ListItem;
  end: null;
}

export interface ModifyListItemEvent extends BasicListEvent {
  event_type: 'modify';
  start: ListItem;
  end: ListItem;
}

export type ListItemEvent =  AddListItemEvent | DeleteListItemEvent | ModifyListItemEvent;

export interface User {
  id: number;
  email: string;
  nickname: string;
  picture: string;
}
