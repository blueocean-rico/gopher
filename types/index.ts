export interface List {
  id: number;
  name: string;
  createdAt: Date;
  //items: ListItem[];
  //users: User[];
  //location: String;
}

export interface ListItem {
  id: number;
  listId: number;
  name: string;
  price: number;
  users: User[];
  active?: boolean;
}

interface BasicListEvent {
  id: number;
  listId: number;
  date: string;
  createdBy: User;
}

export interface AddListItemEvent extends BasicListEvent {
  eventType: 'add';
  start: null;
  end: ListItem;
}

export interface DeleteListItemEvent extends BasicListEvent {
  eventType: 'delete';
  start: ListItem;
  end: null;
}

export interface ModifyListItemEvent extends BasicListEvent {
  eventType: 'modify';
  start: ListItem;
  end: ListItem;
}

export type ListItemEvent =
  | AddListItemEvent
  | DeleteListItemEvent
  | ModifyListItemEvent;

export interface User {
  id: number;
  email: string;
  nickname: string;
  picture: string;
}
