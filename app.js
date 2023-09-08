const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define a sample user ID based on the request data
function generateUserId(reqBody) {
  const { full_name, dob } = reqBody;
  const formattedDob = dob.replace(/-/g, '');
  return `${full_name}_${formattedDob}`;
}

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { full_name, email, roll_number, numbers, alphabets } = req.body;
    const user_id = generateUserId(req.body);

    // Calculate the highest alphabet in the input array of alphabets
    const highestAlphabet = alphabets.reduce((max, current) => (current > max ? current : max), '');

    const response = {
      is_success: true,
      user_id,
      college_email: email,
      college_roll_number: roll_number,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  // You can hardcode the response for the GET endpoint
  const response = {
    operation_code: 1,
  };
  res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});