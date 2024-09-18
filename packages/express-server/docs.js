/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a simple greeting
 *     responses:
 *       200:
 *         description: A successful response
 *       500:
 *         description: An error response
 */

// Create a new passenger
/**
 * @swagger
 * tags:
 *   name: Passenger
 *   description: API endpoints for managing passengers
 *
 * /api/passenger:
 *   post:
 *     summary: Create a new passenger
 *     tags: [Passenger]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Iris Rasebetse"
 *                 description: The name of the passenger
 *               walletAddress:
 *                 type: string
 *                 example: "0x1234567890abcdef1234567890abcdef12345678"
 *                 description: The wallet address of the passenger
 *               email:
 *                 type: string
 *                 example: "irisr@example.com"
 *                 description: The email address of the passenger
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: The phone number of the passenger
 *             required:
 *               - name
 *               - walletAddress
 *               - email
 *               - phoneNumber
 *     responses:
 *       201:
 *         description: Successfully created a new passenger
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *                   description: The unique ID of the newly created passenger
 *                 name:
 *                   type: string
 *                   example: "Iris Rasebetse"
 *                 walletAddress:
 *                   type: string
 *                   example: "0x1234567890abcdef1234567890abcdef12345678"
 *                 email:
 *                   type: string
 *                   example: "irirs@example.com"
 *                 phoneNumber:
 *                   type: string
 *                   example: "+1234567890"
 *                 trips:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                   description: List of trip IDs associated with the passenger
 *       500:
 *         description: An error occurred while creating the passenger
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create passenger"
 */

/**
 * @swagger
 * tags:
 *   name: Passenger
 *   description: API endpoints for managing passengers
 *
 * /api/passengers:
 *   get:
 *     summary: Get all passengers
 *     tags: [Passenger]
 *     responses:
 *       200:
 *         description: A list of all passengers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "605c72ef1f1b2c001f8b4567"
 *                     description: The unique ID of the passenger
 *                   name:
 *                     type: string
 *                     example: "Iris Rasebetse"
 *                   walletAddress:
 *                     type: string
 *                     example: "0x1234567890abcdef1234567890abcdef12345678"
 *                   email:
 *                     type: string
 *                     example: "irisr@example.com"
 *                   phoneNumber:
 *                     type: string
 *                     example: "+1234567890"
 *                   trips:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: []
 *                     description: List of trip IDs associated with the passenger
 *       500:
 *         description: An error occurred while fetching passengers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch passengers"
 */


/**
 * @swagger
 * tags:
 *   name: Passenger
 *   description: API endpoints for managing passengers
 *
 * /api/passenger/{walletAddress}:
 *   get:
 *     summary: Get a passenger by wallet address
 *     tags: [Passenger]
 *     parameters:
 *       - name: walletAddress
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address of the passenger to retrieve
 *     responses:
 *       200:
 *         description: A single passenger record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *                   description: The unique ID of the passenger
 *                 name:
 *                   type: string
 *                   example: "Iris Rasebetse"
 *                 walletAddress:
 *                   type: string
 *                   example: "0x1234567890abcdef1234567890abcdef12345678"
 *                 email:
 *                   type: string
 *                   example: "irisr@example.com"
 *                 phoneNumber:
 *                   type: string
 *                   example: "+1234567890"
 *                 trips:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                   description: List of trip IDs associated with the passenger
 *       404:
 *         description: Passenger not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Passenger not found"
 *       500:
 *         description: An error occurred while fetching the passenger
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch passenger"
 */


/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: API endpoints for managing drivers
 *
 * /api/driver:
 *   post:
 *     summary: Create a new driver
 *     tags: [Driver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mpiyakhe Zungu"
 *                 description: The name of the driver
 *               walletAddress:
 *                 type: string
 *                 example: "0xabcdef1234567890abcdef1234567890abcdef12"
 *                 description: The unique wallet address of the driver
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: The phone number of the driver
 *               taxiId:
 *                 type: string
 *                 example: "605c72ef1f1b2c001f8b4567"
 *                 description: The ID of the taxi assigned to the driver
 *             required:
 *               - name
 *               - walletAddress
 *               - phoneNumber
 *     responses:
 *       201:
 *         description: Successfully created a new driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *                   description: The unique ID of the newly created driver
 *                 name:
 *                   type: string
 *                   example: "Mpiyakhe Zungu"
 *                 walletAddress:
 *                   type: string
 *                   example: "0xabcdef1234567890abcdef1234567890abcdef12"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 taxi:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *                   description: The ID of the taxi assigned to the driver
 *       500:
 *         description: An error occurred while creating the driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create driver"
 */

/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: API endpoints for managing drivers
 * 
 * /api/drivers:
 *   get:
 *     summary: Retrieve a list of all drivers
 *     tags: [Driver]
 *     responses:
 *       200:
 *         description: A successful response containing a list of drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "605c72ef1f1b2c001f8b4567"
 *                     description: The unique ID of the driver
 *                   walletAddress:
 *                     type: string
 *                     example: "0x1234567890abcdef1234567890abcdef12345678"
 *                     description: The wallet address of the driver
 *                   name:
 *                     type: string
 *                     example: "Mkabayi Zungu"
 *                     description: The name of the driver
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *                     description: The phone number of the driver
 *                   taxi:
 *                     type: string
 *                     example: "605c72ef1f1b2c001f8b4568"
 *                     description: The ID of the associated taxi
 *       500:
 *         description: An error occurred while fetching the drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch drivers"
 */
/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: API endpoints for managing drivers
 * 
 * /api/drivers:
 *   get:
 *     summary: Retrieve a list of all drivers
 *     tags: [Driver]
 *     responses:
 *       200:
 *         description: A successful response containing a list of drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "605c72ef1f1b2c001f8b4567"
 *                     description: The unique ID of the driver
 *                   walletAddress:
 *                     type: string
 *                     example: "0x1234567890abcdef1234567890abcdef12345678"
 *                     description: The wallet address of the driver
 *                   name:
 *                     type: string
 *                     example: "Madlenkosi Ndlovu"
 *                     description: The name of the driver
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *                     description: The phone number of the driver
 *                   taxi:
 *                     type: string
 *                     example: "605c72ef1f1b2c001f8b4568"
 *                     description: The ID of the associated taxi
 *       500:
 *         description: An error occurred while fetching the drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch drivers"
 */

/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: API endpoints for managing drivers
 * 
 * /api/driver/{walletAddress}:
 *   get:
 *     summary: Retrieve a driver by wallet address
 *     tags: [Driver]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address of the driver to retrieve
 *     responses:
 *       200:
 *         description: A successful response containing the driver information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *                   description: The unique ID of the driver
 *                 walletAddress:
 *                   type: string
 *                   example: "0x1234567890abcdef1234567890abcdef12345678"
 *                   description: The wallet address of the driver
 *                 name:
 *                   type: string
 *                   example: "Qaphela Ngwenya"
 *                   description: The name of the driver
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                   description: The phone number of the driver
 *                 taxi:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4568"
 *                   description: The ID of the associated taxi
 *       404:
 *         description: Driver not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Driver not found"
 *       500:
 *         description: An error occurred while fetching the driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch driver"
 */


/**
 * @swagger
 * tags:
 *   name: TaxiOwner
 *   description: API endpoints for managing taxi owners
 *
 * /api/taxiowner:
 *   post:
 *     summary: Create a new taxi owner
 *     tags: [TaxiOwner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Samson Ndlovu"
 *                 description: The name of the taxi owner
 *               walletAddress:
 *                 type: string
 *                 example: "0x1234567890abcdef1234567890abcdef12345678"
 *                 description: The wallet address of the taxi owner
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: The phone number of the taxi owner
 *             required:
 *               - name
 *               - walletAddress
 *               - phone
 *     responses:
 *       201:
 *         description: Successfully created a new taxi owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f8"
 *                   description: The unique ID of the newly created taxi owner
 *                 name:
 *                   type: string
 *                   example: "Samson Ndlovu"
 *                 walletAddress:
 *                   type: string
 *                   example: "0x1234567890abcdef1234567890abcdef12345678"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 taxis:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of taxi IDs associated with the taxi owner
 *                   example: []
 *                 routes:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of route IDs associated with the taxi owner
 *                   example: []
 *       400:
 *         description: Bad request due to missing required fields or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 *       500:
 *         description: An error occurred while creating the taxi owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create Taxi Owner"
 */

// Get all taxi owners
/**
 * @swagger
 * tags:
 *   name: TaxiOwner
 *   description: API endpoints for managing taxi owners
 *
 * /api/taxiowners:
 *   get:
 *     summary: Retrieve all taxi owners
 *     tags: [TaxiOwner]
 *     responses:
 *       200:
 *         description: Successfully fetched all taxi owners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64b2d5f3429a1c6a8f99a2f8"
 *                     description: The unique ID of the taxi owner
 *                   name:
 *                     type: string
 *                     example: "Samson Ndlovu"
 *                   walletAddress:
 *                     type: string
 *                     example: "0x1234567890abcdef1234567890abcdef12345678"
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *                   taxis:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: List of taxi IDs associated with the taxi owner
 *                     example: []
 *                   routes:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: List of route IDs associated with the taxi owner
 *                     example: []
 *       500:
 *         description: An error occurred while fetching taxi owners
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch Taxi Bosses"
 */

/**
 * @swagger
 * tags:
 *   name: TaxiOwner
 *   description: API endpoints for managing taxi owners
 *
 * /api/taxiowner/{walletAddress}:
 *   get:
 *     summary: Retrieve a taxi owner by wallet address
 *     tags: [TaxiOwner]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address of the taxi owner
 *     responses:
 *       200:
 *         description: Successfully fetched the taxi owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f8"
 *                   description: The unique ID of the taxi owner
 *                 name:
 *                   type: string
 *                   example: "Mpiyakhe Zungu"
 *                 walletAddress:
 *                   type: string
 *                   example: "0x1234567890abcdef1234567890abcdef12345678"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 taxis:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of taxi IDs associated with the taxi owner
 *                   example: []
 *                 routes:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of route IDs associated with the taxi owner
 *                   example: []
 *       404:
 *         description: Taxi owner not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Taxi Boss not found"
 *       500:
 *         description: An error occurred while fetching the taxi owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch Taxi Owner"
 */

/**
 * @swagger
 * tags:
 *   name: Taxi
 *   description: API endpoints for managing taxis
 *
 * /api/taxi:
 *   post:
 *     summary: Create a new taxi
 *     tags: [Taxi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licensePlate:
 *                 type: string
 *                 example: "ABC123-GP"
 *                 description: The license plate of the taxi
 *               taxiOwnerId:
 *                 type: string
 *                 example: "64b2d5f3429a1c6a8f99a2f8"
 *                 description: The ID of the taxi owner
 *               driverId:
 *                 type: string
 *                 example: "64b2d5f3429a1c6a8f99a2f9"
 *                 description: The ID of the driver
 *               routeId:
 *                 type: string
 *                 example: "64b2d5f3429a1c6a8f99a2f7"
 *                 description: The ID of the route
 *               type:
 *                 type: string
 *                 example: "Quantum"
 *                 description: The type of the taxi
 *               numberOfSeats:
 *                 type: integer
 *                 example: 15
 *                 description: The number of seats in the taxi
 *             required:
 *               - licensePlate
 *               - taxiOwnerId
 *               - type
 *               - numberOfSeats
 *     responses:
 *       201:
 *         description: Successfully created a new taxi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f6"
 *                   description: The unique ID of the newly created taxi
 *                 licensePlate:
 *                   type: string
 *                   example: "ABC1234"
 *                 taxiOwnerId:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f8"
 *                 driverId:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f9"
 *                 routeId:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f7"
 *                 type:
 *                   type: string
 *                   example: "Quantum"
 *                 numberOfSeats:
 *                   type: integer
 *                   example: 15
 *       500:
 *         description: An error occurred while creating the taxi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create a new taxi"
 */

/**
 * @swagger
 * tags:
 *   name: Taxi
 *   description: API endpoints for managing taxis
 *
 * /api/taxi/{licensePlate}:
 *   get:
 *     summary: Retrieve a taxi by license plate
 *     tags: [Taxi]
 *     parameters:
 *       - in: path
 *         name: licensePlate
 *         required: true
 *         schema:
 *           type: string
 *         description: The license plate of the taxi
 *     responses:
 *       200:
 *         description: Successfully fetched the taxi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f6"
 *                   description: The unique ID of the taxi
 *                 licensePlate:
 *                   type: string
 *                   example: "ABC1234"
 *                 taxiOwnerId:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f8"
 *                 driverId:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f9"
 *                 routeId:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f7"
 *                 type:
 *                   type: string
 *                   example: "Sedan"
 *                 numberOfSeats:
 *                   type: integer
 *                   example: 4
 *       404:
 *         description: Taxi not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Taxi not found"
 *       500:
 *         description: An error occurred while fetching the taxi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch taxi"
 */

/**
 * @swagger
 * tags:
 *   name: Taxi
 *   description: API endpoints for managing taxis
 *
 * /api/taxis:
 *   get:
 *     summary: Retrieve all taxis
 *     tags: [Taxi]
 *     responses:
 *       200:
 *         description: Successfully fetched all taxis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64b2d5f3429a1c6a8f99a2f6"
 *                     description: The unique ID of the taxi
 *                   licensePlate:
 *                     type: string
 *                     example: "ABC1234"
 *                   taxiOwnerId:
 *                     type: string
 *                     example: "64b2d5f3429a1c6a8f99a2f8"
 *                   driverId:
 *                     type: string
 *                     example: "64b2d5f3429a1c6a8f99a2f9"
 *                   routeId:
 *                     type: string
 *                     example: "64b2d5f3429a1c6a8f99a2f7"
 *                   type:
 *                     type: string
 *                     example: "Sedan"
 *                   numberOfSeats:
 *                     type: integer
 *                     example: 4
 *       500:
 *         description: An error occurred while fetching taxis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch taxis"
 */

/**
 * @swagger
 * tags:
 *   name: Route
 *   description: API endpoints for managing routes
 *
 * /api/route:
 *   post:
 *     summary: Create a new route
 *     tags: [Route]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startLocation:
 *                 type: string
 *                 example: "Downtown"
 *                 description: The starting location of the route
 *               endLocation:
 *                 type: string
 *                 example: "Airport"
 *                 description: The ending location of the route
 *               cost:
 *                 type: number
 *                 example: 25.50
 *                 description: The cost of the route
 *               taxiBossId:
 *                 type: string
 *                 example: "64b2d5f3429a1c6a8f99a2f8"
 *                 description: The ID of the taxi boss managing this route
 *             required:
 *               - startLocation
 *               - endLocation
 *               - cost
 *               - taxiBossId
 *     responses:
 *       201:
 *         description: Successfully created a new route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f6"
 *                   description: The unique ID of the newly created route
 *                 startLocation:
 *                   type: string
 *                   example: "Downtown"
 *                 endLocation:
 *                   type: string
 *                   example: "Airport"
 *                 cost:
 *                   type: number
 *                   example: 25.50
 *                 taxiBossId:
 *                   type: string
 *                   example: "64b2d5f3429a1c6a8f99a2f8"
 *       500:
 *         description: An error occurred while creating the route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create route"
 */

/**
 * @swagger
 * tags:
 *   name: Route
 *   description: API endpoints for managing routes
 *
 * /api/routes:
 *   get:
 *     summary: Retrieve all routes
 *     tags: [Route]
 *     responses:
 *       200:
 *         description: Successfully fetched all routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64b2d5f3429a1c6a8f99a2f6"
 *                     description: The unique ID of the route
 *                   startLocation:
 *                     type: string
 *                     example: "Downtown"
 *                     description: The starting location of the route
 *                   endLocation:
 *                     type: string
 *                     example: "Airport"
 *                     description: The ending location of the route
 *                   cost:
 *                     type: number
 *                     example: 25.50
 *                     description: The cost of the route
 *                   taxiBossId:
 *                     type: string
 *                     example: "64b2d5f3429a1c6a8f99a2f8"
 *                     description: The ID of the taxi boss managing this route
 *       500:
 *         description: An error occurred while fetching routes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch routes"
 */
