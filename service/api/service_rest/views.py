from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment, AutomobileVO
from .encoders import (
    TechnicianEncoder,
    AppointmentEncoder,
    AutomobileVOEncoder,
)


@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {"technicians: technicians"},
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe = False
        )
