
function TaskItem({ id, value, deleteTask, changeStatus, isDone }) {

    return (
        <li>
            <span>{value}</span>
            <button type="button" onClick={() => deleteTask(id)}>Удалить</button>
            <button type="button" onClick={() => changeStatus(id)}>{isDone ? "Выполнено" : "Выполнить"}</button>
        </li>
    )
}

export default function TasksList({ tasks, filter, type, deleteTask, changeStatus }) {

    const filteredTasks = (filter === 'completed')
        ? tasks.filter((task) => task.isDone === true)
        : (filter === 'uncompleted')
            ? tasks.filter((task) => task.isDone === false)
            : tasks

    const displayedTasks = (type === 'work')
        ? filteredTasks.filter((task) => task.type === 'work')
        : (type === 'study')
            ? filteredTasks.filter((task) => task.type === 'study')
            : (type === 'personal')
                ? filteredTasks.filter((task) => task.type === 'personal')
                : filteredTasks
    return (
        <ul>
            {displayedTasks.map((task) => (
                <TaskItem key={task.id}
                    id={task.id}
                    value={task.value}
                    isDone={task.isDone}
                    deleteTask={deleteTask}
                    changeStatus={changeStatus}
                />))}
        </ul>
    )
}
