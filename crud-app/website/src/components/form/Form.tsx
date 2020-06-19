import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';



interface IProps {
    title: string
}
interface ICar {
    brand: string,
    model: string
}
const Form: React.FC<IProps> = (props) => {
    const [car, setCar] = useState<ICar>();
    
    const submitHandler = () => {
        
    }

    return (
        <MDBContainer style={{border: '1px solid', padding: '15px'}}>
            <MDBRow>
                <MDBCol md="12">
                <form>
                    <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                        Brand
                    </label>
                    <input type="text" id="defaultFormRegisterNameEx" className="form-control" />
                    <br />
                    <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                        Model
                    </label>
                    <input type="email" id="defaultFormRegisterEmailEx" className="form-control" />
                    
                    <div className="text-center mt-4">
                    <MDBBtn color="unique" type="submit">
                        Register
                    </MDBBtn>
                    </div>
                </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Form
