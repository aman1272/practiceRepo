import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button, Modal, ModalHeader, Row, ModalFooter } from 'reactstrap'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './readup.css'
const Aman = () => {
    const [user, setUser] = useState({
        name: '',
        age: '',
        address: '',
        number: '',
        email: '',
        college: '',
    });
    const [isUpdate, setIsUpdate] = useState(false);
    const [data, setData] = useState(false);
    const [show, showModal] = useState(false);
    const [upload, setUpload] = useState()

    useEffect(() => {
        getData();
    }, []);
    const getData = async (sortKey) => {
        const url = `http://localhost:5000/get-data/${sortKey}`
        const response = await axios.get(url)
        if (response) {

            setData(response.data)
            console.log(response.data, "response")
        }
    }
    const saveUser = async () => {
        if (!isUpdate) {
            const res = axios.post('http://localhost:5000/add-user', user).then(function (response) {
                getData()
            })
                .catch(function (error) {
                    console.log(error);
                });
            showModal(!show)
        } else {
            console.log('Your Credential is updated successfully', user)
            const res = await axios.put('http://localhost:5000/update-user', user)
            if (res) {
                showModal(!show)
                getData();
            } else {
                alert("Something went wrong, unable to fetch data..")
            }
        }

    }
    const remove = async (id) => {
        window.confirm(id, 'Are u sure to want delete this item');
        const res = await axios.delete(`http://localhost:5000/delete-user/${id}`);
        getData();
    }

    const handleClose = (item = false) => {
        if (!item) {
            setUser({})
            setIsUpdate(false)
            showModal(!show)

        } else {
            setIsUpdate(true)
            showModal(!show)
            setUser(item)
        }

    }
    const handleUpload = async () => {
        console.log(upload)
        const formData = new FormData();
        formData.append('image', upload, upload.name)
        const url = 'http://localhost:5000/uploadphoto'
        const res = await axios.post(url, formData)
        console.log(res)
    }

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }
    return (

        <>
            <h1>Our College Student Details</h1>
            <Button variant="primary" onClick={() => handleClose(false)}>
                Add User
            </Button>
            <div>
                <h3>Choose Your Image</h3>
                <input type="file" src={upload} name="image" onChange={(e) => {
                    setUpload(e.target.files[0])
                }} />
                <Button variant="primary" onClick={handleUpload}>
                    Upload Image
                </Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th onClick={() => getData('name')} > Name</th>
                        <th onClick={() => getData('age')}>Age</th>
                        <th onClick={() => getData('address')} >Address</th>
                        <th onClick={() => getData('number')} >Number</th>
                        <th onClick={() => getData('email')} > Email</th>
                        <th onClick={() => getData('college')} >College</th>
                        <th onClick={() => getData('Created_at')} >Created_at</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, ind) => {

                        return (
                            <>
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.address}</td>
                                    <td>{item.number}</td>
                                    <td>{item.email}</td>
                                    <td>{item.college}</td>
                                    <td>{item.created_at}</td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div>
                                                <EditIcon onClick={() => { handleClose(item) }} />
                                            </div>
                                            <div style={{ marginLeft: '1vh' }}>
                                                <DeleteIcon onClick={() => { remove(item._id) }} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </Table>
            <Modal isOpen={show} toggle={handleClose}>
                <ModalHeader >
                    {!isUpdate ? "Add User" : "Update User"}
                </ModalHeader>
                <Row className="row">
                    <label>Name</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} /><br></br>
                    <label>Age</label>
                    <input type="number" name="age" value={user.age} onChange={handleChange} /><br></br>
                    <label>Address</label>
                    <input type="text" name="address" value={user.address} onChange={handleChange} /><br></br>
                    <label>Number</label>
                    <input type="number" name="number" value={user.number} onChange={handleChange} /><br></br>
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} /><br></br>
                    <label>College</label>
                    <input type="text" name="college" value={user.college} onChange={handleChange} />
                </Row>
                <ModalFooter>
                    {!isUpdate ?
                        <Button
                            color="primary"
                            onClick={saveUser}
                        >
                            Add
                        </Button>
                        :
                        <Button
                            color="primary"
                            onClick={saveUser}
                        >
                            Update
                        </Button>
                    }
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )

}

export default Aman