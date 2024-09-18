import {Router} from 'express';
const router = Router();

// Check if routes are working
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
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the Express server!' });
  });

export default router;
