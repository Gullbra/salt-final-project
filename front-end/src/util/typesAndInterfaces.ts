interface IEvent {
  title: string;
  desc: string;
  location: string;
  time_and_date: string;
  userID?: string;
  _id?: string;
}

interface IListAction {
  type?:string
  payload:Partial<IListState>
}
interface IListState {
  page:number
  eventsLoading:boolean
  hasErrored:(boolean | string)[]
}

export type {
 IEvent,
 IListState,
 IListAction,
}