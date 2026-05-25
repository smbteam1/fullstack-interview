Backend

Start Application in development: npm run dev

Endpoints

POST /tasks - create a task

payload
{
    title: "string",
    description: "string",
    status: "string",[pending, in-progress, completed]
    category: "string", [work personal , shoping, others]
}

Get /tasks - get all tasks by pagination and search


PATCH /tasks/id - Edit a task

payload
{
    title: "string",
    description: "string",
    status: "string",[pending, in-progress, completed]
    category: "string", [work personal , shoping, others]
}

Delete /tasks/id - Delete a task

PATCH /tasks/stats - Get  task statistics

Frontend
install dependencies : npm i
start app in dev mode : npm run dev