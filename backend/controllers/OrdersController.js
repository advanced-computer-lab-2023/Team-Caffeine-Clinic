const { default: mongoose } = require('mongoose')
const Order = require('../models/Orders.js');

const Report = async (req, res) => {
  try {
    const { month } = req.body;

    // Assuming month is in the format 'YYYY-MM'
    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));

    const matchCondition = {
      createdAt: {
        $gte: startDate,
        $lt: endDate
      },
      status: { $in: ['Delivered', 'In delivery'] }
    };

    const result = await Order.aggregate([
      {
        $match: matchCondition
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          date: { $first: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } },
          orders: { $push: '$$ROOT' }, // Push the entire order details into an array
          totalSales: { $sum: '$TotalPrice' } // Sum TotalPrice for each order
        } 
      }
    ]);
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const ReportMedicines = async (req, res) => {
  try {
    const { month } = req.body;

    // Assuming date is in the format 'YYYY-MM-DD'
    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));

    const matchCondition = {
      createdAt: {
        $gte: startDate,
        $lt: endDate
      },
      status: { $in: ['Delivered', 'In delivery'] } // Adjust based on your definition of a completed/successful sale
    };

    const result = await Order.aggregate([
      {
        $match: matchCondition
      },
      {
        $unwind: '$medicines'
      },
      {
        $lookup: {
          from: 'medicines',
          localField: 'medicines.medicineid',
          foreignField: '_id',
          as: 'medicineDetails'
        }
      },
      {
        $unwind: '$medicineDetails'
      },
      {
        $group: {
          _id: '$medicines.medicineid',
          medicineName: { $first: '$medicineDetails.Name' },
          medicinePrice: { $first: '$medicineDetails.Price' },
          totalAmount: { $sum: '$medicines.amount' },
          totalSales: { $sum: { $multiply: ['$medicines.amount', '$medicineDetails.Price'] } }, 
          inStock: {$last: '$medicines.stock'},
          Reserved: {$last: '$medicines.Reserved'},
          Returned: {$last: '$medicines.Returned'},
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const ReportByDate = async (req, res) => {
  try {
    const { date } = req.body;

    // Assuming date is in the format 'YYYY-MM-DD'
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 1));

    const matchCondition = {
      createdAt: {
        $gte: startDate,
        $lt: endDate
      },
      status: { $in: ['Delivered', 'In delivery'] }
    };

    const result = await Order.aggregate([
      {
        $match: matchCondition
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          date: { $first: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } },
          orders: { $push: '$$ROOT' }, // Push the entire order details into an array
          totalSales: { $sum: '$TotalPrice' } // Sum TotalPrice for each order
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const ReportMedicinesByDate = async (req, res) => {
  try {
    const { date } = req.body;

    // Assuming date is in the format 'YYYY-MM-DD'
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 1));

    const matchCondition = {
      createdAt: {
        $gte: startDate,
        $lt: endDate
      },
      status: { $in: ['Delivered', 'In delivery'] } // Adjust based on your definition of a completed/successful sale
    };

    const result = await Order.aggregate([
      {
        $match: matchCondition
      },
      {
        $unwind: '$medicines'
      },
      {
        $lookup: {
          from: 'medicines',
          localField: 'medicines.medicineid',
          foreignField: '_id',
          as: 'medicineDetails'
        }
      },
      {
        $unwind: '$medicineDetails'
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
            _id: '$medicines.medicineid'
          },
          _id: '$medicines.medicineid',
          date: { $first: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } },
          medicineName: { $first: '$medicineDetails.Name' },
          medicinePrice: { $first: '$medicineDetails.Price' },
          totalAmount: { $sum: '$medicines.amount' },
          totalSales: { $sum: { $multiply: ['$medicines.amount', '$medicineDetails.Price'] } }, 
          inStock: {$last: '$medicines.stock'},
          Reserved: {$last: '$medicines.Reserved'},
          Returned: {$last: '$medicines.Returned'},
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const ReportByMedicine = async (req, res) => {
  try {
    const { month, medicineid } = req.body;

    // Assuming date is in the format 'YYYY-MM-DD'
    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate
          },
          'medicines.medicineid': new mongoose.Types.ObjectId(medicineid),
        }
      },
      {
        $addFields: {
          medicines: {
            $filter: {
              input: '$medicines',
              as: 'medicine',
              cond: {
                $eq: ['$$medicine.medicineid', new mongoose.Types.ObjectId(medicineid)]
              }
            }
          }
        }
      },
      {
        $unwind: '$medicines'
      },
      {
        $lookup: {
          from: 'medicines',
          localField: 'medicines.medicineid',
          foreignField: '_id',
          as: 'medicineDetails'
        }
      },
      {
        $unwind: '$medicineDetails'
      },
      {
        $project: {
          _id: 1,
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          medicineId: '$medicines.medicineid',
          medicineName: '$medicineDetails.Name',
          amount: '$medicines.amount',
          price: '$medicineDetails.Price',
          totalPrice: { $multiply: ['$medicines.amount', '$medicineDetails.Price'] }, 
          inStock: '$medicines.stock',
          Reserved: '$medicines.Reserved',
          Returned: '$medicines.Returned',
        }
      },
      {
        $group: {
          _id: {
            year: { $year: { $dateFromString: { dateString: '$date' } } },
            month: { $month: { $dateFromString: { dateString: '$date' } } },
            day: { $dayOfMonth: { $dateFromString: { dateString: '$date' } } },
          },
          date: { $first: '$date' },
          details: {
            $push: {
              _id: '$_id',
              medicineId: '$medicineId',
              medicineName: '$medicineName',
              amount: '$amount',
              price: '$price',
              totalPrice: '$totalPrice',
              inStock: '$inStock',
              Reserved: '$Reserved',
              Returned: '$Returned',
            }
          },
          totalSales: {$sum: '$totalPrice'}
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const ReportMedicinesByMedicine = async (req, res) => {
  try {
    const { month, medicineid } = req.body;

    // Assuming date is in the format 'YYYY-MM-DD'
    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate
          },
          'medicines.medicineid': new mongoose.Types.ObjectId(medicineid),
          status: { $in: ['Delivered', 'In delivery'] } // Adjust based on your definition of a completed/successful sale
        }
      },
      {
        $addFields: {
          medicines: {
            $map: {
              input: {
                $filter: {
                  input: '$medicines',
                  as: 'medicine',
                  cond: {
                    $eq: ['$$medicine.medicineid', new mongoose.Types.ObjectId(medicineid)]
                  }
                }
              },
              as: 'filteredMedicine',
              in: {
                medicineid: '$$filteredMedicine.medicineid',
                amount: '$$filteredMedicine.amount',
                Reserved: '$$filteredMedicine.Reserved',
                Returned: '$$filteredMedicine.Returned',
                stock: '$$filteredMedicine.stock',
              }
            }
          }
        }
      },
      {
        $unwind: '$medicines'
      },
      {
        $lookup: {
          from: 'medicines',
          localField: 'medicines.medicineid',
          foreignField: '_id',
          as: 'medicineDetails'
        }
      },
      {
        $unwind: '$medicineDetails'
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
            _id: '$medicines.medicineid'
          },
          _id: '$medicines.medicineid',
          date: { $first: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } },
          medicineName: { $first: '$medicineDetails.Name' },
          medicinePrice: { $first: '$medicineDetails.Price' },
          totalAmount: { $sum: '$medicines.amount' },
          totalSales: { $sum: { $multiply: ['$medicines.amount', '$medicineDetails.Price'] } }, 
          inStock: {$last: '$medicines.stock'},
          Reserved: {$last: '$medicines.Reserved'},
          Returned: {$last: '$medicines.Returned'},
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const ReportByDateAndMedicine = async (req, res) => {
  try {
    const { date, medicineid } = req.body;

    // Assuming date is in the format 'YYYY-MM-DD'
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 1));

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate
          },
          'medicines.medicineid': new mongoose.Types.ObjectId(medicineid),
        }
      },
      {
        $addFields: {
          medicines: {
            $filter: {
              input: '$medicines',
              as: 'medicine',
              cond: {
                $eq: ['$$medicine.medicineid', new mongoose.Types.ObjectId(medicineid)]
              }
            }
          }
        }
      },
      {
        $unwind: '$medicines'
      },
      {
        $lookup: {
          from: 'medicines',
          localField: 'medicines.medicineid',
          foreignField: '_id',
          as: 'medicineDetails'
        }
      },
      {
        $unwind: '$medicineDetails'
      },
      {
        $project: {
          _id: 1,
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          medicineId: '$medicines.medicineid',
          medicineName: '$medicineDetails.Name',
          amount: '$medicines.amount',
          price: '$medicineDetails.Price',
          totalPrice: { $multiply: ['$medicines.amount', '$medicineDetails.Price'] },  
          inStock: '$medicines.stock',
          Reserved: '$medicines.Reserved',
          Returned: '$medicines.Returned',
        }
      },
      {
        $group: {
          _id: {
            year: { $year: { $dateFromString: { dateString: '$date' } } },
            month: { $month: { $dateFromString: { dateString: '$date' } } },
            day: { $dayOfMonth: { $dateFromString: { dateString: '$date' } } },
          },
          date: { $first: '$date' },
          details: {
            $push: {
              _id: '$_id',
              medicineId: '$medicineId',
              medicineName: '$medicineName',
              amount: '$amount',
              price: '$price',
              totalPrice: '$totalPrice',
              inStock: '$inStock',
              Reserved: '$Reserved',
              Returned: '$Returned',
            }
          },
          totalSales: {$sum: '$totalPrice'}
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const ReportMedicinesByDateAndMedicine = async (req, res) => {
  try {
    const { date, medicineid } = req.body;

    // Assuming date is in the format 'YYYY-MM-DD'
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 1));

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate
          },
          'medicines.medicineid': new mongoose.Types.ObjectId(medicineid),
          status: { $in: ['Delivered', 'In delivery'] } // Adjust based on your definition of a completed/successful sale
        }
      },
      {
        $addFields: {
          medicines: {
            $map: {
              input: {
                $filter: {
                  input: '$medicines',
                  as: 'medicine',
                  cond: {
                    $eq: ['$$medicine.medicineid', new mongoose.Types.ObjectId(medicineid)]
                  }
                }
              },
              as: 'filteredMedicine',
              in: {
                medicineid: '$$filteredMedicine.medicineid',
                amount: '$$filteredMedicine.amount',
                Reserved: '$$filteredMedicine.Reserved',
                Returned: '$$filteredMedicine.Returned',
                stock: '$$filteredMedicine.stock',
              }
            }
          }
        }
      },
      {
        $unwind: '$medicines'
      },
      {
        $lookup: {
          from: 'medicines',
          localField: 'medicines.medicineid',
          foreignField: '_id',
          as: 'medicineDetails'
        }
      },
      {
        $unwind: '$medicineDetails'
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
            _id: '$medicines.medicineid'
          },
          _id: '$medicines.medicineid',
          date: { $first: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } },
          medicineName: { $first: '$medicineDetails.Name' },
          medicinePrice: { $first: '$medicineDetails.Price' },
          totalAmount: { $sum: '$medicines.amount' },
          totalSales: { $sum: { $multiply: ['$medicines.amount', '$medicineDetails.Price'] } },
          inStock: {$last: '$medicines.stock'},
          Reserved: {$last: '$medicines.Reserved'},
          Returned: {$last: '$medicines.Returned'},
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const Dates = async (req, res) => {
  try {
    const { month } = req.body;

    // Assuming month is in the format 'YYYY-MM'
    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          }
        }
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: {
                $dateFromParts: {
                  year: '$_id.year',
                  month: '$_id.month',
                  day: '$_id.day',
                }
              }
            }
          }
        }
      },
      {
        $sort: { date: 1 } // Optional: Sort the dates if needed
      }
    ]);

    const dates = result.map(item => item.date);

    res.json(dates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const Medicines = async (req, res) => {
  try {
    const { month } = req.body;

    // Assuming month is in the format 'YYYY-MM'
    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate
          }
        }
      },
      {
        $unwind: '$medicines'
      },
      {
        $lookup: {
          from: 'medicines',
          localField: 'medicines.medicineid',
          foreignField: '_id',
          as: 'medicineDetails'
        }
      },
      {
        $unwind: '$medicineDetails'
      },
      {
        $group: {
          _id: {
            medicineid: '$medicines.medicineid',
            medicinename: '$medicineDetails.Name'
          }
        }
      },
      {
        $project: {
          _id: 0,
          medicineid: '$_id.medicineid',
          medicinename: '$_id.medicinename'
        }
      },
      {
        $sort: { medicinename: 1 } // Optional: Sort the medicines if needed
      }
    ]);

    const medicines = result.map(item => ({ medicineid: item.medicineid, medicinename: item.medicinename }));

    res.json(medicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  Report,
  ReportMedicines,
  ReportByDate,
  ReportMedicinesByDate,
  ReportByMedicine,
  ReportMedicinesByMedicine,
  ReportByDateAndMedicine,
  ReportMedicinesByDateAndMedicine,
  Dates,
  Medicines
};
