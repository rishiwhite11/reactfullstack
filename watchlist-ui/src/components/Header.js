import React, {Component} from 'react';
import {
    Navbar, NavbarBrand, Nav, NavItem, NavLink
  } from 'reactstrap';
import axios from 'axios';
import * as _ from "lodash";
  class Header extends Component{
    state = {
        id: ''
    }
    componentDidMount(){
        axios.get('/api/auth/user', {withCredentials:true}).then((response) => {
            console.log(_.isEmpty(response.data));
            let isEmpty = _.isEmpty(response.data);
            if(isEmpty){
                this.setState({id: ''})
            }else{
                this.setState({id: response.data.data._id})
            }
            
        })
    }
    renderComponent () {
        if(this.state.id){
            return (
                <NavLink className="font-weight-bold" href="/api/auth/logout">
                        Logout
                </NavLink>
            )
        }else {
            return (
                <NavLink className="font-weight-bold" href="/api/auth/facebook">
                    Log In
                </NavLink>
            )
        }
    }
    
      render(){
        
            return (
                <div>
                    <Navbar color="faded" light expand="md">
    
                        <NavbarBrand href="/">
                        See Stock Details
                        </NavbarBrand>
                        <Nav className="ml-auto" navbar>
    
                        <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" href="/">Home</NavLink>
                        </NavItem>
                        <NavItem className="d-flex align-items-center">
                            {this.renderComponent()}
                        </NavItem>
                        </Nav>
                        </Navbar>
                </div>
              )
        }
    }

export default Header;