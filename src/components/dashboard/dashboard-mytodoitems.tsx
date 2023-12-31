import '../styles2.scss';

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import SortableItem from './todo-item';
import { v4 as uuid } from 'uuid';


type TodoItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  status?: string;
  isChecked: boolean;
};

const DashboardMyToDoItems: React.FC = () => {
  const initialTodoList: TodoItem[] = [
    { id: '0', title: 'Complete project Monday', date: '2023-12-26', time: '07:15:00', status: 'latest-to-do', isChecked: false},
    { id: '1', title: 'Complete project Tuesday', date: '2023-12-27', time: '07:15:00', status: 'latest-finished',  isChecked: true},
    { id: '2', title: 'Complete project Wed', date: '2023-12-28', time: '07:15:00', 'status': '',  isChecked: false},
    { id: '3', title: 'Complete project Thursday', date: '2023-12-29', time: '07:15:00', 'status': '',  isChecked: false }
  ];

  const [todoList, setTodoList] = useState(initialTodoList);  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState<TodoItem>({ id: '0', title: 'Complete project Monday', date: '2023-12-26', time: '07:15:00', status: '',  isChecked: false});

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over !== null && active?.id !== over.id) {
      setTodoList((items: TodoItem[]) => {
        const activeIndex = items.findIndex((item) => item.id === active?.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value
    }));
  };

  const handleCheck = (id: string) => {
  const checkedItemIndex = todoList.findIndex((todo) => todo.id === id);

  if (todoList[checkedItemIndex].status === 'latest-finished') {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isChecked: false, status: '' } : todo
    );
    setTodoList(updatedTodoList);
  } else {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
    );

    const oldLatestFinishedIndex = updatedTodoList.findIndex(
      (todo) => todo.status === 'latest-finished'
    );

    const updatedTodoListWithStatus = [...updatedTodoList];

    if (oldLatestFinishedIndex !== -1) {
      updatedTodoListWithStatus[oldLatestFinishedIndex] = {
        ...updatedTodoListWithStatus[oldLatestFinishedIndex],
        status: '',
      };
    }

    if (updatedTodoListWithStatus[checkedItemIndex].isChecked == true) {
        updatedTodoListWithStatus[checkedItemIndex] = {
            ...updatedTodoListWithStatus[checkedItemIndex],
            status: 'latest-finished',
          };
    }
    setTodoList(updatedTodoListWithStatus);
  }
};

  

const handleAddTodo = (e: React.FormEvent) => {
  e.preventDefault();
  if (newTodo.title && newTodo.date && newTodo.time) {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.status == 'latest-to-do') {
        return {
          ...todo,
          status: '',
        };
      }
      return todo;
    });

    const newId = uuid();

    const updatedNewTodo = { ...newTodo, status: 'latest-to-do', id: newId };
    updatedTodoList.unshift(updatedNewTodo);

    setTodoList(updatedTodoList);

    setNewTodo(updatedNewTodo);
    setShowAddForm(false);
    console.log(todoList)
  }
};
  const handleCancelAdd = () => {
    setNewTodo({ id: '', title: '', date: '', time: '', status: 'latest-to-do', isChecked: false });
    setShowAddForm(false);
  };
  
  const handleUpdateTodo = (updatedTodo: TodoItem) => {
    setTodoList((prevTodoList) => {
      const updatedTodoList = prevTodoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
      return updatedTodoList;
    });
  };

  return (
    <div className='myTodoItems'>
      <div className='myTodo-title-div'>
        <div className='title-left'> My To Do Items </div>
        <div className='title-right'>
          View All + 
          <button onClick={() => setShowAddForm(true)}>Add Item</button>
        </div>
      </div>

      {showAddForm && (
        <div className='pop-up'>
          <div className='bg-body border p-4 rounded'>
            <div className='text-xl fw-semibold mb-4'> Add to-do-list </div>
            <form onSubmit={handleAddTodo}>
              <div className='text-lg mb-2'> Title </div>
              <input className='w-100 border text-lg mb-4' type='text' name='title' placeholder='Title' value={newTodo.title} onChange={handleInputChange} required /> <br/>
              <div className='text-lg mb-2'> Date and time</div>
              <input className='w-50 border text-lg' type='date' name='date' value={newTodo.date} onChange={handleInputChange} required />
              <input className='w-50 border text-lg mb-4'type='time' name='time' value={newTodo.time} onChange={handleInputChange} required />
                <button className='btn btn-success bg-success mr-4'type='submit'>Add To Do</button>
                <button className='btn btn-danger bg-danger' type='button' onClick={handleCancelAdd}>Cancel</button>
              
            </form>
          </div>
        </div>
        
      )} 

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>

        <SortableContext items={todoList} strategy={verticalListSortingStrategy}>
          {todoList.map((todo, index) => (
            <SortableItem key={todo.id} todo={todo} index={index} onDelete={handleDeleteTodo} onUpdateTodo={handleUpdateTodo} onCheck={handleCheck}/>
          ))}
        </SortableContext>
        
      </DndContext>
    </div>
  );
};

export default DashboardMyToDoItems;
