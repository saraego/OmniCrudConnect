import React from "react"
import {Container,Ul,Li} from './style'



 function Header() {
    
    return (
        <Container>
            <Ul>
                <Li href="/">Cadastra usuarios</Li>
                <Li href="/users">Lista usuarios</Li>
            </Ul>
        </Container>
    )
}

export default Header