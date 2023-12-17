import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../PharmacyCSS/css/style.css';

const Filter = () => {
  const [Medicines, setMedicines] = useState(null);
  const [Use, setUse] = useState('');
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch('/api/medicine/viewDistinct');
      const json = await response.json();

      if (response.ok) {
        setMedicines(json);
      }
    };

    fetchMedicines();
  }, []);

  const handleSubmit = (selectedUse) => {
    // Add your logic here to handle the selected medical use
    window.open(`/filter/${selectedUse}`, '_self');
  };

  return (
    <div className={`col-lg-6 ${isOpen ? 'show' : ''}`}>
      <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Medical Use</h3>
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
        {Medicines &&
          Medicines.map((Medicine) => (
            <a
              key={Medicine}
              className="dropdown-item"
              href="#"
              onClick={() => {
                setUse(Medicine);
                handleSubmit(Medicine);
              }}
            >
              {Medicine}
            </a>
          ))}
      </div>
    </div>
  );
};

export default Filter;
