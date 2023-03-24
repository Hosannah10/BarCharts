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
  
 

  var lionUrl = "https://gplsales.3coretechnology.com/api/report/download/visits?from=Nov%201,%202022&to=Feb%2020,%202023&rep_id=&team_id=5";
  //var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  //var apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";


  useEffect(() => {
    const fetchData = async () => {
      /*await fetch(`${eagleUrl}${bullUrl}${lionUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //'x-access-token': `${apiKey}`,
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              setChart(fetch.data)
            });
          }
        }).catch((error) => {
          console.log(error);
        });
        */
       /* try {
            const response = await axios.get(`${eagleUrl}${bullUrl}${lionUrl}`)
            setChart(response.data)
          } catch (error) {
            console.error(error);
          }*/
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
      <Bar 
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}

export default Lbarchart