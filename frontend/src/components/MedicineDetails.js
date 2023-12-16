import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react'
import { useMedicinesContext } from "../hooks/useMedicinesContext"
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faArchive , faImage, faCartShopping  } from '@fortawesome/free-solid-svg-icons';

const MedicineDetails = ({ medicine }) => {
  const {user} = useAuthContext()
  const [GoodMessage,ViewGood]=useState(null);
  const [BadMessage,ViewBad]=useState(null);
  const[Amount,SetAmount]=useState(medicine.Amount);
  const[Visible,SetVisible]=useState(true);
  const[Archive,SetArchive]=useState("");
  const[alts,Setalts]=useState('');
  const navigate = useNavigate();

  let ArchiveMed = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/medicine/archiveMed/${medicine.Name}`,{
          method:'PUT',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
    })
    const data = await response.json();

    if(data){
      console.log(data.Archive)
    if(!data.Archive){
      SetArchive('Unarchive')
    }
    else{
      SetArchive('Archive')
    }
  }

    if (response.status==200) {
      ViewBad("")
      if(Archive=='Archive')
       ViewGood("Archived")
    else
       ViewGood("Unarchived")
    }
    if (response.status==400) {
      ViewGood("")
      ViewBad("Could not Archive")
    }      
  }


  useEffect(() => {
    if(medicine.Archive){
      SetArchive('Unarchive')
    }
    else{
      SetArchive('Archive')
    }

},ArchiveMed);

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
      ViewBad("")
      ViewGood("Added")
    }
    if (response.status==400) {
      ViewGood("")
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

          <div className="workout-details" style={{ position: 'relative' , padding:"40px"}}>
            
          <div style={{ minWidth: '120px', minHeight: '120px' }}>
            {medicine.Picture && (
              <img src={medicine.Picture} alt="Medicine" width="120" height="120" />
            )}
          </div>
            
            {user && user.type === "Pharmacist" && (
              <FontAwesomeIcon
                icon={faEdit}
                onClick={EditResults}
                style={{ cursor: 'pointer', position: 'absolute', top: 10, right: 10 ,scale:'1.3'}}
              />
            )}
               {medicine.NeedPerscription && user.type==="Patient" && <><FontAwesomeIcon icon={faExclamationTriangle} color="orange" size="1x"  />
            <b> Requires Doctor Perscription</b></>}
            <h4>{medicine.Name}</h4>

            {!medicine.discountedPrice &&user.type=="Patient"&&<p><strong>{medicine.Price}.0 EGP </strong></p>}
            {user&& user.type!="Patient" &&<p><strong>{medicine.Price}.0  EGP</strong></p>}
            {user&& user.type=="Patient"&&medicine.discountedPrice &&<p><del>{medicine.Price}.0</del><strong>-{medicine.discountedPrice}.0 EGP</strong></p>}

            <p><strong> </strong>{medicine.Description}</p>

            {user&& user.type=="Patient" && medicine.amount &&
            <p><strong>Amount : </strong>{medicine.amount}</p>}

            {user&& user.type=="Pharmacist" &&  <p><strong>Quantity : </strong>{medicine.Quantity}</p> &&
            <p><strong>Sales : </strong>{medicine.Sales}</p> }
{/* 
            {user && user.type=="Patient"  && medicine.Amount &&
            <button style={{marginTop:"10px"}} onClick={handleSubmit}>Delete From cart</button>} <br></br>  */}

            {/* { Visible && user&& user.type=="Patient" && medicine.Amount && <><strong>Amount in Cart : </strong>{Amount}</>}    */}

            {/* { Visible && user && user.type=="Patient" && medicine.Amount &&
            <button onClick={IncAmount} style={{marginRight:"20px",marginLeft:"20px"}} >+</button>} 

             {Visible && user && user.type=="Patient" && medicine.Amount &&
             <button onClick={DecAmount}>-</button>} <br></br>     */}
            {user && user.type=="Patient"  && !medicine.Amount && !medicine.Quantity==0
             && !medicine.NeedPerscription && <br></br>}

            {user && user.type=="Patient"  && !medicine.Amount && !medicine.Quantity==0  &&
           <button style={{padding:"12px",marginTop:"10px"}} onClick={addToCart} ><FontAwesomeIcon
           icon={faCartShopping}></FontAwesomeIcon> Add To Cart</button>}

            {user && user.type=="Patient" && medicine.Quantity === 0 && <><p style={{ color: 'red' }}><strong>Out Of Stock</strong></p></>}

           {user && user.type=="Patient" && medicine.Quantity === 0 && 
          <button className='Alt' style={{padding:"12px",marginTop:"10px"}} onClick={Alternatives} >Alternatives</button>} 

          </div>
        </form>
} 
      {user && user.type=="Pharmacist" &&
      <button style={{padding:"10px 13px 10px 13px"}} onClick={ArchiveMed} > <FontAwesomeIcon
      icon={faArchive}></FontAwesomeIcon> {Archive} </button>}
        <samp> </samp>
      {user && user.type=="Pharmacist" &&
      <button onClick={addPhoto} style={{padding:"10px 13px 10px 13px"}}> <FontAwesomeIcon
      icon={faImage}></FontAwesomeIcon> Add Picture</button>}

      {user  && <div style={{color:"green"}}>{GoodMessage}</div>}
      {user  && <div style={{color:"red"}}>{BadMessage}</div>}    

      {user && user.type=="Patient" && <div style={{color:"red"}}>{alts}</div>}   
    </div>
  )
}

export default MedicineDetails