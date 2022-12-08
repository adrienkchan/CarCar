from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=20, unique=True)




class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})


class Appointment(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name = "automobile",
        on_delete=models.PROTECT
    )
    customer_name = models.CharField(max_length=100)
    appt_date = models.DateField(auto_now_add=False, auto_now=False, null=True)
    appt_time = models.TimeField(auto_now_add=False, auto_now=False, null=True)
    reason = models.TextField()
    technician = models.ForeignKey(
        Technician,
        related_name = "technician",
        on_delete=models.PROTECT
    )
    is_vip = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)
