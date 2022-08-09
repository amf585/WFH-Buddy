import React, { useState } from "react"
import { FormEvent } from "react"
import { IStatusData } from "../lib/db_query"
import { updateStatusById } from "../lib/util"

interface IEditStatusProps {
  statusData?: IStatusData
  callback: () => void
}

export const EditStatus: React.FunctionComponent<IEditStatusProps> = ({statusData, callback}) => {

  const [formDirty, setFormDirty] = useState(false)
  const [mood, setMood] = useState(statusData?.mood || '')
  const [color, setColor] = useState(statusData?.color || '')
  const [callAvailability, setCallAvailability] = useState(statusData?.callAvailability || '')
  const [meeting, setMeeting] = useState(statusData?.meeting || false)
  const [music, setMusic] = useState(statusData?.music || false)

  // Handle status form submit
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

    // Try to update in DB, if successful, broadcast status update event
    const didUpdate = await updateStatusById(statusData?._id, newStatus)

    if (didUpdate) {
      setFormDirty(false)
      callback()
    }
  }
 
  return (
    <>
     <form className="p-5" onSubmit={handleFormSubmit} onChange={() => setFormDirty(true)}>
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
          <option value="stressed">Stressed</option>
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
      <button disabled={!formDirty} type="submit" className="btn btn-primary">Update</button>
    </form>
    </> 
  )
}