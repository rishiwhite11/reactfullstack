import React , {Component} from 'react';
import { Button,Label,FormGroup, Input,Col, Form} from 'reactstrap';
import axios from 'axios';
import StockDetails from './StockDetails';

class Dashboard extends Component{
    state = {
        symbol: '',
        data: {},
        status: 200
    }
    
    submit = (event) => {
        event.preventDefault();
        let symbol = this.state.symbol;
        axios.get(`/api/${symbol}`).then((response) => {
            this.setState({data: response.data.data});
            console.log(this.state.data);
        })
    }
    changeSymbol = (event) => {
        this.setState({
            symbol: event.target.value
        })
    }
    render(){
        return (
            <div className="container">
            <Form onSubmit={this.submit}>
                <FormGroup row>
                <Label for="exampleEmail" sm={2}>Symbol</Label>
                <Col sm={5}>
                    <Input type="text" name="symbol" value={this.state.symbol} onChange={this.changeSymbol} id="symbol" placeholder="" />
                </Col>
                </FormGroup>
                <FormGroup check row>
                <Col sm={{ size: 3, offset:1}}>
                    <Button>Submit</Button>
                </Col>
                </FormGroup>
            </Form>
            <StockDetails name={this.state.data.companyName}
            open={this.state.data.latestPrice}
            close={this.state.data.previousClose}
            />
            </div>    
        )
    }
}

export default Dashboard;