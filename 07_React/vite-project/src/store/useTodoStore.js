import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTodoStore = create(
    persist((set) => ({
        todos: [{id: 1, title: "밥먹기", completed: false}],
        filter: "all", //all, active, completed
        setFilter: (filter) => set({filter}),
        toggleTodo: (id) => 
            set((state) => ({
                todos: state.todos.map((todo) => 
                    todo.id === id ? {...todo, completed: !todo.completed} : todo
                )
            })),
        deleteTodo: (id) =>
            set((state) => ({
                todos: state.todos.filter(todo => todo.id !== id)
            })),
        addTodo: (title) => 
            set((state) => ({
                todos: [
                    ...state.todos, 
                    {
                        id: Date.now(), 
                        completed: false, 
                        title
                    }
                ]
            })),
    }),{
        name: "todo-storage", //로컬스토리지에 저장할 key이름
        // 저장할 상태만 골라서 저장(함수는 제외)
        partialize: (state) => ({
            todos: state.todos,
            filter: state.filter,
        }),
    })
)

export default useTodoStore;