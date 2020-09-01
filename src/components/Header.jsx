import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context } from './Context'

const Header = styled.header`
    grid-area: cabeçalho;
    background: #517a82;
    box-shadow: 0 0 10px black;
`

export default () => {
    const {logged} = useContext(Context)

    function logout(e) {
        localStorage.removeItem('authorization')
    }

    return(
        <Header>
            {logged && 
                <form onSubmit={e => logout(e)}>
                    <button type="submit">Logout</button>
                </form>
            }
            {!logged && 
                <h1 style={{textAlign:'center'}}>Clone twitter</h1>
            }   
        </Header>
    )
}