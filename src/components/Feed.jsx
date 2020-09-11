import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

import { Context } from './Context'
import config from '../config/config'

const Feed = styled.main`
    grid-area: main;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;

    &.content {
        flex-direction: column-reverse
    }
`

const Main = styled.div`
    height: 200px;
    border-radius: 6px;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
    margin-top: 50px;
    text-align: center;
`

export default () => {
    const { logged } = useContext(Context)
    const [posts, setPosts] = useState()

    const token = localStorage.getItem('authorization')

    useEffect(() => {
        async function getData() {
            const data = await Axios.post(config.url, {
                query: `
                {
                    posts(token:"${token}"){
                        author
                        content
                        likes
                        mutable
                        _id
                    }
                }
                `
            })
            setPosts(data.data.data.posts)
        } getData()
    }, [])

    async function postar(e) {
        const token = localStorage.getItem('authorization')
        const content = e.target.children[0].value

        await Axios.post(config.url, {
            query: `
            mutation{
                createPost(token:"${token}", content:"${content}")
            }
            `
        })
    }

    async function deletePost(e, _id) {
        await Axios.post(config.url, {
            query: `
            mutation{
                deletePost(_id:"${_id}")
            }
            `
        })
    }

    async function like(postId, e) {
        e.preventDefault()
        e.persist()

        const likeHTML = e.target.children[0]

        const data = await Axios.post(config.url, {
            query: `
            mutation{
                likedPost(_id:"${postId}", userToken:"${localStorage.getItem('authorization')}")
            }
            `
        })

        const numberOfLikes = data.data.data.likedPost

        return likeHTML.innerHTML = numberOfLikes
    }

    return (
        <Feed>

            {!logged && <Redirect to='/' />}

            <Main>
                <form onSubmit={e => postar(e)}>
                    <input type="text" name="content" id="content" />
                    <button type="submit">postar</button>
                </form>
            </Main>

            <Feed className='content'>
                {!!posts && posts.map(post => {
                    if (post.mutable) {
                        return (
                            <Main key={post._id}>
                                <form onSubmit={e => deletePost(e, post._id)}>
                                    <button type='submit'>Delete</button>
                                </form>
                                <p>{post.author}</p>
                                <p>{post.content}</p>
                                <form onSubmit={e => like(post._id, e)}>
                                    <p>{post.likes.length}</p>
                                    <button type="submit">Like</button>
                                </form>
                            </Main>
                        )
                    }
                    return (
                        <Main key={post._id}>
                            <p>{post.author}</p>
                            <p>{post.content}</p>
                            <form onSubmit={e => like(post._id, e)}>
                                <p>{post.likes.length}</p>
                                <button type="submit">Like</button>
                            </form>
                        </Main>
                    )
                })}
            </Feed>
        </Feed>
    )
}