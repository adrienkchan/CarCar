from django.urls import path
from .views import api_list_technician, api_detail_technician, api_list_appointments, api_detail_appointment, api_show_appointment


urlpatterns = [
    path("technicians/", api_list_technician, name= "list_of_technicians"),
    path("technicians/<int:pk>/", api_detail_technician, name= "api_detail_technician"),
    path("appointments/", api_list_appointments, name= "list_of_appointments"),
    path("appointments/<int:pk>/", api_detail_appointment, name= "api_detail_appointment"),
    path("appointments/<str:vin>/", api_show_appointment, name="api_show_appointment"),

]
