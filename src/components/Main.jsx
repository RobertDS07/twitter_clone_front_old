import React, { useContext } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

import config from '../config/config'
import { Context } from './Context'

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

    &.heightAuto {
        height: auto;
    }
`

export default props => {
    const { logged, setLogged } = useContext(Context)


    const CatchInputsData = (e) => {
        e.preventDefault()

        const formTarget = e.target

        const data = {}

        for (let i = 0; i < formTarget.children.length; i++) {
            if (formTarget.children[i].name !== '') {
                data[formTarget.children[i].name] = formTarget.children[i].value
            }
        }

        return data
    }

    async function login(e) {
        e.preventDefault()

        const { email, password, name } = CatchInputsData(e)

        const data = !props.register ? await axios.post(config.url, {
            query: `
            {
                login(email: "${email}", password: "${password}")
            }
            `
        }) : await axios.post(config.url, {
            query: `
            mutation{
                createUser(email: "${email}", password: "${password}", name: "${name}",)
            }
            `
        })

        const removeError = (divError) => {
            divError.classList.remove('show')
        }

        if (!!data.data.errors) {
            const {message} = data.data.errors[0]
            const divError = document.querySelector('#error')

            divError.classList.add('show')

            setTimeout(() => removeError(divError), 9000)

            return divError.innerHTML = message
        }

        const {login} = data.data.data
        const {createUser} = data.data.data

        localStorage.setItem('authorization', login || createUser)
        if(!!localStorage.getItem('authorization')) setLogged(true)
    }

    return (
        <Main>
            {!props.register &&
                <>
                    <form onSubmit={e => login(e)}>
                        <input type="text" name="email" id="email" placeholder='email' />
                        <input type="text" name="password" id="password" placeholder='password' />
                        <button type="submit">Login</button>
                        {logged && <Redirect to='/home' />}
                    </form>
                    <Link to='/register'>Register</Link>
                </>
            }

            {props.register &&
                <>
                    <form onSubmit={e => login(e)}>
                        <input type="text" name="email" id="email" placeholder='email' />
                        <input type="text" name="password" id="password" placeholder='password' />
                        <input type="text" name="name" id="name" placeholder='name' />
                        <button type="submit">Login</button>
                        {logged && <Redirect to='/home' />}
                    </form>
                </>
            }
        </Main>
    )
}