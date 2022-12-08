# CarCar

Team:

* Sean - Service
* Person 2 - Which microservice?

## Design
    CarCar is an application designed to manage a dealership and its entities including the customer base, sales, employees, and service.  The inventory needs to have an automobile containing a manufacturer and model.  The dealership was split into three parts: sales, service and inventory.  Sales will handle sales records as well as sales employees.  Customer information will be managed by the sales.  The service side will handle service appointments as well as technicians who will work on the car.  Inventory manages the cars in the database including their model and manufacturer.

## Instructions
    HOW TO RUN:
- Fork and clone the project from the link https://gitlab.com/adrienkchan/project-beta

- change your working directory to the new cloned repository.
run the following commands:

1.```docker volume create beta-data```

2.```docker-compose build```

3.```docker-compose up```

 - When the docker containers are up and running navigate to http://localhost:3000/ to see the application.

 - navigation will be at the top of the page.


## Diagram

![image](image.png)



## Service microservice

There were three models associated with the Service microservice.
1 Appointment:
    Each appointment requires the automobile (by VIN), customer's name, start data and time, reason for the appointment, technician associated with the appointment, if the customer is a VIP and if the service is finished.

2 Technician:
    The employees name and number are under the technician model.

3 AutomobileVO:
    This Value Object represents the VIN of the automobile.

There will be forms to create a new technician as well as a form to create a new appointment.  If you go to the appointment list you can see if they are a VIP as well as either cancel the appointment or mark it completed.

The data for the appointments:
    URL = localhost:8080/api/appointments

The data for the technicians:
    URL = localhost:8080/api/technicians



## Sales microservice

Explain your models and integration with the inventory
microservice, here.
