import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PostForm from '../components/PostForm'

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`

const Title = styled.h1`
    color: #333;
    margin: 0;
`

const Button = styled(Link)`
    background: #2e7abc;
    color: white;
    border: none;
    padding: 8px 06px;
    border-radius: 4px;
    text-decoration: none;

    &:hover{
        background: #1b486f;
    }
`

const Loading = styled.div`
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #666;
`

const NewPostPage = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Header>
                <Title>게시글 작성</Title>
                <Button to="/posts">목록으로</Button>
            </Header>
            <PostForm 
                onCancel={()=> navigate('/posts')}
            />
        </Container>
    )
}

export default NewPostPage