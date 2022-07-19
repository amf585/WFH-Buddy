import React from "react"
import { FormEvent } from "react"
import { IStatusData } from "../lib/db_query"
import { updateStatusById } from "../lib/util"


// TODO pass in status to set initial values for form

interface IEditStatusProps {
  statusData?: IStatusData
  callback: () => void
}

export const EditStatus: React.FunctionComponent<IEditStatusProps> = ({statusData, callback}) => {

  const [mood, setMood] = React.useState(statusData?.mood || '')
  const [color, setColor] = React.useState(statusData?.color || '')
  const [callAvailability, setCallAvailability] = React.useState(statusData?.callAvailability || '')
  const [meeting, setMeeting] = React.useState(statusData?.meeting || false)
  const [music, setMusic] = React.useState(statusData?.music || false)

  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()

    const newStatus: IStatusData = {
      email: statusData?.email,
      mood,
      color,
      callAvailability,
      meeting,
      music,
      lastUpdate: Date.now().toString()
    }

    const didUpdate = await updateStatusById(statusData?._id, newStatus)

    if (didUpdate) {
      callback()
    }
  }
 
  return (
    <>
     <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label>Mood</label>
        <select 
          className="form-select" 
          aria-label="Mood select input" 
          value={mood}
          onChange={(e) => setMood(e.target.value)}>
          <option value="happy">Happy</option>
          <option value="neutral">Neutral</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Light Color</label>
        <select 
          className="form-select" 
          aria-label="Stoplight color"
          value={color}
          onChange={(e) => setColor(e.target.value)}>
          <option value="siren">Fire Siren</option>
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Call Availability</label>
        <select 
          className="form-select" 
          aria-label="Call availability"
          value={callAvailability}
          onChange={(e) => setCallAvailability(e.target.value)}>
          <option value="anytime">Call Anytime</option>
          <option value="ask">Ask First</option>
          <option value="none">Emergency Only</option>
        </select>
      </div>
      <div className="mb-3">
        <div className="form-check form-switch">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="meetingSwitch"
            checked={meeting}
            onChange={(e) => setMeeting(!meeting)}/>
          <label className="form-check-label" htmlFor="meetingSwitch">Meeting</label>
        </div>
      </div>
      <div className="mb-3">
        <div className="form-check form-switch">
          <input 
            className="form-check-input"
            type="checkbox" 
            id="musicSwitch"
            checked={music}
            onChange={(e) => setMusic(!music)}/>
          <label className="form-check-label" htmlFor="musicSwitch">Music</label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
    </> 
  )
}