import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Filter = () => {
  const [Medicines, setMedicines] = useState(null);
  const [Use, setUse] = useState('');

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
    <>
      <li className="has-children">
        <a href="#">Medical Use Filter </a>
        <FontAwesomeIcon icon={faChevronDown} style={{color:"black"}} />
        <ul className="dropdown">
          {Medicines &&
            Medicines.map((Medicine) => (
              <li key={Medicine} onClick={() => { setUse(Medicine); handleSubmit(Medicine); }}>
                <a>{Medicine}</a>
              </li>
            ))}
        </ul>
      </li>
    </>
  );
};

export default Filter;
