import React from "react"

function SendData() {
  console.log("Sending the dataE bro! -.-")
}

export default function Index() {
  return (
    <div style={{
      padding: 20
    }}>
      <form onSubmit={SendData}>
        <label for="lname">The data, bro: &nbsp; </label>
        <input type="text" id="lname" name="lname" />
        <br />
        <button style={{
          margin: 20
        }} type="submit">
          Send the data
        </button>
      </form>
    </div>
  )
}
