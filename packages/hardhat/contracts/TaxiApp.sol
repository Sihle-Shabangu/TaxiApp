// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaxiManagement {
    struct TaxiOwner {
        string name;
        address walletAddress;
        string phone;
    }

    struct Taxi {
        string licensePlate; // Now used as the unique identifier
        uint taxiOwnerId;
        uint routeId; // This can be used to link a taxi to a route
        string taxiType;
        uint numberOfSeats; // Total number of seats in the taxi
    }

    struct Route {
        string startLocation;
        string endLocation;
        uint costPerSeat; // Cost per seat
        uint taxiOwnerId; // Owner of the route
    }

    struct Trip {
        address passenger; // Stores the passenger's address
        string taxiLicensePlate; // Uses license plate as identifier
        uint routeId;
        uint numberOfSeats; // Number of seats booked
        uint totalCost; // Total cost for the trip
    }

    mapping(uint => TaxiOwner) public taxiOwners;
    mapping(string => Taxi) public taxis; // Change to use licensePlate as key
    mapping(uint => Route) public routes; // Route ID as key
    mapping(uint => Trip) public trips;

    mapping(address => uint) public passengerBalances; // New mapping to keep track of passenger balances
    mapping(address => bool) public isTaxiOwner;

    uint public taxiOwnerCount;
    uint public routeCount;
    uint public tripCount;

    // Events
    event RouteAdded(uint indexed routeId, string startLocation, string endLocation, uint costPerSeat, uint indexed taxiOwnerId);
    event TaxiAdded(string indexed licensePlate, uint indexed routeId, uint indexed taxiOwnerId, string taxiType);
    event TripCreated(uint indexed tripId, address indexed passenger, string indexed taxiLicensePlate, uint routeId, uint numberOfSeats, uint totalCost);
    event FundsToppedUp(address indexed passenger, uint amount); // New event for topping up funds

    // Fallback function to receive Ether
    receive() external payable {}

    // Register a new taxi owner
    function registerTaxiOwner(string memory _name, string memory _phone) public {
        require(!isTaxiOwner[msg.sender], "Address already registered as a taxi owner");

        taxiOwnerCount++;
        taxiOwners[taxiOwnerCount] = TaxiOwner(_name, msg.sender, _phone);
        isTaxiOwner[msg.sender] = true;
    }

    // Add a new route
    function addRoute(string memory _startLocation, string memory _endLocation, uint _costPerSeat) public {
        require(isTaxiOwner[msg.sender], "Only taxi owners can add routes");

        routeCount++;
        routes[routeCount] = Route({
            startLocation: _startLocation,
            endLocation: _endLocation,
            costPerSeat: _costPerSeat,
            taxiOwnerId: taxiOwnerCount // Assuming the last registered owner is the one adding
        });

        emit RouteAdded(routeCount, _startLocation, _endLocation, _costPerSeat, taxiOwnerCount);
    }

    // Add a new taxi
    function addTaxi(string memory _licensePlate, uint _routeId, string memory _taxiType, uint _numberOfSeats) public {
        require(isTaxiOwner[msg.sender], "Only taxi owners can add taxis");
        require(taxis[_licensePlate].taxiOwnerId == 0, "Taxi with this license plate already exists");
        require(_routeId > 0 && _routeId <= routeCount, "Route does not exist");

        taxis[_licensePlate] = Taxi({
            licensePlate: _licensePlate,
            taxiOwnerId: taxiOwnerCount, // Assuming the last registered owner is the one adding
            routeId: _routeId,
            taxiType: _taxiType,
            numberOfSeats: _numberOfSeats
        });

        emit TaxiAdded(_licensePlate, _routeId, taxiOwnerCount, _taxiType);
    }

    // Top up funds for a passenger
    function topUp() public payable {
        require(msg.value > 0, "Must send Ether to top up");
        passengerBalances[msg.sender] += msg.value; // Increase the passenger's balance
        emit FundsToppedUp(msg.sender, msg.value); // Emit event for topping up funds
    }

    // Create a new trip
    function createTrip(string memory _taxiLicensePlate, uint _routeId, uint _numberOfSeats) public payable {
    require(_numberOfSeats > 0, "Number of seats must be greater than 0");
    require(_numberOfSeats <= taxis[_taxiLicensePlate].numberOfSeats, "Number of seats exceeds available seats in the taxi");

    uint totalCost = routes[_routeId].costPerSeat * _numberOfSeats;

    // Check if the passenger has enough balance to cover the cost
    uint passengerBalance = passengerBalances[msg.sender];

    if (passengerBalance < totalCost) {
        uint additionalAmount = totalCost - passengerBalance;

        // Require that the passenger sends enough Ether to cover the additional amount
        require(msg.value >= additionalAmount, "Insufficient funds sent for this trip. Please send the additional amount.");
        
        // If extra funds are sent, update the passenger balance
        passengerBalances[msg.sender] += msg.value; // Add the sent value to the balance
    }

    // Deduct the total cost from the passenger's balance
    passengerBalances[msg.sender] -= totalCost;

    // Get the taxi owner's address
    address taxiOwnerAddress = taxiOwners[taxis[_taxiLicensePlate].taxiOwnerId].walletAddress;

    // Transfer the total cost directly to the taxi owner
    (bool success, ) = taxiOwnerAddress.call{value: totalCost}("");
    require(success, "Transfer to taxi owner failed");

    // Create the trip
    Trip memory newTrip = Trip({
        passenger: msg.sender,
        taxiLicensePlate: _taxiLicensePlate, // Store license plate as identifier
        routeId: _routeId,
        numberOfSeats: _numberOfSeats,
        totalCost: totalCost
    });

    tripCount++;
    trips[tripCount] = newTrip;

    // Emit trip created event
    emit TripCreated(tripCount, msg.sender, _taxiLicensePlate, _routeId, _numberOfSeats, totalCost);
    }
    

    function getPassengerBalance() public view returns (uint) {
        return passengerBalances[msg.sender]; // Allow passengers to check their balance
    }
}