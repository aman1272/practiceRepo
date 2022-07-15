import React, { useState } from 'react'
import { CRow, CFormLabel, CFormInput, CCol, CButton } from '@coreui/react'
import './form.css'

const CheckOut = () => {
    const [state, setState] = useState({
        subTotal: 0,
        sgst: 0,
        cgst: 0,
        offer: 0,

    })
    const [total, setTotal] = useState('')
    let { subTotal, sgst, cgst, offer } = state
    const handleClick = () => {
        let sub = parseInt(state.subTotal)
        let off = parseInt(state.offer)
        let cgstPercentage = parseInt(state.cgst)
        let sgstPercentage = parseInt(state.sgst)

        if (offer) {
            cgstPercentage = (sub * cgst) / 100
            sgstPercentage = (sub * sgst) / 100
            subTotal = cgstPercentage + sgstPercentage + sub
            let offerValue = (subTotal * off) / 100
            sub = subTotal - offerValue
            setTotal(`Now Your payable amount is $  ${sub}   dollars `)

        } else {
            cgstPercentage = (sub * cgst) / 100
            sgstPercentage = (sub * sgst) / 100
            subTotal = sub + cgstPercentage + sgstPercentage
            setTotal(`Now Your payable amount is $  ${subTotal}   dollars `)


        }
    }
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setState({ ...state, [name]: value })

    }

    return (
        <>
            <div className="container" >
                <div className="head" xs={8}>
                    <h1>Place Your Orders</h1>
                </div>
                <div xs={4}>
                    <CCol xs={4} >
                        <CFormLabel className="CFormLabel">Amount</CFormLabel>
                        <CFormInput
                            type="number"
                            name="subTotal"
                            onChange={handleChange}
                            value={state.subTotal}
                            className="Lavi"
                        />
                        <CRow>
                            <CCol xs={6}>
                                <CFormLabel className="CFormLabel">CGST%</CFormLabel>
                                <CFormInput
                                    type="number"
                                    onChange={handleChange}
                                    value={state.cgst}
                                    name="cgst"
                                    className="Lavi"
                                />
                            </CCol>
                            <CCol xs={6}>
                                <CFormLabel className="CFormLabel">SGST%</CFormLabel>
                                <CFormInput
                                    type="number"
                                    onChange={handleChange}
                                    value={state.sgst}
                                    name="sgst"
                                    className="Lavi"
                                />
                            </CCol>
                            <CCol xs={12}>
                                <CFormLabel className="CFormLabel">Offer%</CFormLabel>
                                <CFormInput
                                    type="number"
                                    onChange={handleChange}
                                    value={state.offer}
                                    name="offer"
                                    className="Lavi"
                                />
                            </CCol>
                            <div className="submit" xs={6}>
                                <CButton onClick={handleClick}> Payable_Amount</CButton>
                            </div>
                        </CRow>
                    </CCol>
                </div>
                <h2 className="result"> {total}</h2>
            </div>
        </>
    )
}
export default CheckOut
