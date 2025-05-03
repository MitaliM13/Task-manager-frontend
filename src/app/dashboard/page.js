'use client'

export default function DashboardPage({user}) {
    return(
        <h1>Welcom To DashBoard, {user?.username || 'User'}</h1>
    )
}