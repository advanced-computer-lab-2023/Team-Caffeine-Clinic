const express = require('express');
const mongoose = require('mongoose');
const EmploymentContract = require('../models/emplymentContract');
const Doctor = require('../models/doctor');



const createEmploymentContract = async (req, res) => {
    try {
    //  const { doctor, contractDetails, markup, clinicProfit } = req.body;
    const doctor = req.query.doctor;
    const contractDetails = req.query.contractDetails;
    const markup = req.query.markup;
    const clinicProfit = req.query.clinicProfit;



  
      const employmentContract = new EmploymentContract({
        doctor,
        contractDetails,
        markup,
        clinicProfit
      });
  
      await employmentContract.save();
  
      res.status(201).json({ message: 'Employment contract created successfully', employmentContract });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the employment contract' });
    }
  };

  const getEmploymentContract = async (req, res) => {
    try {
      const doctorUsername = req.query.doctor;
  
      const employmentContract = await EmploymentContract.findOne({ doctor: doctorUsername });
  
      if (!employmentContract) {
        return res.status(404).json({ error: 'Employment contract not found for the specified doctor.' });
      }
  
      res.json(employmentContract);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the employment contract.' });
    }
  };
  

const acceptContract = async (req, res) => {
  try {
    const doctorUsername = req.query.username;

    const updatedContract = await EmploymentContract.findOneAndUpdate(
      { doctor: doctorUsername },
      { $set: { accepted: true } },
      { new: true }
    );
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { username: doctorUsername },
      { $set: { AcceptedContract: true } },
      { new: true }
    );
    
    if (!updatedContract) {
      return res.status(404).json({ error: 'Contract not found.' });
    }

    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found.' });
    }
    res.json({ message: 'Contract accepted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while accepting the contract.' });
  }
};

const rejectContract = async (req, res) => {
  try {
    const doctorUsername = req.query.username;

    const updatedContract = await EmploymentContract.findOneAndUpdate(
      { doctor: doctorUsername },
      { $set: { accepted: false } },
      { new: true }
    );

    const updatedDoctor = await Doctor.findOneAndUpdate(
      { username: doctorUsername },
      { $set: { AcceptedContract: false } },
      { new: true }
    );

    if (!updatedContract) {
      return res.status(404).json({ error: 'Contract not found.' });
    }

    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found.' });
    }

    res.json({ message: 'Contract rejected successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while rejecting the contract.' });
  }
};

  module.exports = { createEmploymentContract,getEmploymentContract ,acceptContract ,rejectContract };

