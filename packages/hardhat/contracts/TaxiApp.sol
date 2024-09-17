// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaxiManagement {
    struct Passenger {
        string name;
        address walletAddress;
        string email;
        string phoneNumber;
    }

    struct TaxiOwner {
        string name;
        address walletAddress;
        string phone;
    }

    struct Taxi {
        string licensePlate;
        uint taxiOwnerId;
        uint routeId;
        string taxiType;
        uint numberOfSeats;
    }

    struct Route {
        string startLocation;
        string endLocation;
        uint costPerSeat; // Cost per seat
        uint taxiOwnerId; // Owner of the route
    }

    struct Trip {
        uint passengerId;
        uint taxiId;
        uint routeId;
        uint numberOfSeats; // Number of seats booked
        uint totalCost; // Total cost for the trip
    }

    mapping(uint => Passenger) public passengers;
    mapping(uint => TaxiOwner) public taxiOwners;
    mapping(uint => Taxi) public taxis;
    mapping(uint => Route) public routes;
    mapping(uint => Trip) public trips;

    mapping(address => bool) public isTaxiOwner; // Track if an address is already a taxi owner
    mapping(address => bool) public isPassenger; // Track if an address is already a passenger

    uint public passengerCount;
    uint public taxiOwnerCount;
    uint public taxiCount;
    uint public routeCount;
    uint public tripCount;

    // Events
    event PassengerAdded(uint indexed passengerId, string name);
    event RouteAdded(uint indexed routeId, string startLocation, string endLocation, uint costPerSeat, uint indexed taxiOwnerId);
    event TaxiAdded(uint indexed taxiId, string licensePlate, uint indexed routeId, uint indexed taxiOwnerId, string taxiType);
    event TripCreated(uint indexed tripId, uint indexed passengerId, uint indexed taxiId, uint routeId, uint numberOfSeats, uint totalCost);

    // Add a new passenger
    function addPassenger(string memory _name, string memory _email, string memory _phoneNumber) public {
        require(!isPassenger[msg.sender], "Address already registered as a passenger");

        passengerCount++;
        passengers[passengerCount] = Passenger(_name, msg.sender, _email, _phoneNumber);
        isPassenger[msg.sender] = true; // Mark this address as a registered passenger
        emit PassengerAdded(passengerCount, _name);
    }

    // Register a new taxi owner
    function registerTaxiOwner(string memory _name, string memory _phone) public {
        require(!isTaxiOwner[msg.sender], "Address already registered as a taxi owner");

        taxiOwnerCount++;
        taxiOwners[taxiOwnerCount] = TaxiOwner(_name, msg.sender, _phone);
        isTaxiOwner[msg.sender] = true; // Mark this address as a registered taxi owner
    }

    // Add a new route (only by taxi owner)
    function addRoute(string memory _startLocation, string memory _endLocation, uint _costPerSeat) public {
        uint ownerId = findTaxiOwnerId(msg.sender);
        require(ownerId != 0, "Not authorized");

        routeCount++;
        routes[routeCount] = Route(_startLocation, _endLocation, _costPerSeat, ownerId);
        emit RouteAdded(routeCount, _startLocation, _endLocation, _costPerSeat, ownerId);
    }

    // Add a new taxi (only by the owner of that route)
    function addTaxi(string memory _licensePlate, uint _routeId, string memory _taxiType, uint _numberOfSeats) public {
        uint ownerId = routes[_routeId].taxiOwnerId;
        require(taxiOwners[ownerId].walletAddress == msg.sender, "Not authorized to add taxi to this route");

        taxiCount++;
        taxis[taxiCount] = Taxi(_licensePlate, ownerId, _routeId, _taxiType, _numberOfSeats);
        emit TaxiAdded(taxiCount, _licensePlate, _routeId, ownerId, _taxiType);
    }

    // Create a new trip
    function createTrip(uint _passengerId, uint _taxiId, uint _routeId, uint _numberOfSeats) public payable {
        require(passengers[_passengerId].walletAddress == msg.sender, "Not authorized");
        require(_numberOfSeats > 0, "Number of seats must be greater than 0");

        uint totalCost = routes[_routeId].costPerSeat * _numberOfSeats;
        require(msg.value >= totalCost, "Insufficient funds sent");

        Trip memory newTrip = Trip({
            passengerId: _passengerId,
            taxiId: _taxiId,
            routeId: _routeId,
            numberOfSeats: _numberOfSeats,
            totalCost: totalCost
        });

        tripCount++;
        trips[tripCount] = newTrip;

        // Transfer funds to the taxi owner's wallet
        payable(taxiOwners[routes[_routeId].taxiOwnerId].walletAddress).transfer(totalCost);
        emit TripCreated(tripCount, _passengerId, _taxiId, _routeId, _numberOfSeats, totalCost);
    }

    // Helper function to find taxi owner ID by address
    function findTaxiOwnerId(address _ownerAddress) internal view returns (uint) {
        for (uint i = 1; i <= taxiOwnerCount; i++) {
            if (taxiOwners[i].walletAddress == _ownerAddress) {
                return i;
            }
        }
        return 0; // Not found
    }

    // Getter functions without parameters

    function getAllPassengers() public view returns (string[] memory, address[] memory, string[] memory, string[] memory) {
        string[] memory names = new string[](passengerCount);
        address[] memory wallets = new address[](passengerCount);
        string[] memory emails = new string[](passengerCount);
        string[] memory phoneNumbers = new string[](passengerCount);

        for (uint i = 1; i <= passengerCount; i++) {
            Passenger storage p = passengers[i];
            names[i - 1] = p.name;
            wallets[i - 1] = p.walletAddress;
            emails[i - 1] = p.email;
            phoneNumbers[i - 1] = p.phoneNumber;
        }
        return (names, wallets, emails, phoneNumbers);
    }

    function getAllTaxiOwners() public view returns (string[] memory, address[] memory, string[] memory) {
        string[] memory names = new string[](taxiOwnerCount);
        address[] memory wallets = new address[](taxiOwnerCount);
        string[] memory phones = new string[](taxiOwnerCount);

        for (uint i = 1; i <= taxiOwnerCount; i++) {
            TaxiOwner storage owner = taxiOwners[i];
            names[i - 1] = owner.name;
            wallets[i - 1] = owner.walletAddress;
            phones[i - 1] = owner.phone;
        }
        return (names, wallets, phones);
    }

    function getAllTaxis() public view returns (string[] memory, uint[] memory, uint[] memory, string[] memory, uint[] memory) {
        string[] memory licensePlates = new string[](taxiCount);
        uint[] memory ownerIds = new uint[](taxiCount);
        uint[] memory routeIds = new uint[](taxiCount);
        string[] memory taxiTypes = new string[](taxiCount);
        uint[] memory numberOfSeats = new uint[](taxiCount);

        for (uint i = 1; i <= taxiCount; i++) {
            Taxi storage t = taxis[i];
            licensePlates[i - 1] = t.licensePlate;
            ownerIds[i - 1] = t.taxiOwnerId;
            routeIds[i - 1] = t.routeId;
            taxiTypes[i - 1] = t.taxiType;
            numberOfSeats[i - 1] = t.numberOfSeats;
        }
        return (licensePlates, ownerIds, routeIds, taxiTypes, numberOfSeats);
    }

    function getAllRoutes() public view returns (string[] memory, string[] memory, uint[] memory, uint[] memory) {
        string[] memory startLocations = new string[](routeCount);
        string[] memory endLocations = new string[](routeCount);
        uint[] memory costs = new uint[](routeCount);
        uint[] memory ownerIds = new uint[](routeCount);

        for (uint i = 1; i <= routeCount; i++) {
            Route storage r = routes[i];
            startLocations[i - 1] = r.startLocation;
            endLocations[i - 1] = r.endLocation;
            costs[i - 1] = r.costPerSeat;
            ownerIds[i - 1] = r.taxiOwnerId;
        }
        return (startLocations, endLocations, costs, ownerIds);
    }

    function getAllTrips() public view returns (uint[] memory, uint[] memory, uint[] memory, uint[] memory, uint[] memory) {
        uint[] memory passengerIds = new uint[](tripCount);
        uint[] memory taxiIds = new uint[](tripCount);
        uint[] memory routeIds = new uint[](tripCount);
        uint[] memory numberOfSeats = new uint[](tripCount);
        uint[] memory totalCosts = new uint[](tripCount);

        for (uint i = 1; i <= tripCount; i++) {
            Trip storage trip = trips[i];
            passengerIds[i - 1] = trip.passengerId;
            taxiIds[i - 1] = trip.taxiId;
            routeIds[i - 1] = trip.routeId;
            numberOfSeats[i - 1] = trip.numberOfSeats;
            totalCosts[i - 1] = trip.totalCost;
        }
        return (passengerIds, taxiIds, routeIds, numberOfSeats, totalCosts);
    }

    //TODO
    // Fallback function to receive Ether
    receive() external payable {}
}