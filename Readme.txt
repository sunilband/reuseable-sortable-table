Submission by Sunil Band ph-8390685016 , email-sunilbandwork@gmail.com

Technology used - Next.js,Node.js,Express.js,MongoDB,TypeScript,TailwindCSS

hosted on- https://userdata-tables.vercel.app/ 

							##BACKEND##

Files - 1- server/controllers/DataController.js
	=> Controller functions are defined here to read all documents from mongoDB collection,create a new collection,
	   delete a collection.

	2- server/models/DataModel.js
	=> The model for the Document is defined here.All the fields are manditory to create a document

	3- server/routes/DataRoutes.js
	=> All the routing of endpoints is done here and controller functions are defined for endpoints
	
	4- server/index.js
	=> This is Entrypoint file and middlewares like cors,express.json(),and routes are used and mongoURL key named 	   	   process.env.MONGO_URI is imported from .env file.Monsoose is used for all mongoDB connection and other 	              activities.

ENDPOINTS:
	1-GET https://userdata-tables.vercel.app/ 
	function:- 1-Gets all the documents from mongoDB
		   
	2-POST https://userdata-tables.vercel.app/ 
	function:- send a payload to insert into collection.All fields are manditory
			eg- {
    				"first_name": "Inglis",
    				"last_name": "McMurty",
    				"email": "imcmurty0@youku.com",
    				"gender": "Male",
    				"income": "$1.36",
    				"city": "Las Flores",
    				"car": "Hummer",
    				"quote": "optimize web-enabled relationships",
    				"phone_price": "22236"
  				} 
	3-Delete https://userdata-tables.vercel.app/<insert _id> 
	function:- send _id of any document to delete it from collection 

	4-POST https://userdata-tables.vercel.app/getData/
	function:- 1-If a payload of a query is sent its used to find data
			eg-{city:{$eg:"Peta"}
				}	
	5-POST https://userdata-tables.vercel.app/agg/
	function: 1-used for aggridation queries if payload is sent of type
			eg- {
  				"aggregate": "collection",
  				"pipeline": [
   				 { "$group": { "_id": "$city", "count": { "$sum": 1 }, "avg_income": { "$avg": { 				"$toDouble": { "$substr": ["$income", 1, -1] } } }  } },
    				{ "$sort": { "count": -1 } },
    				{ "$limit": 10 }
 				 ]
				}
Hosting:
	hosting is done on vercel.com which automatically hosts from github repo and at time of hosting we have to provide 	enviourment variables 
	MONGO_URI  <Enter-key-here>
	

							##FRONT-END##

Files - 1- src/pages/components
	=> All the components here are for the reuseable table with sorting functions.
	   simply import Table.tsx component and use like this
		<Table
          	caption="Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes"
          	data={query1}
          	columns={columns}
          	setRows={setRows}
          	rows={rows}
        	/>
	NOTE:set rows functionality is not used in this project

	2- src/pages/images
	=> Images for the sorting functionality icons

	3- src/index.tsx
	=> Axios requests for the required tables data are made here and after loading all the data the tables are 	   	   rendered.Reuseable Table component is used for rendering tables and the data and schema is defined at top
Hosting:
	hosting is done on vercel.com which automatically hosts from github repo.
	Live url - https://userdata-tables.vercel.app/
	
	


	