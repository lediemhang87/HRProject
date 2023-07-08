import '../styles2.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faGripVertical, faSquare, faTriangleExclamation, faCheck } from '@fortawesome/free-solid-svg-icons'


const DashboardMyToDoItems: React.FC = () => {
    const todoList = [
        {'title': 'Complete project Monday', 'date': '2023-12-26', 'time': '07:15:00', 'status': 'latest-to-do'},
        {'title': 'Complete project Tuesday', 'date': '2023-12-27', 'time': '07:15:00','status': 'latest-finished'},
        {'title': 'Complete project Wed', 'date': '2023-12-28', 'time': '07:15:00'},
        {'title': 'Complete project Thursday', 'date': '2023-12-29', 'time': '07:15:00'},
        
    ]
    return(
        <div className='myTodoItems'>
            <div className='myTodo-title-div'>
                <div className='title-left'> My To Do Items </div>
                <div className='title-right'> View All + Add To Do </div>
            </div>
            {todoList.map((todo, index) => (
                <div key={index} className='todo-item' style={{ borderTopWidth: index === 0 ? '0' : '1px' }}>
                    {todo.status === 'latest-to-do' && 
                        <div className='status orange'> <FontAwesomeIcon className='icon ' icon={faTriangleExclamation} /> Latest to do's</div>}
                    {todo.status === 'latest-finished' && 
                    <div className='status green'> <FontAwesomeIcon className='icon ' icon={faCheck} /> Latest finished to do's</div>}
                    <div className='title-div'>
                        <FontAwesomeIcon className='icon ' icon={faGripVertical} />
                        <FontAwesomeIcon className='icon ' icon={faSquare} />
                        <div className='title'>{todo.title}</div>
                        <div className='icons '>
                            <FontAwesomeIcon className='icon red' icon={faTrash} />
                            <FontAwesomeIcon className='icon blue ' icon={faPen} />
                        </div>
                    </div>

                    <div className='date-and-time'>
                        {todo.date}  {todo.time}
                    </div>
                </div>
            ))}

            
        </div>
    )
}
export default DashboardMyToDoItems