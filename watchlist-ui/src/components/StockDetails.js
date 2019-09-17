import React from 'react';

const StockDetails = (props) => {
    console.log(props.symbol);

    if(props.name === undefined){
        return (
            <div>
               <div className="row mt-4">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body bg-light">
                            Sorry No data available
                        </div>
                    </div>
                </div>
            </div> 
            </div>
        )
    }
    return (
        
            <div className="row mt-4">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-info">
                            {props.name}
                        </div>
                        <div className="card-body bg-light">
                            Latest Price: {props.open}<br/>
                            Previous Close: {props.close}<br/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default StockDetails;
//data.open