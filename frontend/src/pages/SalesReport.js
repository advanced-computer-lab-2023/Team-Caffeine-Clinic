import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const SalesReport = () => {
    const [reportData, setReportData] = useState([]);
    const [reportDataMed, setReportDataMed] = useState([]);
    const [reportDataMix, setReportDataMix] = useState([]);
    const [Dates, setDates] = useState([]);
    const [Medicines, setMedicines] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [MedAndDate, setMedAndDate] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const { user } = useAuthContext();
    let totalSalesSum = 0;
    let totalMedsSales = 0;

    const handleDateChange = async (event) => {
        setSelectedDay(event.target.value);
        if(event.target.value === ''){
            if(selectedMedicine === ''){
                fetchData(selectedDate);
            }
            else{
                try {
                    const medicineid = selectedMedicine;
                    console.log(medicineid)
                    const month = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 1).toISOString().slice(0, 7);
                    console.log(month)
                    const response = await fetch('/api/orders/ReportByMedicine', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ month,medicineid }),
                    });
                    const dataMix = await response.json();
                    setReportDataMix(dataMix);

                    const responseMed = await fetch('/api/orders/ReportMedicinesByMedicine', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ month,medicineid }),
                    });
                    const dataMed = await responseMed.json();
                    setReportDataMed(dataMed);
                    console.log(dataMed)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
        else{
            let date = event.target.value;
            if(selectedMedicine === ''){
                try {
                    const response = await fetch('/api/orders/ReportByDate', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ date }),
                    });
                    const data = await response.json();
                    setReportData(data);

                    const responseMed = await fetch('/api/orders/ReportMedicinesByDate', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ date }),
                    });
                    const dataMed = await responseMed.json();
                    setReportDataMed(dataMed);

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            else{
                setMedAndDate(true);
                try {
                    const medicineid = selectedMedicine;
                    const response = await fetch('/api/orders/ReportByDateAndMedicine', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ date,medicineid }),
                    });
                    const dataMix = await response.json();
                    setReportDataMix(dataMix);

                    const responseMed = await fetch('/api/orders/ReportMedicinesByDateAndMedicine', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ date,medicineid }),
                    });
                    const dataMed = await responseMed.json();
                    setReportDataMed(dataMed);
                    console.log(dataMed)

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
    };

    const handleMedicineChange = async (event) => {
        setSelectedMedicine(event.target.value);
        if(event.target.value === ''){
            setMedAndDate(false);
            if(selectedDay === ''){
                fetchData(selectedDate);
            }
            else{
                try {
                    let date = selectedDay
                    const response = await fetch('/api/orders/ReportByDate', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ date }),
                    });
                    const data = await response.json();
                    setReportData(data);

                    const responseMed = await fetch('/api/orders/ReportMedicinesByDate', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ date }),
                    });
                    const dataMed = await responseMed.json();
                    setReportDataMed(dataMed);

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
        else{
            if(selectedDay === ''){
                setMedAndDate(true);
                try {
                    const medicineid = event.target.value;
                    console.log(medicineid)
                    const month = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 1).toISOString().slice(0, 7);
                    console.log(month)
                    const response = await fetch('/api/orders/ReportByMedicine', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ month,medicineid }),
                    });
                    const dataMix = await response.json();
                    setReportDataMix(dataMix);

                    const responseMed = await fetch('/api/orders/ReportMedicinesByMedicine', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ month,medicineid }),
                    });
                    const dataMed = await responseMed.json();
                    setReportDataMed(dataMed);
                    console.log(dataMed)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            else{
                setMedAndDate(true);
                try {
                    const medicineid = event.target.value;
                    const date = selectedDay
                    const response = await fetch('/api/orders/ReportByDateAndMedicine', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ date,medicineid }),
                    });
                    const dataMix = await response.json();
                    setReportDataMix(dataMix);

                    const responseMed = await fetch('/api/orders/ReportMedicinesByDateAndMedicine', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({ date,medicineid }),
                    });
                    const dataMed = await responseMed.json();
                    setReportDataMed(dataMed);
                    console.log(dataMed)

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
    };

    useEffect(() => {
        if (selectedDate) {
            fetchData(selectedDate);
            setSelectedDay('');
            setSelectedMedicine('');
            setMedAndDate(false);
          }
    }, [selectedDate]);

    const fetchData = async (selectedDate) => {
        try {
            const month = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 1).toISOString().slice(0, 7);
            console.log('Formatted Month:', month);
            const response = await fetch('/api/orders/Report', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ month }),
            });

            const responseMed = await fetch('/api/orders/ReportMedicines', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ month }),
            });

            const responseDates = await fetch('/api/orders/Dates', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ month }),
            });

            const responseMedicine = await fetch('/api/orders/Medicines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ month }),
            });

            const data = await response.json();
            const dataMed = await responseMed.json();
            const Dates = await responseDates.json();
            const Medicines = await responseMedicine.json();
            console.log('Received data:', data);
            console.log('Received data Med:', dataMed);
            console.log('Received Dates:', Dates);
            console.log('Received Medicines:', Medicines);
            setReportData(data);
            setReportDataMed(dataMed)
            setDates(Dates)
            setMedicines(Medicines)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Calculate totalSalesSum outside of the return statement
    reportData && reportData.length > 0 &&  reportData.forEach(dateData => {
        dateData.orders.forEach(order => {
        totalSalesSum += order.TotalPrice;
        });
    });

    reportDataMed && reportDataMed.length > 0 && reportDataMed.forEach(medicine => {
        totalMedsSales += medicine.totalSales;
    });

    return (
        <div>
        {user && (
            <Typography variant="h2" gutterBottom>
                Sales Report for - {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' })}
            </Typography>
        )}
       <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Please Choose a month : 
            </Typography>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM"
                showMonthYearPicker
            />
            <FormControl style={{ margin: '16px' }}>
                <InputLabel id="month-select-label">Select Date</InputLabel>
                <Select
                labelId="month-select-label"
                id="month-select"
                value={selectedDay}
                label="Select Date"
                onChange={handleDateChange}
                >
                    <MenuItem value={''}>{''}</MenuItem>
                    {user && Dates && Dates.map((Date) => (
                        <MenuItem value={Date}>{Date}</MenuItem>
                    ))}
                </Select>
            </FormControl> 
            <FormControl style={{ margin: '16px' }}>
                <InputLabel id="month-select-label">Select Medicine</InputLabel>
                <Select
                labelId="month-select-label"
                id="month-select"
                value={selectedMedicine}
                label="Select Medicine"
                onChange={handleMedicineChange}
                >
                    <MenuItem value={''}>{''}</MenuItem>
                    {user && Medicines && Medicines.map((Medicine) => (
                        <MenuItem value={Medicine.medicineid}>{Medicine.medicinename}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        
        </div>
        {user && MedAndDate === false && reportData && reportData.length > 0 && (
            <React.Fragment>
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Medicine Name</TableCell>
                        <TableCell>Amount Ordered</TableCell>
                        <TableCell>Stock left</TableCell>
                        <TableCell>TotalPrice</TableCell>
                        {/* Add additional columns as needed */}
                    </TableRow>
                    </TableHead>
                    {reportData.map((dateData, index) => (
                    <TableBody key={index}>
                        {dateData.orders.map((order, orderIndex) => (
                        <React.Fragment key={orderIndex}>
                            {orderIndex === 0 && (
                            <TableRow>
                                <TableCell rowSpan={order.medicines.reduce((sum, medicine) => sum + medicine.amount, 0)}>
                                {dateData.date}
                                </TableCell>
                            </TableRow>
                            )}
                            {order.medicines.map((medicine, medicineIndex) => (
                            <TableRow key={medicineIndex}>
                                {medicineIndex === 0 && (
                                <TableCell rowSpan={order.medicines.length}>{order._id}</TableCell>
                                )}
                                <TableCell>{medicine.Name}</TableCell>
                                <TableCell>{medicine.amount}</TableCell>
                                <TableCell>{medicine.stock}</TableCell>
                                {medicineIndex === 0 && (
                                <TableCell rowSpan={order.medicines.length}>{order.TotalPrice}</TableCell>
                                )}
                            </TableRow>
                            ))}
                        </React.Fragment>
                        ))}
                        <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6} align="right">Total Sales For The Day:</TableCell>
                            <TableCell>{dateData.totalSales}</TableCell>
                        </TableRow>
                        </TableFooter>
                    </TableBody>
                    ))}
                    <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6} align="right">Total Sales For The Month:</TableCell>
                        <TableCell>{totalSalesSum}</TableCell>
                    </TableRow>
                    </TableFooter>
                </Table>
                </TableContainer>
            </React.Fragment>
        )}
        {user && MedAndDate === true && reportDataMix && reportDataMix.length > 0 && (
            <React.Fragment>
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Medicine Name</TableCell>
                        <TableCell>Medicine Price</TableCell>
                        <TableCell>Amount Ordered</TableCell>
                        <TableCell>Stock left</TableCell>
                        <TableCell>Reserved</TableCell>
                        <TableCell>Returned</TableCell>
                        <TableCell>TotalPrice</TableCell>
                        {/* Add additional columns as needed */}
                    </TableRow>
                    </TableHead>
                    {reportDataMix.map((dateData, index) => (
                    <TableBody key={index}>
                        <React.Fragment key={index}>
                            {dateData.details.map((medicine, medicineIndex) => (
                            <TableRow key={medicineIndex}>
                                {medicineIndex === 0 && (
                                    <TableCell rowSpan={dateData.details.length}>
                                        {dateData.date}
                                    </TableCell>
                                )}
                                <TableCell >{medicine._id}</TableCell>
                                <TableCell>{medicine.medicineName}</TableCell>
                                <TableCell>{medicine.price}</TableCell>
                                <TableCell>{medicine.amount}</TableCell>
                                <TableCell>{medicine.inStock}</TableCell>
                                <TableCell>{medicine.Reserved}</TableCell>
                                <TableCell>{medicine.Returned}</TableCell>
                                <TableCell >{medicine.TotalPrice}</TableCell>
                            </TableRow>
                            ))}
                        </React.Fragment>
                        <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6} align="right">Total Sales For The Day:</TableCell>
                            <TableCell>{dateData.totalSales}</TableCell>
                        </TableRow>
                        </TableFooter>
                    </TableBody>
                    ))}
                    <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6} align="right">Total Sales For The Month:</TableCell>
                        <TableCell>{totalSalesSum}</TableCell>
                    </TableRow>
                    </TableFooter>
                </Table>
                </TableContainer>
            </React.Fragment>
        )}
        {!user && (
            <Typography variant="body1">No data available</Typography>
        )}
        {user && reportDataMed && reportDataMed.length > 0 && 
        <Typography variant="h2" gutterBottom>
            Medicines Sales Report for - {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' })}
        </Typography>}
        {/* Rendering dataMed table */}
        {user && reportDataMed && reportDataMed.length > 0 &&
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Medicine ID</TableCell>
                <TableCell>Medicine Name</TableCell>
                <TableCell>Medicine Price</TableCell>
                <TableCell>Amount Sold</TableCell>
                <TableCell>Total Sales</TableCell>
                <TableCell>In Stock</TableCell>
                <TableCell>Reserved</TableCell>
                <TableCell>Returned</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {reportDataMed.map((medicine, medicineIndex) => (
                <TableRow key={medicineIndex}>
                <TableCell>{medicine._id}</TableCell>
                <TableCell>{medicine.medicineName}</TableCell>
                <TableCell>{medicine.medicinePrice}</TableCell>
                <TableCell>{medicine.totalAmount}</TableCell>
                <TableCell>{medicine.totalSales}</TableCell>
                <TableCell>{medicine.inStock}</TableCell>
                <TableCell>{medicine.Reserved}</TableCell>
                <TableCell>{medicine.Returned}</TableCell>
                </TableRow>
            ))}
            </TableBody>
            <TableFooter>
            <TableRow>
                <TableCell colSpan={6} align="right">Total Sales For The Month:</TableCell>
                <TableCell>{totalMedsSales}</TableCell>
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>}
        </div>
    );
};

export default SalesReport;
