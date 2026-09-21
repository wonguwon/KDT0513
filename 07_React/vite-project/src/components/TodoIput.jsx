import React, { useState } from 'react'
import styled from 'styled-components'
import useTodoStroe from '../store/useTodoStore'

const InputContainer = styled.div`
    margin: 20px 0;
    display: flex;
    gap: 10px;
`

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-size: 16px;

    &:focus{
        outline: none;
        border: ${props => props.theme.primary};
    }
`

const AddButton = styled.button`
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

const TodoIput = () => {
    const [text, setText] = useState("");
    const addTodo = useTodoStroe(state => state.addTodo);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()){
            addTodo(text.trim());
            setText("");
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <InputContainer>
                <Input 
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder='할일입력...'
                />
                <AddButton type='submit'>추가</AddButton>
            </InputContainer>
        </form>
    )
}

export default TodoIput