import { useState } from 'react';

// Тип для задачи
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  // Состояние для списка задач
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Изучить React', completed: true },
    { id: 2, text: 'Написать To-Do приложение', completed: false }
  ]);

  // Состояние для новой задачи
  const [newTask, setNewTask] = useState('');

  // Функция добавления задачи
  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTask = (id: number) => {
    const updateTask = (task: Task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    };
    const updatedTasks = tasks.map(updateTask);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📝 Список задач
        </h1>
        
        {/* Форма добавления задачи */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Введите новую задачу..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Добавить
          </button>
        </div>

        {/* Список задач */}
        <div className="space-y-3">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded cursor-pointer"
                />
                <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.text}
                </span>
              </div>
              
              <button
                onClick={() => removeTask(task.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition"
                title="Удалить задачу"
              >
                ❌
              </button>
            </div>
          ))}
          
          {/* Сообщение если задач нет */}
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              Задач пока нет. Добавьте первую задачу!
            </p>
          )}
        </div>

        {/* Статистика - исправлено */}
        <div className="mt-6 pt-4 border-t flex justify-between text-gray-600">
          <p>Всего задач: <span className="font-bold">{tasks.length}</span></p>
          <p>✅ Выполнено: <span className="font-bold text-green-600">
            {tasks.filter(task => task.completed).length}
          </span></p>
          <p>⏳ Осталось: <span className="font-bold text-blue-600">
            {tasks.filter(task => !task.completed).length}
          </span></p>
        </div>
      </div>
    </div>
  );
}

export default App;