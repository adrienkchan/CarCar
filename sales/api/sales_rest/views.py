from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .encoders import SalesPersonEncoder, CustomerEncoder, SalesRecordEncoder
from .models import SalesPerson, Customer, SalesRecord, AutomobileVO
import json

@require_http_methods(["GET", "POST"])
def api_list_salespersons(request):
    if request.method == "GET":
        sales_person = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons" : sales_person},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def api_show_salesperson(request, pk):
    if request.method == "GET":
        sales_person = SalesRecord.objects.filter(sales_person=pk)
        return JsonResponse(
            sales_person,
            encoder=SalesRecordEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers" : customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customers = Customer.objects.create(**content)
        return JsonResponse(
            customers,
            encoder=CustomerEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def api_show_customer(request, pk):
    if request.method == "GET":
        customer = Customer.objects.filter(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = SalesRecord.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesRecordEncoder
        )
    else: #POST
        content = json.loads(request.body)
        try:
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid vin"},
                status=400,
            )
        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=400,
            )
        try:
            salesperson_id = content["sales_person"]
            salesperson = SalesPerson.objects.get(id=salesperson_id)
            content["sales_person"] = salesperson
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson id"},
                status=400,
            )

        sales = SalesRecord.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SalesRecordEncoder,
            safe=False
        )


@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, pk):
    if request.method == "GET":
        sale = SalesRecord.objects.filter(id=pk)
        return JsonResponse(
            sale,
            encoder=SalesRecordEncoder,
            safe=False
        )
    else:
        count, _ = SalesRecord.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
