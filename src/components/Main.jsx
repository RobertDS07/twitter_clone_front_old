import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import config from '../config/config'

const Main = styled.main`
    grid-area: main;
    width: 100%;
    height: 200px;
    border-radius: 6px;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`

// ESTUDAR MATERIALIZE



export default () => {
    const { url } = config

    async function teste(e) {
        e.preventDefault()
        const email = e.target.children[0].value
        const password = e.target.children[1].value

        const token = await axios.post(url, {
            query: `
            {
                login(email: "${email}", password: "${password}")
            }
            `
        })

        console.log(token)
    }

    return (
        <Main>
            <form onSubmit={e => teste(e)}>
                <input type="text" name="email" id="email" />
                <input type="text" name="password" id="password" />
                <button type="submit">Login</button>
            </form>
        </Main>
    )
}