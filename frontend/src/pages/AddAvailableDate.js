import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'; // Replace 'path-to-auth-context' with the actual path

// Assuming you have a form to get the time slot information
const AddAvailableDateFunc = () => {
  const { user } = useAuthContext()
  const [timeSlot, setTimeSlot] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    
    if (selectedDate <= new Date()) {
      setErrorMessage('Please select a future date and time.');
      return;
    }
    setErrorMessage('');
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

  const handleAddTimeSlot = async () => {
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
        setSuccessMessage('Time slot added successfully');
      }
    } catch (error) {
      console.error('Error adding time slot:', error);
    }
  };

  return (
    <div>
      <div>s</div>
      <div>s</div>
      <div>s</div>
      <div>s</div>
      <div>s</div>

      <form>
        <label htmlFor="date">Choose a date and time:</label>
        <input type="datetime-local" id="date" name="date" onChange={handleDateChange} />
        <button type="button" onClick={handleAddTimeSlot}>Add Time Slot</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default AddAvailableDateFunc;
