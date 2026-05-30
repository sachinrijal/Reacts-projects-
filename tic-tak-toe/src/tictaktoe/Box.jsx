import React, { useState }  from "react"

function Box({ onclick , value }) {

    return (
        <div className="box" onClick={onclick} >{value}
        </div>
    )
}

export default Box
