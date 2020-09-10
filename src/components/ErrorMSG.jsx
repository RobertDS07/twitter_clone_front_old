import React from 'react'
import styled from 'styled-components'

const Error = styled.div `
    width: 40%;
    height: 50px;
    background: #ff3333;
    text-align: center;
    border-radius: 8px;
    display: none;

    &.show{
        display: inline;
    }
`

export default () => 
    <Error id='error'></Error>