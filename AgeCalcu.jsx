import React, { useState } from 'react';
import './ageCal.css'
import { CRow, CCol, CButton, CFormLabel, CFormInput, CContainer } from '@coreui/react'

const Age = () => {
    const [result, setResult] = useState()
    const [date, setDate] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const onCalculate = () => {
        let d1, d, d2, m1, totaLeap, m2, y1, y2
        d = new Date()
        d1 = date
        d2 = d.getDate()
        m1 = month
        m2 = d.getMonth() + 1
        y1 = year
        y2 = d.getFullYear()
        totaLeap = Math.trunc((y2 - y1) / 4)
        let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if (d1 > d2) {
            d2 = d2 + months[d2] + 1
            m2 = m2 - 1
        }
        if (m1 > m2) {
            m2 = m2 + 12
            y2 = y2 - 1
        }
        let finalDate, finalMonth, finalYear
        finalDate = d2 - d1
        if (finalDate >= 31) {
            finalMonth = m2 - m1 + 1
            finalDate = finalDate - 31
        } else {
            finalMonth = m2 - m1
        }

        finalYear = y2 - y1

        setResult(`Now You are ${finalYear} years  ${finalMonth} Months and ${finalDate} Days`)
        setMonth({})
        setDate({})
        setYear({})
    }

    return (
        <div>
            <CContainer>
                <div className="heading">
                    <h1>Age Calculator</h1>
                </div>
                <CRow className="body">
                    <CCol xs={3}>
                        <CFormLabel className="field">Date</CFormLabel>
                        <CFormInput
                            type="number"
                            name="date"
                            placeholder="Date"
                            onChange={(e) => {
                                setDate(e.target.value)
                            }}
                            className="field"
                            value={date}
                        />
                    </CCol>
                    <CCol xs={3}>
                        <CFormLabel className="field">Month</CFormLabel>
                        <CFormInput
                            type="number"
                            name="month"
                            placeholder="Month"
                            onChange={(e) => {
                                setMonth(e.target.value)
                            }}
                            className="field"
                            value={month}
                        />
                    </CCol>
                    <CCol xs={3}>
                        <CFormLabel className="field">Year</CFormLabel>
                        <CFormInput
                            type="number"
                            name="year"
                            placeholder="Year"
                            className="field"
                            onChange={(e) => {
                                setYear(e.target.value)
                            }}
                            value={year}
                        />
                    </CCol><br></br>
                </CRow>
                <div>
                    <CButton className="btn" onClick={onCalculate}>Calculate</CButton>
                </div>
                <div>
                    <h3 className="result"> {result} </h3>
                </div>
            </CContainer>

        </div>
    )
}

export default Age
