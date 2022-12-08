from common.json import ModelEncoder

from .models import Technician, Appointment, AutomobileVO


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        'id',
        'name',
        'employee_number'
        ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties=['vin', 'color', 'year']


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'id',
        'automobile',
        'customer_name',
        'appt_date',
        'appt_time',
        'reason',
        'technician',
        'is_vip',
        'is_finished'
        ]


    encoders = {
        'technician' : TechnicianEncoder(),
        'automobile': AutomobileVOEncoder()
    }
