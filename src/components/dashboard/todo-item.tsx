import { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faGripVertical, faTriangleExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';

type TodoItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  status?: string;
  isChecked: boolean;
};

type SortableItemProps = {
  todo: TodoItem;
  index: number;
  onDelete: (id: string) => void;
  onUpdateTodo: (updatedTodo: TodoItem) => void;
  onCheck: (id: string, isChecked: boolean) => void;
};

const SortableItem: React.FC<SortableItemProps> = ({ todo, index, onDelete, onUpdateTodo, onCheck }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id });
  const [editMode, setEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  useEffect(() => {
    setEditedTodo(todo);
  }, [todo]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditedTodo(todo);
    setEditMode(false);
  };

  const handleSave = () => {
    console.log('Save todo:', editedTodo);
    setEditMode(false);
    onUpdateTodo(editedTodo);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      onDelete(todo.id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    const updatedTodo = { ...editedTodo, isChecked: !editedTodo.isChecked };
    setEditedTodo(updatedTodo);
    onCheck(updatedTodo.id, updatedTodo.isChecked);
  };


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className='todo-item' style={{ borderTopWidth: index === 0 ? '0' : '1px' }}>
      {todo.status === 'latest-to-do' && (
          <div className='status orange'>
            <FontAwesomeIcon className='icon ' icon={faTriangleExclamation} /> Latest to do's
          </div>
        )}
        {todo.status === 'latest-finished' && (
          <div className='status green'>
            <FontAwesomeIcon className='icon ' icon={faCheck} /> Latest finished to do's
          </div>
        )}
        {editMode ? (
          <>
            <input className='border w-100 margin-bottom-10' type='text' name='title' value={editedTodo.title} onChange={handleInputChange} />
            <input className='border w-50 margin-bottom-10 ' type='date' name='date' value={editedTodo.date} onChange={handleInputChange} />
            <input className='border w-50 margin-bottom-10' type='time' name='time' value={editedTodo.time} onChange={handleInputChange} />
            <button className='green-button padding-10 margin-right-10 border-radius-10' onClick={handleSave}>
              Save
            </button>
            <button className='red-button padding-10  border-radius-10 ' onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className='title-div'>
              <FontAwesomeIcon className='icon ' icon={faGripVertical} {...attributes} {...listeners} />

              <input className='checkbox' type='checkbox' checked={todo.isChecked} onChange={handleCheckboxChange} />

              <div className={`title ${todo.isChecked ? 'crossed' : ''}`}>
                {todo.title}
              </div>

              <div className='icons '>
                <FontAwesomeIcon className='icon red' icon={faTrash} onClick={handleDelete} />
                <FontAwesomeIcon className='icon blue' icon={faPen} onClick={handleEdit} />
              </div>
            </div>
            
            <div className='date-and-time'>
              {todo.date} {todo.time}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SortableItem;
