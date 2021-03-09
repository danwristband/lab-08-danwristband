const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

//to post you must use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("assets"));

app.get("/", (req, res) => {
  res.end(fs.readFileSync("./instruction.html"));
});

function gpaCal(){
  let gpax = data.courses.map(courses => {
    return {
      gpa : Number(courses.gpa) * Number(courses.credit),
      credit : Number(courses.credit)
    }
  }).reduce((sum,courses)=>{
    return{
      gpa: courses.gpa + sum.gpa,
      credit : courses.credit + sum.credit
    }
  
  },{gpa:0,credit:0})
  data.gpax = parseFloat((gpax.gpa / gpax.credit).toFixed(2))
}

//implement your api here
const data = require("./myCourses.json");

app.get("/courses", (req, res) => {
  return res.json({
    success: true,

    data,
  });
});

app.get("/courses/:id", (req, res) => {
  const findID = data.courses.find(
    (courses) => courses.courseId === +req.params.id
  );
  if (findID) {
    return res.json({
      success: true,

      findID,
    });
  } else {
    return res.status(404).json({
      success: false,
      data: null,
    });
  }
});

app.delete("/courses/:id", (req, res) => {
  const findIND = data.courses.findIndex(
    (courses) => courses.courseId === +req.params.id
  );

  if (findIND !== -1) {
    data.courses.splice(findIND, 1);
    gpaCal();
    fs.writeFileSync('./myCourses.json',JSON.stringify(data,null,4))
    return res.json({
      success: true,

      data,
    });
  } else {
    return res.json({
      success: true,

      data,
    });
  }
});

app.post("/addCourse",(req, res) => {

  const create = Object.keys(req.body)
  if(create.length == 4){data.courses.push(req.body)
    gpaCal();
    fs.writeFileSync('./myCourses.json',JSON.stringify(data,null,4))
  return res.json(req.body)}
  else{
    return res.json(
      {
        success : false,
        error : "ใส่ข้อมูลไม่ครบ"
      }
    )



  }

  
}
)


//follow instruction in http://localhost:8000/

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server started on port:${port}`));
