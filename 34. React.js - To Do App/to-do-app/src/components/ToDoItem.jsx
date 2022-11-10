import React, { useState } from "react";

function ToDoItem(props) {
    const [isDone, setIsDone] = useState(false);

    function handleClick() {
        setIsDone((prevValue) => !prevValue);
    }
    return (
        <div onClick={handleClick}>
            <li style={{ textDecoration: isDone ? "line-through" : "" }}>

                {props.text}

                <button
                    onClick={() => props.onChecked(props.id)}
                    style={{ position: "absolute", right: "20px", top: "12px" }}
                >
                    X
                </button>

            </li>
        </div>
    );
}

export default ToDoItem;
