from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment, AutomobileVO
from .encoders import (
    TechnicianEncoder,
    AppointmentEncoder,
    AutomobileVO
)


@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe = False
            )
        except:
            response = JsonResponse(
                {"message": "could not create the technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_detail_technician(request, pk):
    if request.method == "DELETE":
        technician = Technician.objects.get(id=pk)
        technician.delete()
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )
    elif request.method=="GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=pk).update(**content)
        technician = Technician.objects.get(id=pk)
        return (JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        ))


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointment = Appointment.objects.all()
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            vin = content['automobile']
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile"},
                status=400,
            )
        try:
            employee_number = content['technician']
            technician = Technician.objects.get(id=employee_number)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee id"},
                status=400,
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )



@require_http_methods(["DELETE", "GET", "PUT"])
def api_detail_appointment(request, pk):
    if request.method == "DELETE":
        appointment = Appointment.objects.get(id=pk)
        appointment.delete()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
    elif request.method=="GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return (JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        ))
