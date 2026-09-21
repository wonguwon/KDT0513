import React from 'react'
import styled from 'styled-components'
import useTodoStore from '../store/useTodoStore'

const ListContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`

const TodoItem = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    margin: 8px 0;
    background: ${props => props.theme.secondary};
    border-radius: 4px;
`

const CheckBox = styled.input`
    margin-right: 12px;
    width: 18px;
    height: 18px;
    cursor: pointer;
`

const TodoTitle = styled.span`
    flex: 1;
    text-decoration: ${({$completed}) => $completed ? "line-through" : "none"};
    color: ${props => props.theme.text};
`

const DeleteButton = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background: ${props => props.theme.primary};
    color: white;
    cursor: pointer;

    &:hover{
        opacity: 0.9s;
    }
` 

const FilterContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
`

const FilterButton = styled(DeleteButton)`
    background: ${({$active, theme}) => $active ? theme.primary : "transparent"};
    color: ${({$active, theme}) => $active ? "white" : theme.text};
    border: 1px solid ${props => props.theme.border};
` 

const TodoList = () => {
    const filter = useTodoStore(state => state.filter)
    const setFilter = useTodoStore(state => state.setFilter)
    const toggleTodo = useTodoStore(state => state.toggleTodo)
    const deleteTodo = useTodoStore(state => state.deleteTodo)
    const todos = useTodoStore(state => state.todos)

    const filteredTodos = todos.filter(todo => {
        switch(filter){
            case "active":
                return !todo.completed
            case "completed":
                return todo.completed
            default:
                return true;
        }
    })
    

    return (
        <ListContainer>
            <FilterContainer>
                <FilterButton
                    $active={filter === "all"}
                    onClick={() => setFilter("all")}
                >
                    전체
                </FilterButton>
                <FilterButton
                    $active={filter === "active"}
                    onClick={() => setFilter("active")}
                >
                    진행중
                </FilterButton>
                <FilterButton
                    $active={filter === "completed"}
                    onClick={() => setFilter("completed")}
                >
                    완료
                </FilterButton>
            </FilterContainer>
            {filteredTodos.map(todo => (
                <TodoItem key={todo.id}>
                    <CheckBox 
                        type="checkbox" 
                        checked={todo.completed} 
                        onChange={() => toggleTodo(todo.id)}
                    />
                    <TodoTitle
                        $completed={todo.completed}
                    >{todo.title}</TodoTitle>
                    <DeleteButton onClick={() => deleteTodo(todo.id)}>삭제</DeleteButton>
                </TodoItem>
            ))}
        </ListContainer>
    )
}

export default TodoList