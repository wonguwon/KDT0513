import React from 'react'
import styled from 'styled-components'
import useCounterStore from '../store/useCounterStore'

const DisplayContainer = styled.div`
    font-size: 32px;
    margin: 16px;
    padding: 20px;
    background: ${props => props.theme.secondary};
    border-radius: 8px;
`

const CountText = styled.span`
    font-weight: bold;
    color: ${props => props.theme.primary};
`

const CounterDisplay = () => {
    //zustand store에서 count값만 구독
    const count = useCounterStore((state) => state.count);
    
    return (
        <DisplayContainer>
            현재 카운트 : <CountText>{count}</CountText>
        </DisplayContainer>
    )
}

export default CounterDisplay