const express = require('express')
const app = express()
const port = 3000
const testController = require('./controller/test')

app.use(express.json())


app.use('/api',testController)


app.get('/api/:any', async (req, res) => {
  const anyParam = req.params.any; // Get the dynamic value from URL
  
  try {
    const response = await fetch(`https://next-js-prisma-ugmk.vercel.app/api/${anyParam}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const output = await response.json();
    res.status(200).json({ 
      data: output, 
      status: 200, 
      message: "Data fetched successfully" 
    });
    
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch external data',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




