# CarCar

Team:

* Sean - Service/Inventory
* Adrien - Sales/Inventory

</br>

## Table of Contents

[TOC]

## Design
CarCar is an application designed to manage a dealership and its entities including the customer base, sales, employees, and service.  The inventory needs to have an automobile containing a manufacturer and model.  The dealership was split into three parts: sales, service and inventory.  Sales will handle sales records as well as sales employees.  Customer information will be managed by the sales.  The service side will handle service appointments as well as technicians who will work on the car.  Inventory manages the cars in the database including their model and manufacturer.

</br>
</br>

## Instructions
***HOW TO RUN:***
- Fork and clone the project from the link https://gitlab.com/adrienkchan/project-beta

- Change your working directory to the new cloned repository.
run the following commands:

1.```docker volume create beta-data```

2.```docker-compose build```

3.```docker-compose up```

 - Allow up to 5-10 minutes for docker containers to fully function
 
 - When the docker containers are up and running navigate to http://localhost:3000/ to see the application.

 - navigation will be at the top of the page.

 - Open up insomnia to access the RESTful APIs and use the ports and paths provided under each microservice below

</br>
</br>

## Diagram

![image](/images/betadiagram.PNG/)

</br>
</br>

## Inventory microservice
There are three models associated with the Inventory microservice

1. Manufacturer

    - Requires just a name of the manufacturer

2. Vehicle Model

    - Requires a name of the vehicle model, a picture url, and the id of which manufacturer the vehicle is under

3. Automobile

    - Requires the color, year, VIN number, and the id of which Vehicle Model the automobile is under

__Inventory Port: 8100__

***Manufacturer RESTful API endpoints***

| Request Method  | Url                     | What it does                              |
| ----------------|:-----------------------:| :----------------------------------------:|
| GET             | /api/manufacturers/     | Obtains a list of manufacturers           |
| POST            | /api/manufacturers/     | Creates a new manufacturer instance       |
| GET             | /api/manufacturers/id#  | Obtains individual manufacturer details   |
| PUT             | /api/manufacturers/id#  | Updates a specific manufacturer instance  |
| DELETE          | /api/manufacturers/id#  | Deletes an instance of a manufacturer     |

example JSON
```json
{
  "name": "Toyota"
}
```

</br>
</br>

***Vehicle Model RESTful API endpoints***

| Request Method  | Url                     | What it does                              |
| ----------------|:-----------------------:| :----------------------------------------:|
| GET             | /api/models/            | Obtains a list of vehicle models          |
| POST            | /api/models/            | Creates a new vehicle model instance      |
| GET             | /api/models/id#         | Obtains individual vehicle model details  |
| PUT             | /api/models/id#         | Updates a specific vehicle model instance |
| DELETE          | /api/models/id#         | Deletes an instance of a vehicle model    |

example JSON
```json
{
  "name": "Camry",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Toyota_Camry_%28XV70%29_IMG_5294.jpg",
  "manufacturer_id": 2
}
```
</br>
</br>

***Automobile RESTful API endpoints***

| Request Method  | Url                     | What it does                              |
| ----------------|:-----------------------:| :----------------------------------------:|
| GET             | /api/automobiles/       | Obtains a list of automobiles.            |
| POST            | /api/automobiles/       | Creates a new automobile instance         |
| GET             | /api/automobiles/vin#/  | Obtains individual automobile details     |
| PUT             | /api/automobiles/vin#/  | Updates a specific automobile instance    |
| DELETE          | /api/automobiles/vin#/  | Deletes an instance of an automobile      |

example JSON
```json
{
  "color": "silver",
  "year": 2020,
  "vin": "ABCDEFGHIJKLMNO",
  "model_id": 2
}
```

</br>
</br>

## Service microservice

There were three models associated with the Service microservice.

1. Appointment

    - Each appointment requires the automobile (by VIN), customer's name, start data and time, reason for the appointment, technician associated with the appointment, if the customer is a VIP and if the service is finished.

2. Technician

    - The employees name and number are under the technician model.

3. AutomobileVO

    - This Value Object represents the VIN of the automobile.

There will be forms to create a new technician as well as a form to create a new appointment.  If you go to the appointment list you can see if they are a VIP as well as either cancel the appointment or mark it completed.

The data for the appointments:
    URL = localhost:8080/api/appointments

The data for the technicians:
    URL = localhost:8080/api/technicians

__Service Port: 8080__

***Technician RESTful API endpoints***
| Request Method  | Url                    | What it does                             |
| ----------------|:----------------------:| :---------------------------------------:|
| GET             | /api/technicians/      | Obtains a list of technicians            |
| POST            | /api/technicians/      | Creates a new technician instance        |
| GET             | /api/technicians/#id   | Obtains invidividual technician details  |

example JSON
```json
{
	"name": "Sean Myrom",
	"employee_number": "101"
}

```

</br>
</br>

***Appointment RESTful API endpoints***
| Request Method  | Url                            | What it does                                  |
| ----------------|:------------------------------:| :--------------------------------------------:|
| GET             | /api/appointments/             | Obtains a list of service appointments        |
| POST            | /api/appointments/             | Creates a new service appointment instance    |
| GET             | /api/appointments/id#          | Obtains individual service appointment details|
| PUT             | /api/appointments/id#          | Updates a specific appointment instance       |
| DELETE          | /api/appointments/id#          | Deletes an instance of a service appointment  |

example JSON
```json
{
	"vin": "1C3CC5FB2AN120174",
	"owner": "Bob",
	"technician": "1",
	"service": "Oil Change"
}

```


</br>
</br>

## Sales microservice

The Sales microservice is in charge of being able to create Customers and Sales Persons who will be working together to make automobile sales. It should be able to list all sales as well as filter the sales that are sold by a certain sales person. This microservice should also be able to connect and poll from the Inventory API in order to retrieve the automobile data which is used for SalesRecord.

Within the Sales microservice there are four models:

1. AutomobileVO

    - Value Object that represents the VIN, color, and year of the automobile model from Inventory microservice.

2. Customer

    - Requires the customers name, address, and phone number

3. SalesPerson

    - Requires the Sales Person's name and employee number

4. SalesRecord

    - In order to create a new sale, an already registered customer, sales person, and automobile is required for this model as well as the price of the the automobile.

__Sales Port: 8090__

***Customer RESTful API endpoints***
| Request Method  | Url                         | What it does                                  |
| ----------------|:---------------------------:| :--------------------------------------------:|
| GET             | /api/sales/customer    | Obtains a list of potential customers         |
| POST            | /api/sales/customer    | Creates a new potential customer instance     |
| GET             | /api/sales/customer/id# | Obtains individual potential customer details |

example JSON
```json
{
	"name": "Adrien Chan",
	"address": "381 Arkansaw Ave",
	"phone_number": 5108521579
}
```

</br>
</br>

***SalesPerson RESTful API endpoints***
| Request Method  | Url                   | What it does                            |
| ----------------|:---------------------:| :--------------------------------------:|
| GET             | /api/sales/salesperson/    | Obtains a list of sales people          |
| POST            | /api/sales/salesperson/    | Creates a new sales person instance     |
| GET             | /api/sales/salesperson/id# | Sales Person details (Sales History) |

example JSON
```json
{
	"name": "Hawaiian Brian",
	"number": 512
}
```
</br>
</br>

***SalesRecord RESTful API endpoints***
| Request Method  | Url                   | What it does                            |
| ----------------|:---------------------:| :--------------------------------------:|
| GET             | /api/sales/sale/     | Obtains a list of sale records          |
| POST            | /api/sales/sale/     | Creates a new sale record instance      |
| GET             | /api/sales/sale/id#  | Obtains individual sale record details  |
| DELETE          | /api/sales/sale/id#  | Deletes an instance of a sale record    |

example JSON
```json
{
	"sales_person": 1,
	"customer": 2,
	"automobile": "ABCDEFGHIJKLMNO",
	"price": "48000"
}
```
