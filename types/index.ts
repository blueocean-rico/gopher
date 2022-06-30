export interface List {
  id: number;
  name: string;
  createdAt: Date;
}

export type PreDbList = Omit<List, 'id' | 'createdAt'>;

export interface ListItem {
  id: number;
  listId: number;
  name: string;
  price: number;
  users: User[];
  active?: boolean;
}

export type PreDbListItem = Omit<ListItem, 'id'>;

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

export type PreDbAddListItemEvent = Omit<AddListItemEvent, 'id' | 'date'>;

export interface DeleteListItemEvent extends BasicListEvent {
  eventType: 'delete';
  start: ListItem;
  end: null;
}

export type PreDbDeleteListItemEvent = Omit<DeleteListItemEvent, 'id' | 'date'>;

export interface ModifyListItemEvent extends BasicListEvent {
  eventType: 'modify';
  start: ListItem;
  end: ListItem;
}

export type PreDbModifyListItemEvent = Omit<ModifyListItemEvent, 'id' | 'date'>;

export type ListItemEvent =
  | AddListItemEvent
  | DeleteListItemEvent
  | ModifyListItemEvent;

export interface User {
  id: number;
  email: string;
  nickname: string;
  picture?: string;
}

export type PreDbUser = Omit<User, 'id'>;

export interface Member extends User {
  gopher: boolean;
}
