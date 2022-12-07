from common.json import ModelEncoder
from .models import AutomobileVO, Customer, SalesPerson, SalesRecord

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "color",
        "year",
        "sold",
        "id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "number",
        "id",
    ]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "sales_person",
        "customer",
        "automobile",
        "price",
        "id",
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
