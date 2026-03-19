const express = require("express");
const app = express();
const port = 4000;
const testController = require("./controller/test");
const cors = require("cors")

app.use(cors());
app.use(express.json());

app.use("/api", testController);

// app.get('/api/:any', async (req, res) => {
//   const anyParam = req.params.any; // Get the dynamic value from URL

//   try {
//     const response = await fetch(`https://next-js-prisma-ugmk.vercel.app/api/${anyParam}`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const output = await response.json();
//     res.status(200).json({
//       data: output,
//       status: 200,
//       message: "Data fetched successfully"
//     });

//   } catch (error) {
//     console.error('Fetch error:', error);
//     res.status(500).json({
//       error: 'Failed to fetch external data',
//       details: error.message
//     });
//   }
// });

app.get("/api/:any", async (req, res) => {
  console.log('console------>req.params:', req.params.any);

  const filter = req?.body?.inputData?.filter || {};
  const anyParam = req.params.any;
  console.log('console------>anyParam:', anyParam);
  

  try {
    const response = await fetch(
      `https://next-js-prisma-ugmk.vercel.app/api/${anyParam}`
    ); // ← and this

    console.log('console------>response:', response);


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let output = await response.json();

    // if(Object.entries(filter).length && filter.itemPrice) {
    //   output = output?.filter(o=> o.itemPrice < filter.itemPrice)
    // }

    if (
      Object.entries(filter).length &&
      filter.createdAt &&
      Array.isArray(filter.createdAt)
    ) {
      const startDate = new Date(filter.createdAt[0]);
      const endDate = new Date(filter.createdAt[1]);

      output = output?.filter((o) => {
        const itemDate = new Date(o.createdAt);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    // Check if amount filter is applied
    if (Object.entries(filter).length && filter.itemPrice) {
      console.log(
        "console------>filter.itemPriceFilterTyper:",
        filter.itemPriceFilterTyper
      );

      switch (filter.itemPriceFilterTyper) {
        case "lessThan":
          if (filter.itemPrice !== undefined) {
            const value = Number(filter.itemPrice);
            output = output.filter((item) => Number(item.itemPrice) < value);
          }
          break;

        case "greaterThan":
          if (filter.itemPrice !== undefined) {
            const value = Number(filter.itemPrice);
            output = output.filter((item) => Number(item.itemPrice) > value);
          }
          break;

        case "equal":
          if (filter.itemPrice !== undefined) {
            const value = Number(filter.itemPrice);
            output = output.filter((item) => Number(item.itemPrice) === value);
          }
          break;

        case "between":
          if (
            filter.minAmount !== undefined &&
            filter.maxAmount !== undefined
          ) {
            const min = Number(filter.minAmount);
            const max = Number(filter.maxAmount);
            output = output.filter((item) => {
              const itemPrice = Number(item.itemPrice);
              return itemPrice >= min && itemPrice <= max;
            });
          }
          break;

        default:
          // No filter applied
          break;
      }
    }

    res.status(200).json({
      data: output,
      status: 200,
      message: "Data fetched successfully",
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch external data",
      details: error.message,
    });
  }
});

app.post("/api/:any", async (req, res) => {
  console.log('console------>req.params:', req.params.any);

  const filter = req?.body?.inputData?.filter || {};
  const anyParam = req.params.any;
  console.log('console------>anyParam:', anyParam);
  

  try {
    const response = await fetch(
      `https://next-js-prisma-ugmk.vercel.app/api/${anyParam}`
    ); // ← and this

    console.log('console------>response:', response);


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let output = await response.json();

    // if(Object.entries(filter).length && filter.itemPrice) {
    //   output = output?.filter(o=> o.itemPrice < filter.itemPrice)
    // }

    if (
      Object.entries(filter).length &&
      filter.createdAt &&
      Array.isArray(filter.createdAt)
    ) {
      const startDate = new Date(filter.createdAt[0]);
      const endDate = new Date(filter.createdAt[1]);

      output = output?.filter((o) => {
        const itemDate = new Date(o.createdAt);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    // Check if amount filter is applied
    if (Object.entries(filter).length && filter.itemPrice) {
      console.log(
        "console------>filter.itemPriceFilterTyper:",
        filter.itemPriceFilterTyper
      );

      switch (filter.itemPriceFilterTyper) {
        case "lessThan":
          if (filter.itemPrice !== undefined) {
            const value = Number(filter.itemPrice);
            output = output.filter((item) => Number(item.itemPrice) < value);
          }
          break;

        case "greaterThan":
          if (filter.itemPrice !== undefined) {
            const value = Number(filter.itemPrice);
            output = output.filter((item) => Number(item.itemPrice) > value);
          }
          break;

        case "equal":
          if (filter.itemPrice !== undefined) {
            const value = Number(filter.itemPrice);
            output = output.filter((item) => Number(item.itemPrice) === value);
          }
          break;

        case "between":
          if (
            filter.minAmount !== undefined &&
            filter.maxAmount !== undefined
          ) {
            const min = Number(filter.minAmount);
            const max = Number(filter.maxAmount);
            output = output.filter((item) => {
              const itemPrice = Number(item.itemPrice);
              return itemPrice >= min && itemPrice <= max;
            });
          }
          break;

        default:
          // No filter applied
          break;
      }
    }

    res.status(200).json({
      data: output,
      status: 200,
      message: "Data fetched successfully",
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch external data",
      details: error.message,
    });
  }
});

// GET http://localhost:3000/api/expense?sort=asc&limit=1&page=0

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
