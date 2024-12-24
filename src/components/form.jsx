import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import './form.css';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const getlocalstorage = () => {
    return JSON.parse(localStorage.getItem("patient")) || []
}

const Registration = () => {

    const intialelState = {
        id: '',
        regid: '',
        healthno: '',
        location: '',
        regdate: '',
        time: '',
        fname: '',
        lname: '',
        address1: '',
        address2: '',
        city: '',
        regine: '',
        zipcode: '',
        country: '',
        phoneno: '',
        email: '',
        dob: '',
        sex: ''
    }

    const [inputform, setInputform] = useState(intialelState)
    const [storage, setStorage] = useState(getlocalstorage())
    const [isEdit, setIsEdit] = useState(false);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setInputform({
            ...inputform,
            [name]: value
        })
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            let updateData = storage.map((pat) => {
                if (pat.id == inputform.id) {
                    return inputform
                }
                else {
                    return pat
                }
            })
            setStorage(updateData);
            setIsEdit(false);
        }
        else {
            let id = Math.floor(Math.random() * 10000)
            setStorage([...storage, { ...inputform, id }])
        }


        setInputform(intialelState)
    }

    const handelEdit = (id) => {
        let patient = storage.find((emp) => emp.id == id)
        setInputform(patient)
        setIsEdit(true);
    }

    const handelDelete = (id) => {
        let updateData = storage.filter((emp) => emp.id != id)
        setStorage(updateData)
    }
    useEffect(() => {
        localStorage.setItem("patient", JSON.stringify(storage));
    } , [storage])

    return (
        <Row >
            <Col  className='form'>
                <div className='form-title'>
                    <h2>Hospital Registration Form</h2>
                    <h5>Patients are required to register their information on this form.</h5>
                </div>
                <hr />
                <Form onSubmit={handlesubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" className='form-detail'>
                            <Form.Label>Registration Check ID</Form.Label>
                            <Form.Control type="number" name='regid' value={inputform.regid} onChange={handlechange} />
                        </Form.Group>
                        <Form.Group as={Col} md="6" className='form-detail'>
                            <Form.Label>Health Care Number</Form.Label>
                            <Form.Control type="number" name='healthno' value={inputform.healthno} onChange={handlechange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" className='form-detail'>
                            <Form.Label>Registration Location ex: ER, Clinic, etc</Form.Label>
                            <Form.Control type="text" name='location' value={inputform.location} onChange={handlechange} />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" className='form-detail'>
                            <Form.Label>Registration Date</Form.Label>
                            <Form.Control type="date" name='regdate' value={inputform.regdate} onChange={handlechange} />
                        </Form.Group>
                        <Form.Group as={Col} md="6" className='form-detail'>
                            <Form.Label> Registration Time</Form.Label>
                            <Form.Control type="time" name='time' value={inputform.time} onChange={handlechange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3 ">
                        <Form.Group as={Col} md="6" className='form-detail'>
                            <Form.Label>Patient Name</Form.Label>
                            <Form.Control type="text" name='fname' value={inputform.fname} onChange={handlechange} placeholder='First' />
                        </Form.Group>
                        <Form.Group as={Col} md="6" className=' form-detail'>
                            <Form.Label className='opacity-0'>s</Form.Label>
                            <Form.Control type="text" name='lname' value={inputform.lname} onChange={handlechange} placeholder='Last' />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" className='form-detail'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name='address1' value={inputform.address1} onChange={handlechange} placeholder='street Address' />
                            <Form.Control type="text" name='address2' value={inputform.address2} onChange={handlechange} placeholder='street Address 2' className='mt-3' />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" className='form-detail'>
                            <Form.Control type="text" name='city' value={inputform.city} onChange={handlechange} placeholder='City' />
                        </Form.Group>
                        <Form.Group as={Col} md="6" className='form-detail' >
                            <Form.Control type="text" name='regine' value={inputform.regine} onChange={handlechange} placeholder='Regine' />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" className='form-detail'>
                            <Form.Control type="text" name='zipcode' value={inputform.zipcode} onChange={handlechange} placeholder='Postal/Zip Code' />
                        </Form.Group>
                        <Form.Group as={Col} md="6" className='form-detail' >
                            <Form.Control type="text" name='country' value={inputform.country} onChange={handlechange} placeholder='Country' />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" className='form-detail'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="numbe" name='phoneno' value={inputform.phoneno} onChange={handlechange} placeholder='##### #####' />
                        </Form.Group>
                        <Form.Group as={Col} md="6" className='form-detail'>
                            <Form.Label>Email (optional)</Form.Label>
                            <Form.Control type="text" name='email' value={inputform.email} onChange={handlechange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" className='form-detail'>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name='dob' value={inputform.dob} onChange={handlechange} placeholder='##### #####' />
                        </Form.Group>
                        <Form.Group as={Col} md="6" className='form-detail'>
                            <Form.Label> Sex</Form.Label>
                            <Form.Control type="text" name='sex' value={inputform.sex} onChange={handlechange} />
                        </Form.Group>
                    </Row>



                    <Button type="submit" className='mt-4 button'>Submit form</Button>
                </Form>
            </Col>

            <Row>
                <Table striped bordered hover size="sm" className='mt-5 table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Registration id</th>
                            <th>health no </th>
                            <th>location</th>
                            <th>Registration date</th>
                            <th>time</th>
                            <th>Full Name</th>
                            <th>address1</th>
                            <th>address2</th>
                            <th>city</th>
                            <th>regine</th>
                            <th>zipcode</th>
                            <th>country</th>
                            <th>phone no</th>
                            <th>email</th>
                            <th>dob</th>
                            <th>sex</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            storage.map((pat) => (
                                <tr key={pat.id} >
                                    <td>{pat.id}</td>
                                    <td>{pat.regid}</td>
                                    <td>{pat.healthno}</td>
                                    <td>{pat.location}</td>
                                    <td>{pat.regdate}</td>
                                    <td>{pat.time}</td>
                                    <td>{pat.fname} {pat.lname}</td>
                                    <td>{pat.address1}</td>
                                    <td>{pat.address2}</td>
                                    <td>{pat.city}</td>
                                    <td>{pat.regine}</td>
                                    <td>{pat.zipcode}</td>
                                    <td>{pat.country}</td>
                                    <td>{pat.phoneno}</td>
                                    <td>{pat.email}</td>
                                    <td>{pat.dob}</td>
                                    <td>{pat.sex}</td>
                                    <td>
                                        <Button onClick={() => handelEdit(pat.id)}>
                                            <FaEdit />
                                        </Button>
                                        <Button onClick={() => handelDelete(pat.id)} variant="danger">
                                            <FaTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </Table>
            </Row>
        </Row>


    )
}
export default Registration;