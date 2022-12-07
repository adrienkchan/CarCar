from django.db import models

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.CharField(max_length=20 unique=True)


    def __str__(self):
        return self.name


class Appointment(models.Model):
    vin = models.CharField(max_length=50)
    customer_name = models.CharField(max_length=100)
    data = models.DateField()
    time = models.TimeField()
    reason = models.TextField()
    technician = models.ForeignKey(
        Technician,
        related_name = "technician",
        on_delete=models.PROTECT
    )
    is_vip = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)


class AutomobileVO(models.Model):
    import_href= models.CharField(max_length=100, null=True, unique=True)
    vin = models.CharField(max_length=20, unique=True)
