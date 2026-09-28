from django.urls import path
from . import views

urlpatterns = [

    path(
        'create/<int:service_id>/',
        views.create_request,
        name='create_request'
    ),

    path(
        'my-requests/',
        views.my_requests,
        name='my_requests'
    ),

    path(
        'provider-requests/',
        views.provider_requests,
        name='provider_requests'
    ),

    path(
        'respond/<int:request_id>/',
        views.respond_to_request,
        name='respond_to_request'
    ),
]