import { IEvent } from "./typesAndInterfaces"

class Event implements IEvent{  
  title: string
  desc: string
  location: string
  time_and_date: string
  userID:string

  constructor(title:string, desc:string, location:string, time_and_date:string, userID:string) {
     this.title = title
     this.desc = desc
     this.location = location
     this.time_and_date = time_and_date
     this.userID = userID
  }
}

export default Event