//***----------------------------below lines are always required------------------------------------***

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./index.js");
const app = express();
const path = require("path"); //<-for heroku

//middleware is a function that recieves a request and will send it to the next middleware or the final middleware known as a route handler
//<<<------below code is 3rd party middleware ----->>>
app.use(cors());
app.use(express.json());
//+*+*------------FOR HEROKU-------------------+*+*
if (process.env.NODE_ENV === "production") {
  //serve static content
  app.use(express.static(path.join(__dirname, "front-end/build")));
}
//+*+*----------------------------------------------------+*+*
//<<<---------------------------------------------->>>
const port = process.env.PORT || 3001; //<-- if process.env.PORT is not defined set port to 3001. PORT comes from the .env file
app.listen(port, () => {
  console.log(`server is running and listening on port ${port}`);
});
console.log(__dirname);
console.log(path.join(__dirname, "front-end/build"));
// ***---------------------------------------------------------------------------------------------***

//Creating a job
app.post("/api/v1/PostJobs", async (req, res) => {
  try {
    console.log(req.body);
    // const {results} = req.body
    const newJob = await db.query(
      "INSERT INTO jobs(title, technologies, salary, location, description, email) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        req.body.title,
        req.body.technologies,
        req.body.salary,
        req.body.location,
        req.body.description,
        req.body.email,
      ]
    );
    res.json(newJob.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

//Getting all jobs
app.get("/api/v1/AllJobs", async (req, res) => {
  try {
    const allJobs = await db.query("SELECT * FROM jobs");
    res.json(allJobs.rows);
    console.log(allJobs.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Getting one job
app.get("/api/v1/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await db.query("SELECT * FROM jobs WHERE job_id = $1", [id]);
    res.json(job.rows[0]);
    console.log(req.params.id);
  } catch (err) {
    console.error(err.message);
  }
});

//Updating a job
app.put("/api/v1/jobs/:id", async (req, res) => {
  try {
    // const { id } = req.params;
    // const { description } = req.body;
    console.log(req.body);
    const updateJob = await db.query(
      "UPDATE jobs SET title = $1, technologies = $2, salary = $3, location = $4, description = $5, email = $6 WHERE job_id = $7 returning *",
      [
        req.body.title,
        req.body.technologies,
        req.body.salary,
        req.body.location,
        req.body.description,
        req.body.email,
        req.params.id,
      ]
    );
    console.log(updateJob);
    res.json("updated");
  } catch (err) {
    console.error(err.message);
  }
});

//deleting a todo
app.delete("/api/v1/jobs/:id", async (req, res) => {
  try {
    const deleteJob = await db.query(
      "DELETE FROM jobs WHERE job_id = $1",
      [req.params.id]
    );
    res.json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

// Catch all method
// If a user goes to any other directory "/api/v1/parks/blobs" it will redirect you to the home page.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "front-end/build/index.html"))
// })

//--------------------------------------USER LOGIN----------------------------------------------------------
