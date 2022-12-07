from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=50, null=True)
    year = models.PositiveSmallIntegerField(null=True)
    sold = models.BooleanField(default=False)

class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=50)

class SalesPerson(models.Model):
    name = models.CharField(max_length=200)
    number = models.CharField(max_length=50)

class SalesRecord(models.Model):
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales",
        on_delete=models.PROTECT
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customers",
        on_delete=models.PROTECT
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.PROTECT
    )
    price = models.CharField(max_length=100)

    def get_api_url(self):
        return reverse("api_show_sales", kwargs={"pk": self.pk})
