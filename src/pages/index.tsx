import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Table from "./components/Table";
import axios from "axios";
import { useEffect, useState } from "react";


// const columns = [
//   { label: "ID", accessor: "id", sortable: true, sortbyOrder: "desc" },
//   { label: "Avatar", accessor: "avatar", sortable: false },
//   { label: "First Name", accessor: "firstname", sortable: true },
//   { label: "Last Name", accessor: "lastname", sortable: true },
//   { label: "Gender", accessor: "gender", sortable: true },
//   { label: "Age", accessor: "birthday", sortable: true },
//   { label: "Contact", accessor: "phone", sortable: false },
// ];

const columns = [

  { label: "ID", accessor: "id", sortable: true, sortbyOrder: "desc" },
  { label: "First Name", accessor: "first_name", sortable: true},
  { label: "Last Name", accessor: "last_name", sortable: true},
  { label: "Email", accessor: "email", sortable: true},
  { label: "Gender", accessor: "gender", sortable: true},
  { label: "Income", accessor: "income", sortable: true},
  { label: "City", accessor: "city", sortable: true},
  { label: "Car", accessor: "car", sortable: true},
  { label: "Quote", accessor: "quote", sortable: false},
  { label: "Phone Price", accessor: "phone_price", sortable: true},
  
];

const query5columns = [

  { label: "City", accessor: "_id", sortable: true, sortbyOrder: "desc" },
  { label: "Count", accessor: "count", sortable: true},
  { label: "Average Income", accessor: "avg_income", sortable: true},
  
  
];

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [rows, setRows] = useState(10);

  const [query1, setQuery1] = useState([]);
  const [query2, setQuery2] = useState([]);
  const [query3, setQuery3] = useState([]);
  const [query4, setQuery4] = useState([]);
  const [query5, setQuery5] = useState([]);

  useEffect(() => {
    setRender(false);
    const dataFetch=async()=>{
      // first query
      await axios
      .post("https://userdata-tables-api.vercel.app/getData",{
        "income": {
          "$lt": "$5"
        },
        "car": {
          "$in": [
            "BMW",
            "Mercedes"
          ]
        }
      })
      .then((x) => {
        setQuery1(x.data)
      })
      // second query
          await axios
        .post("https://userdata-tables-api.vercel.app/getData",{ "gender": "Male", "phone_price": { "$gt": "10000" } })
        .then((x) => {
          setQuery2(x.data)
        })
      // third query
     
          await axios
          .post("https://userdata-tables-api.vercel.app/getData",{
            "last_name": { "$regex": "^M" },
            "quote": { "$exists": true, "$gt": 15 },
            "email": { "$regex": ".*M$", "$options": "i" }
          })
          .then((x) => {
            setQuery3(x.data)
          });
        
      
      // fourth query
          await axios
          .post("https://userdata-tables-api.vercel.app/getData",{
            "car": { "$in": ["BMW", "Mercedes", "Audi"] },
            "email": { "$not": { "$regex": "\\d" } }
          })
          .then((x) => {
            setQuery4(x.data)
          });
        
      // fifth query
          await axios
          .post("https://userdata-tables-api.vercel.app/agg",{
            "aggregate": "collection",
            "pipeline": [
              { "$group": { "_id": "$city", "count": { "$sum": 1 }, "avg_income": { "$avg": { "$toDouble": { "$substr": ["$income", 1, -1] } } }  } },
              { "$sort": { "count": -1 } },
              { "$limit": 10 }
            ]
          })
          .then((x) => {
            setQuery5(x.data)
            
          });
        
    }

    dataFetch().then(
      ()=>{
        setRender(true);
      }
    )
    


  }, [rows]);



  return ( 
    !render&&(<div className="text-4xl uppercase text-center mx-auto h-screen border-4 flex items-center justify-center"><h2>loading data</h2></div>) ||
    render && (
      
      <div className="table_container">
        <h1 className="text-2xl text-center">Submission by Sunil Band ph-8390685016 , email-sunilbandwork@gmail.com</h1>
        <Table
          caption="Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes"
          data={query1}
          columns={columns}
          setRows={setRows}
          rows={rows}
        />
      <br />
      <Table
          caption="Male Users which have phone price greater than 10,000"
          data={query2}
          columns={columns}
          setRows={setRows}
          rows={rows}
        />

        <br />

        <Table
          caption="Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name."
          data={query3}
          columns={columns}
          setRows={setRows}
          rows={rows}
        />

        <br />

        <Table
          caption="Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit."
          data={query4}
          columns={columns}
          setRows={setRows}
          rows={rows}
        />

        <br />

        <Table
          caption="Show the data of top 10 cities which have the highest number of users and their average income."
          data={query5}
          columns={query5columns}
          setRows={setRows}
          rows={rows}
        />
      </div>
    )
  );
}
