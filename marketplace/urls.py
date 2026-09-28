from django.urls import path
from . import views

urlpatterns = [
    path(
        'services/',
        views.service_list,
        name='service_list'
    ),

    path(
        'services/<int:service_id>/',
        views.service_detail,
        name='service_detail'
    ),

    path(
        'services/add/',
        views.add_service,
        name='add_service'
    ),
]