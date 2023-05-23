import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,

  BarElement,
  CategoryScale,
  LinearScale,

} from 'chart.js';
import './BarChart.css';
import { Bar } from 'react-chartjs-2';
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);


const Lbarchart = () => {
  const [chart, setChart] = useState({})
  // const [selected, setSelected] = useState("");
  
  // const changeSelectOptionHandler = (event) => {
  //   setSelected(event.target.value);
  // };

//operation to fetch the date data and update the values
  //var firstdate = `2022-11-01`;
  //var seconddate = `2023-02-20`;

  var startDate = `Nov 1, 2022`;
  var endDate = `Feb 20, 2023`;
  
  // let date1  = startDate;
  const [date1, setDate1] = useState(startDate);
  // let date2  =  endDate;
  const [date2, setDate2] = useState(endDate);

  // function formatDate(dateString) {
  //   var date = new Date(dateString);
  //   var options = {
  //     month: "long" ,
  //     day:  "numeric",
  //     year: "numeric",
  //   };
  //   return date.toLocaleDateString("en-US", options);
  // }

  function handleDate1Change (event) {
    setDate1(event.target.value);
};

function handleDate2Change (event) {
    setDate2(event.target.value);
};

  // var eagleID = `3`;
  //  var bullID = `4`;
   var lionID = `5`;

  // let teamID = eagleID;

  // if (selected === "EAGLE") {
  //   teamID = eagleID;
    
  // }
  //  else if (selected === "BULL") {
  //   teamID = bullID;
   
  // }
  //  else if (selected === "LION") {
  //   teamID = lionID;
    
  // }
  
 

  var lionUrl = `https://gplsales.3coretechnology.com/api/report/download/visits?from=${date1}&to=${date2}&rep_id=&team_id=${lionID}`;
  //var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  //var apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";


  useEffect(() => {
    const fetchData = async () => {
     
          axios(`${lionUrl}`)
          .then((response) => {
            
              
                console.log(response.data);
                setChart(response.data)
              
            
          })
          .catch((error) => {
            console.log(error);
          })
          
          

    };
    fetchData()
  }, [lionUrl])

  //console.log("chart", chart);

var rep = chart?.visits?.map(x => x.name);
var customer = chart?.visits?.map(x => x);
//var custom = chart?.visits?.map(x => x.customer_id);
//console.log(customer)
var cust = 
customer.map((x)=>{
  return {
    name: x.name, 
    customer_id: x.customer_id
  }
  });

var custo = cust.map((object) => JSON.stringify(object))

const getUniqueObj = (array) => (
  new Set(array)
)

var uniqueCust = getUniqueObj(custo)

var unique = Array.from(uniqueCust)

var uniqueCtm = unique.map((string)=>JSON.parse(string))
//console.log(uniqueCtm)

var repNum = uniqueCtm.map((x)=>{
  return  x.name
  });
  //console.log(repNum)


const getUniqueValues = (array) => (
  [...new Set(array)]
)

var uniqueRep = getUniqueValues(rep);
//var uniqueCustomer = getUniqueValues(custom);
//console.log(uniqueCustomer)

  const getNumOfTimes = (array) =>{
    let newArr = {}
        for (let i = 0; i < array?.length; i++) {
            let keys = array[i].toString()
            newArr[keys] = ++newArr[array[i]] || 1
        }

    return newArr
}
  
  var repTimes = getNumOfTimes(repNum)
  console.log(repTimes)
  
  
  var data = {
    labels: uniqueRep,
    datasets: [{
      label: 'Amount of Sales', //`${chart?.visits?.length} Coins Available`,
      data: repTimes, //chart?.coins?.map(x => x.price),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div className='bar'>
      <h1 className="salesreport">SALES REPORT BARCHART</h1>

      <div className='inputs'>

      <div className ='dates'>
      <h3 className='text'>Set Date:</h3>
      <div>
      <label>From:</label> 
      <input type="date" className ='date'  onChange={handleDate1Change} />
      <label>to:</label>
      <input type="date" className ='date'  onChange={handleDate2Change} />
      </div>
      <div className='button'>
      {/* <button onClick={setNewDate}>Set Date</button> */}
      </div>
      </div>

      {/* <div className='team'>

      <h3 className='text'>Select Team:</h3>
      <div>
      <select onChange={changeSelectOptionHandler}>
        <option>EAGLE</option>
        <option>BULL</option>
        <option>LION</option>
      </select>
      </div>
      </div> */}

      </div>

{/* <div className='text'>
<div className='box'></div>
{ text }
</div> */}

      <div className='bart'>
      <Bar 
      data={data}
      height={400}
      options={options}

      />
      </div>

      </div>
  )
}

export default Lbarchart