import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'; // Replace 'path-to-auth-context' with the actual path

// Assuming you have a form to get the time slot information
const AddAvailableDateFunc = () => {
  const { user } = useAuthContext()
  const [timeSlot, setTimeSlot] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed months
    const day = selectedDate.getDate();
    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();

    const formattedDate = `${year}\\${month}\\${day}:${hours}:${minutes}`;
    const toady = new Date();
    if(toady>selectedDate){
      setSuccessMessage('Time slot has already passed please enter a Valid Time Slot ');
    }
    else {
      setSuccessMessage("");
    }
    setTimeSlot(JSON.stringify(formattedDate));
  };

  const handleAddTimeSlot = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/doctorInfo/add_available_slots?timeSlot=${timeSlot}`, {
        method: 'PATCH', // Assuming you are using the PATCH method
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Adding the authorization token
        },
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Time slot added successfully');      }
      else {
        setSuccessMessage('Error adding time slot');
      }
    } catch (error) {
      console.error('Error adding time slot:', error);
      setSuccessMessage('Error adding time slot');
    }
  };

  return (
    // <div>
    //   <form>
    //     <label htmlFor="date">Choose a date and time:</label>
    //     <input type="datetime-local" id="date" name="date" onChange={handleDateChange} />
    //     <button type="button" onClick={handleAddTimeSlot}>Add Time Slot</button>
    //   </form>
    //   {successMessage && <p>{successMessage}</p>}
    // </div>
   <div>
  <section className="breadcrumbs">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Add My Available Time Slots</h2>
        <ol>
          <li><a href="index.html">Home</a></li>
          <li>Time Slots</li>
        </ol>
      </div>
    </div>
  </section>

  <section className="inner-page">
    <div className="container">
      
    <section id="appointment" class="appointment section-bg">
   <div class="container">

    <div>
  <div className="section-title">
    <h2>Add To Your Available Time Slots</h2>
    <p>Please add the dates where you are ready to take appointments!</p>
  </div>
  <form method="post" role="form" className="php-email-form">
    <div className="form-group mt-3">
      <input type='datetime-local' className="form-control" name="message" rows={5}  defaultValue={""} onChange={handleDateChange} />
      <div className="validate" />
    </div>
    <div className="text-center"><button onClick={(e)=>handleAddTimeSlot(e)} type="submit">Add Date</button></div>
    <div className="section-title">{successMessage && <p>{successMessage}</p>}  </div> 
  </form>
</div>
</div>
</section>


    </div>
  </section>
</div>

  );
};

export default AddAvailableDateFunc;
