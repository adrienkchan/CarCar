from django.urls import path

from .views import api_list_salespersons, api_show_salesperson, api_list_customers, api_show_customer, api_list_sales, api_show_sale

urlpatterns = [
    path("salesperson/", api_list_salespersons, name="api_list_salespersons"),
    path("salesperson/<int:pk>/", api_show_salesperson, name="api_show_salesperson"),
    path("customer/", api_list_customers, name="api_list_customers"),
    path("customer/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("sale/", api_list_sales, name="api_list_sales"),
    path("sale/<int:pk>/", api_show_sale, name="api_show_sale"),
]
