import React from 'react'
import useCounterStore from '../store/useCounterStore'
import styled from 'styled-components';

const ControlsContainer = styled.div`
    margin: 16px;
`

const Button = styled.button`
    margin-right: 8px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background: ${props => props.theme.primary};
    color: white;
    cursor: pointer;

    &:hover{
        opacity: 0.9s;
    }

    &:last-child{
        margin-right: 0;
    }
`

const CounterControls = () => {
    const increase = useCounterStore((state) => state.increase);
    const decrease = useCounterStore((state) => state.decrease);
    const result = useCounterStore(state => state.reset);

    return (
        <ControlsContainer>
            <Button onClick={increase}> + 1 </Button>
            <Button onClick={decrease}> - 1 </Button>
            <Button onClick={result}> 초기화 </Button>
        </ControlsContainer>
    )
}

export default CounterControls