interface IEvent {
  title: string;
  desc: string;
  location: string;
  time_and_date: string;
  userID?: string;
  _id?: string;
}

interface IListRedAction {
  type:string
  payload?:IListRedState
}
interface IListRedState {
  page:number
  eventsloading:boolean
  hasErrored:(boolean | string)[]
}

// type PropTypes = {
//   eventState?:IEvent[] 
//   event?:IEvent
// }

export type {
 IEvent,
 IListRedState,
 IListRedAction,
//  PropTypes
}