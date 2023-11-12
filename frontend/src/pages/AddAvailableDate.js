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
