import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import { useMedicinesContext } from "../hooks/useMedicinesContext"
import { useNavigate } from 'react-router-dom';

const MedicineDetails = ({ medicine }) => {
  const {user} = useAuthContext()
  const [GoodMessage,ViewGood]=useState(null);
  const [BadMessage,ViewBad]=useState(null);
  const[Amount,SetAmount]=useState(medicine.Amount);
  const[Visible,SetVisible]=useState(true);
  const[alts,Setalts]=useState('');
  const {medicines, dispatch} = useMedicinesContext();
  const navigate = useNavigate();


  let handleSubmit = async (e) => {
      e.preventDefault()
      const response = await fetch(`/api/patient/deleteFromCart/${medicine.Name}`,{
            method:'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
      })
      if (response.status==200) { 
        SetVisible(false);
        ViewGood("Medicine Deleted")
      }
      if (response.status==400) {
        ViewBad("Something Went Wrong")
      }
  }




  let addPhoto = async (e) => {
    e.preventDefault()
    window.open(`/addMedicinePicture/${medicine.Name}`,"_self");
  }




  let EditResults = async (e) => {
        e.preventDefault()
        window.open(`/editMedicine/${medicine.Name}`,"_self");
  }



  let addToCart = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/patient/addToCart/${medicine.Name}`,{
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
    })

    if (response.status==200) {
      ViewGood("Added")
    }
    if (response.status==400) {
      ViewBad("Could not Add")
    }      
  }



  let IncAmount = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/patient/incAmount/${medicine.Name}`,{
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
    })

    if (response.status==200) {
      var temp=Amount+1;
      SetAmount(temp)
      ViewBad("");

    }
    if (response.status==400) {
      ViewBad("Max Medicine Quantity Reached")
      ViewGood("");
    } 
  }



  let DecAmount = async (e) => {
  e.preventDefault()

    const response = await fetch(`/api/patient/decAmount/${medicine.Name}`,{
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
    })

    if (response.status==200) {
      var temp=Amount-1;
      SetAmount(temp)
      if(temp==0){
     SetVisible(false)}
      ViewBad("");
    }
    if (response.status==400) {
      ViewBad("Something Went Wrong")
      ViewGood("");
    } 
  }

  let Alternatives = async (e) => {
    e.preventDefault()
    let _id = medicine._id;
    let activeIngredients = medicine.activeIngredients;
      const response = await fetch(`/api/medicine/alternatives`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ _id,activeIngredients }),
      })
      const alternatives = await response.json();
      if (alternatives.length == 0) {
        Setalts("No Alternatives")
      }
      else{
        navigate(
          '/alternatives',  
          {
            state: {
              alternatives
            }
          } 
        );
        Setalts('')
      } 
    }
  




  return (
    <div>
      {Visible && 
        <form style={{marginBottom:"-20px"}} className="create" onSubmit={handleSubmit}>
          <div className="workout-details">
            {medicine.Picture && 
            <img src={medicine.Picture} alt="Medicine" width='120' height='120' />}
            <h4>{medicine.Name}</h4>
            <p><strong>Price : </strong>{medicine.Price}</p>
            {user&& user.type=="Patient" &&
            <p><strong>Discounted Price : </strong>{medicine.discountedPrice}</p>}
            <p><strong>Description : </strong>{medicine.Description}</p>
            {user && medicine.Quantity === 0 && <p style={{ color: 'red' }}><strong>Out Of Stock</strong></p>}
            {user&& user.type=="Patient" && medicine.amount &&
            <p><strong>Amount : </strong>{medicine.amount}</p>}
            {user&& user.type=="Pharmacist" &&  <p><strong>Quantity : </strong>{medicine.Quantity}</p> &&
            <p><strong>Sales : </strong>{medicine.Sales}</p> }
            {user && user.type=="Patient" && medicine.Amount &&
            <button style={{marginTop:"10px"}} onClick={handleSubmit}>Delete From cart</button>} <br></br> 
            { Visible && user&& user.type=="Patient" && medicine.Amount && <><strong>Amount in Cart : </strong>{Amount}</>}   
            { Visible && user && user.type=="Patient" && medicine.Amount &&
            <button onClick={IncAmount} style={{marginRight:"20px",marginLeft:"20px"}} >+</button>} 
             {Visible && user && user.type=="Patient" && medicine.Amount &&
             <button onClick={DecAmount}>-</button>} <br></br>    
          </div>
        </form>
      }
      {user && user.type=="Pharmacist" &&
      <button onClick={EditResults}> Edit</button>} 
      <samp>   </samp>
      {user && user.type=="Pharmacist" &&
      <button onClick={addPhoto}> Add Picture</button>}
      {user && user.type=="Patient" && medicine.Quantity === 0 &&
      <button onClick={Alternatives}>View Alternatives</button>} <br></br>
      {user && user.type=="Patient" && !medicine.Amount && !medicine.amount &&
      <button onClick={addToCart}> Add To Cart</button>} <br></br>
      {user && user.type=="Patient" && <div style={{color:"green"}}>{GoodMessage}</div>}
      {user && user.type=="Patient" && <div style={{color:"red"}}>{BadMessage}</div>}  
      {user && user.type=="Patient" && <div style={{color:"red"}}>{alts}</div>}     
    </div>
  )
}

export default MedicineDetails