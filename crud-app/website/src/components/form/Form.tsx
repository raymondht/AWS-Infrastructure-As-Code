import React, { useState, FormEvent } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import axios from 'axios';


interface IProps {
    title: string
}
interface ICar {
    brand: string,
    model: string
}
const Form: React.FC<IProps> = (props) => {
    const [car, setCar] = useState<ICar>({
        brand: '',
        model: ''
    });
    
    const submitHandler = (e: any) => {
        e.preventDefault();
        axios.post('https://kewaszuahd.execute-api.ap-southeast-2.amazonaws.com/prod/cars', {
            ...car
        }).then(
            (response) => console.log(response))
          .catch(
              (err) => console.log(err)
        );
    }

    const inputHandler = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.currentTarget;
        setCar({...car, [name]: value})
    }

    return (
        <MDBContainer style={{border: '1px solid', padding: '15px'}}>
            <MDBRow>
                <MDBCol md="12">
                <form onSubmit={submitHandler}>
                    <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                        Brand
                    </label>
                    <input type="text" id="defaultFormRegisterNameEx" className="form-control" name="brand" onChange={inputHandler} />
                    <br />
                    <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                        Model
                    </label>
                    <input type="text" id="defaultFormRegisterEmailEx" className="form-control" name="model" onChange={inputHandler} />
                    
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
