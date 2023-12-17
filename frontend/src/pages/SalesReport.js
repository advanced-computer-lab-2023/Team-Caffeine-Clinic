import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Navbar from '../components/Navbar';

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
    const [isOpen, setOpen] = useState(false);
    const [isOpen1, setOpen1] = useState(false);


    let totalSalesSum = 0;
    let totalMedsSales = 0;

    const handleDateChange = async (date) => {
        setSelectedDay(date);
        if(date === ''){
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

    const handleMedicineChange = async (medicine) => {
        setSelectedMedicine(medicine);
        if(medicine === ''){
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
                    const medicineid = medicine;
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
                    const medicineid = medicine;
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
        if (selectedDate  ) {
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

    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Ibuprofen', price: 55.00, quantity: 1 },
        { id: 2, name: 'Bioderma', price: 49.00, quantity: 1 },
    ]);

    return (
        <>
            <Navbar />
            <div style={{background:"#fafafa"}}>
                
                <div style={{ display: 'flex'}}>
                <div className="col-lg-4" style={{marginLeft:"150px", marginTop:"20px"}}>
                    <h4> Please Choose a month :</h4>
                    <br></br>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM"
                        showMonthYearPicker />
                </div>

                <div className="col-lg-4" style={{marginTop:"20px"}}>
                    <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Date</h3>
                        <button
                            onClick={() => setOpen(!isOpen)}
                            type="button"
                            className="btn btn-secondary btn-md dropdown-toggle px-4"
                            id="dropdownMenuReference"
                            data-toggle="dropdown"
                        >
                            Filter
                        </button>
                        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuReference">
                            {/* Add an empty option */}
                            <a
                                key={''}
                                className="dropdown-item"
                                href="#"
                                onClick={() => {
                                    handleDateChange('');
                                    setOpen(false);
                                }}
                            >
                                {"None"}
                            </a>

                            {user && Dates && Dates.map((date) => (
                                <a
                                    key={date}
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => {
                                        handleDateChange(date);
                                        setOpen(false);
                                    }}
                                >
                                    {date}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-4" style={{marginTop:"20px"}}>
                        <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Medicines</h3>
                        <button
                            onClick={() => setOpen1(!isOpen1)}
                            type="button"
                            className="btn btn-secondary btn-md dropdown-toggle px-4"
                            id="dropdownMenuReference"
                            data-toggle="dropdown"
                        >
                            Filter
                        </button>
                        <div className={`dropdown-menu ${isOpen1 ? 'show' : ''}`} aria-labelledby="dropdownMenuReference">
                            {/* Add an empty option */}
                            <a
                                key={''}
                                className="dropdown-item"
                                href="#"
                                onClick={() => {
                                    handleDateChange('');
                                    setOpen(false);
                                }}
                            >
                                {"None"}
                            </a>
                            
                            {user && Medicines && Medicines.map((Medicine) => (
                                <a
                                    key={Medicine.medicineid}
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => {
                                        handleMedicineChange(Medicine.medicineid);
                                        setOpen1(false);
                                    }}
                                >
                                    {Medicine.medicinename}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <br></br>
                {user && (
                    <h2> Sales Report for - {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' })}: </h2>
                )}

                {user && MedAndDate === false && reportData && reportData.length > 0 && (
                    <div className="site-section">
                        <div className="container">
                            <div className="row mb-5">
                            <form className="col-md-12" method="post">
                                <div className="site-blocks-table">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th className="product-thumbnail" >Date</th>
                                        <th className="product-name">Order</th>
                                        <th className="product-price">Medicine Name</th>
                                        <th className="product-quantity">Amount Ordered</th>
                                        <th className="product-total">left in Stock</th>
                                        <th className="product-remove">Order Sum</th>
                                        <th className="product-remove">Sales for the day</th>
                                        {selectedDay == '' && <th className="product-remove">Sales for the month</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.map((dateData, index) => (
                                        <React.Fragment key={index}>
                                            {dateData.orders.map((order, orderIndex) => (
                                            <React.Fragment key={orderIndex}>
                                                {order.medicines.map((medicine, medicineIndex) => (
                                                <tr key={medicineIndex}>
                                                    {medicineIndex === 0 && orderIndex === 0 && <td rowSpan={dateData.orders.reduce((sum, o) => sum + o.medicines.length, 0)}>{dateData.date}</td>}
                                                    {medicineIndex === 0 && <td rowSpan={order.medicines.length}>{order._id}</td>}
                                                    <td>{medicine.Name}</td>
                                                    <td>{medicine.amount}</td>
                                                    <td>{medicine.stock}</td>
                                                    {medicineIndex === 0 && <td rowSpan={order.medicines.length}>{order.TotalPrice}</td>}
                                                    {medicineIndex === 0 && orderIndex === 0 && <td rowSpan={dateData.orders.reduce((sum, o) => sum + o.medicines.length, 0)}>{dateData.totalSales}</td>}
                                                    {medicineIndex === 0 && orderIndex === 0 && index === 0 && selectedDay == '' && (
                                                        <td rowSpan={reportData.reduce((sum, d) => sum + d.orders.reduce((oSum, o) => oSum + o.medicines.length, 0), 0)}>
                                                            {totalSalesSum}
                                                        </td>
                                                    )}
                                                </tr>
                                                ))}
                                            </React.Fragment>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                                </table>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                )}
                {user && MedAndDate === true && reportDataMix && reportDataMix.length > 0 && (
                    <div className="site-section">
                        <div className="container">
                            <div className="row mb-5">
                            <form className="col-md-12" method="post">
                                <div className="site-blocks-table">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th className="product-thumbnail" >Date</th>
                                        <th className="product-name">Order</th>
                                        <th className="product-thumbnail" >Image</th>
                                        <th className="product-price">Medicine Name</th>
                                        <th className="product-quantity">Medicine Price</th>
                                        <th className="product-quantity">Amount Ordered</th>
                                        <th className="product-total">left in Stock</th>
                                        <th className="product-quantity">Reserved</th>
                                        <th className="product-quantity">Returned</th>
                                        <th className="product-total">Total Price</th>
                                        <th className="product-remove">Sales for the day</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportDataMix.map((dateData, index) => (
                                        <React.Fragment key={index}>
                                            {dateData.details.map((medicine, medicineIndex) => (
                                            <React.Fragment key={medicineIndex}>
                                                <tr key={medicineIndex}>
                                                    {medicineIndex === 0 && <td rowSpan={dateData.details.length}>{dateData.date}</td>}
                                                    <td>{medicine._id}</td>
                                                    <td><img src={medicine.medicineImage} alt="Medicine" width="120" height="120" /></td>
                                                    <td>{medicine.medicineName}</td>
                                                    <td>{medicine.price}</td>
                                                    <td>{medicine.amount}</td>
                                                    <td>{medicine.inStock}</td>
                                                    <td>{medicine.Reserved}</td>
                                                    <td>{medicine.Returned}</td>
                                                    <td>{medicine.totalPrice}</td>
                                                    {medicineIndex === 0 &&<td rowSpan={dateData.details.length}>{dateData.totalSales}</td>}
                                                </tr>
                                            </React.Fragment>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                                </table>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                )}
                {!user && (
                    <Typography variant="body1">No data available</Typography>
                )}
                {user && reportDataMed && reportDataMed.length > 0 &&
                    <h2>
                        Medicines Sales Report for - {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' })}:
                    </h2>
                }
                {user && reportDataMed && reportDataMed.length > 0 && 
                    <div className="site-section">
                        <div className="container">
                            <div className="row mb-5">
                            <form className="col-md-12" method="post">
                                <div className="site-blocks-table">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th class="product-thumbnail">Image</th>
                                        <th className="product-thumbnail" >Medicine ID</th>
                                        <th className="product-price">Medicine Name</th>
                                        <th className="product-quantity">Medicine Price</th>
                                        <th className="product-quantity">Amount Sold</th>
                                        <th className="product-quantity">Total Sales</th>
                                        <th className="product-total">left in Stock</th>
                                        <th className="product-quantity">Reserved</th>
                                        <th className="product-quantity">Returned</th>
                                        {selectedDay == '' && <th className="product-remove">Sales for the month</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportDataMed.map((medicine, medicineIndex) => (
                                            <React.Fragment key={medicineIndex}>
                                                <tr key={medicineIndex}>
                                                    <td><img src={medicine.medicineImage} alt="Medicine" width="120" height="120" /></td>
                                                    <td>{medicine._id}</td>
                                                    <td>{medicine.medicineName}</td>
                                                    <td>{medicine.medicinePrice}</td>
                                                    <td>{medicine.totalAmount}</td>
                                                    <td>{medicine.totalSales}</td>
                                                    <td>{medicine.inStock}</td>
                                                    <td>{medicine.Reserved}</td>
                                                    <td>{medicine.Returned}</td>
                                                    {medicineIndex === 0 && selectedDay == '' && <td rowSpan={reportDataMed.length}>{totalMedsSales}</td>}
                                                </tr>
                                            </React.Fragment>
                                    ))}
                                </tbody>
                                </table>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default SalesReport;
