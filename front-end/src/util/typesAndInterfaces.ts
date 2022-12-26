interface IEvent {
  title: string;
  desc?: string;
  location?: string;
  time_and_date?: string;
  _id?: string;
}
type PropTypes = {
  eventState?:IEvent[] 
  event?:IEvent
}

export type {
 IEvent,
 PropTypes
}