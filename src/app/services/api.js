const BASE_URL = 'http://localhost:5000/api';

export const getTasks = async() => {
    const res = await fetch(`${BASE_URL}/tasks`);
    return res.json();
}

export const  createTask = async(taskData) => {
    const res = await fetch(`${BASE_URL}/tasks`,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
    })
    return res.json()
}