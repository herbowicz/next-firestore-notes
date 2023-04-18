"use client";

import { useState } from "react";
import { useDbUser } from '../../context/userContext'

export default function Counter() {
    const [count, setCount] = useState(0)
    const { dbUser } = useDbUser()

    return (
        <div>
            <p>You clicked the Count++ button {count} times</p>
            <button onClick={() => setCount(count + 1)}>Count++</button>
            <p>
                {JSON.stringify(dbUser, null, 2)}
            </p>
        </div>
    );
}