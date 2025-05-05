'use client'

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "../store/userSlice";

export default function UserInitializer(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUserFromStorage())
    }, [dispatch])

    return null;
}