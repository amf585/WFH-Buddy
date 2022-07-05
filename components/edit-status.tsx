import Link from "next/link"

export const EditStatus: React.FunctionComponent = () => {
  return (
    <>
     <form>
      <div className="mb-3">
        <select className="form-select" aria-label="Mood select input">
          <option selected>How are you feeling?</option>
          <option value="Angry">Three</option>
          <option value="Happy">Happy</option>
          <option value="Neutral">Neutral</option>
          <option value="Sad">Sad</option>
        </select>
      </div>
      <div className="mb-3">
        <select className="form-select" aria-label="Stoplight color">
          <option selected>Light Color</option>
          <option value="Red">Red</option>
          <option value="Yellow">Yellow</option>
          <option value="Gree">Green</option>
        </select>
      </div>
      <div className="mb-3">
        <select className="form-select" aria-label="Call availability">
          <option selected>Call Availability</option>
          <option value="anytime">Call Anytime</option>
          <option value="ask">Ask First</option>
          <option value="none">Emergency Only</option>
        </select>
      </div>
      <div className="mb-3">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Meeting</label>
        </div>
      </div>
      <div className="mb-3">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Music</label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
    </> 
  )
}