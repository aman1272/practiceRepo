import React, { useState, createContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from "react-router-dom";
import './commissionMod.css';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MyFirst = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [show, showModel] = useState(false)
    const [open, setOpen] = React.useState(false);

    const listArray = [{
        listValues: [
            { label: 'Create/Update Commission Grid' },
            { label: 'Check Commission Grid' },
            { label: 'Delete Commission Grid' },
            { label: 'Compute Commission' },
            { label: 'Reconciliation' }]
    }]
    const productData = ['2 Wheeler', '4 Wheeler', 'CV', 'Health', 'Life',];
    const gridData = ['Agent', 'Insurer',]

    const handleClick = () => {
        showModel(true)
    }
    const action = (
        <React.Fragment>
            <button color="secondary" size="small" onClick={() => {
                setOpen(false);
            }}>
                UNDO
            </button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                    setOpen(false);
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <>
            <div className="mainOption">
                {listArray.map((element) => {
                    return (
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={element.listValues.map((item) => {
                                return (item.label)
                            })}
                            sx={{ width: 700 }}
                            // style={{ marginLeft: "49vh", marginTop: "20vh" }}
                            onChange={(event, value) => {
                                if (value === 'Create/Update Commission Grid') {
                                    handleClick(value)
                                } if (value === `Check Commission Grid`) {
                                    setOpen(true);
                                } if (value === 'Delete Commission Grid') {
                                    setOpen(true);
                                }
                                if (value === 'Compute Commission') {
                                    setOpen(true);
                                }
                                if (value === 'Reconciliation') {
                                    setOpen(true);
                                }
                            }}
                            size="small"
                            renderInput={(params) => <TextField {...params} label="Operations" />} />
                    )
                })
                }
            </div>
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={() => {
                        setOpen(false);
                    }}
                    message="Permission not Allow By Developer"
                    action={action}
                />
            </div>
            {show && <Box className="box">
                <h1 className="heading">Commission Module</h1>
                <div className="option" >
                    <Autocomplete
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={productData}
                        sx={{ width: 300 }}
                        size="small"
                        renderInput={(params) => <TextField {...params} label="Product" />}
                    />
                    <div className="grid">
                        <Autocomplete
                            inputValue={inputValue2}
                            onInputChange={(event, newInputValue) => {
                                setInputValue2(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={gridData}
                            sx={{ width: 300 }}
                            size="small"
                            renderInput={(params) => <TextField {...params} label="Grid" />}
                        />
                    </div>

                </div>
                <Link to={`/agGridSheet?product=${inputValue}&grid=${inputValue2}`}>
                    <button className="submitBtn" onClick={((e) => {

                        console.log('Submit Successfully')

                    })}>Submit</button>
                </Link>
            </Box>}
        </>
    )
}
export default MyFirst
