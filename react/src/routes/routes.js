import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../container/Home"
import Users from "../container/Users"
import UsersDetais from "../container/User"


function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path={'/'} Component={Home}/>
                <Route path={'/users'} Component={Users}/>
                <Route path={'/users/:userId'} Component={UsersDetais}/>
            </Routes>
        </Router>
    )
}

export default Rotas;