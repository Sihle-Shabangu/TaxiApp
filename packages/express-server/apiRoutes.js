import { Router } from 'express';
const router = Router();
import Passenger from './models/Passenger.js';
import TaxiOwner from './models/TaxiBoss.js';
import Driver from './models/Driver.js';
import Taxi from './models/Taxi.js';
import Route from './models/Route.js';
import Trip from './models/Trip.js';

// Check if routes are working
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the Express server!' });
  });


router.post('/passenger', async (req, res) => {
    try{
        const {name, walletAddress, email, phoneNumber} = req.body;
        const newPassenger = new Passenger({name, walletAddress, email, phoneNumber});
        const savedPassenger = await newPassenger.save();
        res.status(201).json(savedPassenger);
    } catch (err) {
        console.error('Error creating passenger',err);
        res.status(500).json({error: "Failed to create passenger"});
      }
});

// Get all passengers
router.get('/passengers', async (req, res) => {
    try {
        const passengers = await Passenger.find();
        res.status(200).json(passengers);
    } catch (err) {
        console.error("Error fetching passengers",err);
        res.status(500).json({error: "Failed to fetch passengers"});
    }
});

// Get passenger by walletAddress
router.get('/passenger/:walletAddress', async (req, res) => {
    try {
        const walletAddress = req.params.walletAddress;
        const passenger = await Passenger
        .findOne({walletAddress: walletAddress});
        if (!passenger) {
            return res.status(404).json({error: "Passenger not found"});
        }
        res.status(200).json(passenger);
    } catch (err) {
        console.error("Error fetching passenger",err);
        res.status(500).json({error: "Failed to fetch passenger"});
    }
});

// Create a new Driver
router.post("/driver",  async (req, res) => {
    try{
        const {name, walletAddress, phoneNumber, taxiId} = req.body;
        // Check if all required fields are provided
        if (!name || !walletAddress || !phoneNumber) {
            return res.status(400).json({ error: "Name, walletAddress, and phoneNumber are required" });
        }
        const newDriver = new Driver({name, walletAddress, phone:phoneNumber, taxi:taxiId});
        const savedDriver = await newDriver.save();
        res.status(201).json(savedDriver);
    } catch (err) {
        console.error("Error creating driver:", err);
        res.status(500).json({error: "Failed to create driver"});
      }
});

// Get all drivers
router.get('/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    } catch (err) {
        console.error("Error fetching drivers",err);
        res.status(500).json({error: "Failed to fetch drivers"});
    }
});

// Get driver by walletAddress
router.get('/driver/:walletAddress', async (req, res) => {
    try {
        const walletAddress = req.params.walletAddress;
        const driver = await Driver
        .findOne({walletAddress: walletAddress});
        if (!driver) {
            return res.status(404).json({error: "Driver not found"});
        }
        res.status(200).json(driver);
    } catch (err) {
        console.error("Error fetching driver",err);
        res.status(500).json({error: "Failed to fetch driver"});
    }
});




// Create new taxiowner
router.post('/taxiowner', async (req, res) => {
    try{
        const {name, walletAddress, phoneNumber} = req.body;
        if (!name || !walletAddress || !phoneNumber) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newTaxiBoss = new TaxiOwner({name, walletAddress, phone:phoneNumber});
        const savedTaxiBoss = await newTaxiBoss.save();
        res.status(201).json(savedTaxiBoss);
    } catch (err) {
        console.error("Error creating Taxi Boss", err);
        res.status(500).json({error: "Failed to create Taxi Boss"});
    }
});

router.get('/taxiowners', async (req, res) => {
    try {
        const taxiOwners = await TaxiOwner.find();
        res.status(200).json(taxiOwners);
    } catch (err) {
        console.error("Error fetching Taxi Bosses",err);
        res.status(500).json({error: "Failed to fetch Taxi Bosses"});
    }
});

// Get taxi owner by walletAddress
router.get('/taxiowner/:walletAddress', async (req, res) => {
    try {
        const walletAddress = req.params.walletAddress;
        const taxiOwner = await TaxiOwner
        .findOne({walletAddress: walletAddress});
        if (!taxiOwner) {
            return res.status(404).json({error: "Taxi Boss not found"});
        }
        res.status(200).json(taxiOwner);
    } catch (err) {
        console.error("Error fetching Taxi Boss",err);
        res.status(500).json({error: "Failed to fetch Taxi Boss"});
    }
});


//Create a new taxi
router.post('/taxi', async (req, res) => {
    try{
        const {licensePlate, taxiOwnerId, routeId, driverId, type, numberOfSeats} = req.body;
        const newTaxi = new Taxi({licensePlate, taxiOwnerId, routeId, driverId, type, numberOfSeats});
        const savedTaxi = await newTaxi.save();
        res.status(201).json(savedTaxi);
    } catch (err) {
        console.error("Error creating a new taxi",err);
        res.status(500).json({error: "Failed to create a new taxi"});
    }
});

// Get taxis by license plate
router.get('/taxi/:licensePlate', async (req, res) => {
    try {
        const licensePlate = req.params.licensePlate;
        const taxi = await Taxi
        .findOne({licensePlate: licensePlate});
        if (!taxi) {
            return res.status(404).json({error: "Taxi not found"});
        }
        res.status(200).json(taxi);
    } catch (err) {
        console.error("Error fetching taxi",err);
        res.status(500).json({error: "Failed to fetch taxi"});
    }
});

// Get all taxis
router.get('/taxis', async (req, res) => {
    try {
        const taxis = await Taxi.find();
        res.status(200).json(taxis);
    } catch (err) {
        console.error("Error fetching taxis",err);
        res.status(500).json({error: "Failed to fetch taxis"});
    }
});



// Create a new route
router.post('/route', async (req, res) => {
    try {
        const {startLocation, endLocation, cost, taxiBossId} = req.body;
        if (!startLocation || !endLocation || !cost || !taxiBossId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newRoute = new Route({startLocation, endLocation, cost, taxiBossId});
        const savedRoute = await newRoute.save();
        res.status(201).json(savedRoute);
    } catch (err) {
        console.error("Error creating route",err);
        res.status(500).json({error: "Failed to create route"});
    }
});

// Get all routes
router.get('/routes', async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    } catch (err) {
        console.error("Error fetching routes",err);
        res.status(500).json({error: "Failed to fetch routes"});
    }
});



// Create a new trip
router.post('/trip', async (req, res) => {
    try{
        const {passengerId, taxiId, routeId, cost} = req.body;
        const newTrip = new Trip ({passengerId, taxiId, routeId, cost});
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        console.error("Error creating trip",err);
        res.status(500).json({error:"Failed to create trip"});
    }
});


export default router;
