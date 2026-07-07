function Card({ children }) {
    return <div className="card">{children}</div>
}


export default function TasksStats({ tasks }) {
    return (
        <Card >
            <span>Выполнено: {tasks.filter((task) => task.isDone === true).length} из {tasks.length}</span>
        </Card>
    )
}
