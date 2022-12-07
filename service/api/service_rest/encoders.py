from common.json import ModelEncoder

from .models import Technician, Appointment, AutomobileVO


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        'id',
        'name',
        'employee_number'
        ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'id',
        'vin',
        'customer_name',
        'date',
        'time',
        'reason',
        'technician',
        'is_vip',
        'is_finished'
        ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties=['vin']
