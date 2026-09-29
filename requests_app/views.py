from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required

from core.models import (
    Service,
    Request,
    Response
)


@login_required
def create_request(request, service_id):

    service = get_object_or_404(
        Service,
        id=service_id
    )

    if request.method == 'POST':

        Request.objects.create(
            customer=request.user,
            service=service,
            message=request.POST.get('message')
        )

        return redirect('my_requests')

    return render(
        request,
        'requests_app/create_request.html',
        {
            'service': service
        }
    )


@login_required
def my_requests(request):

    requests = Request.objects.filter(
        customer=request.user
    ).order_by('-created_at')

    return render(
        request,
        'requests_app/my_request.html',
        {
            'requests': requests
        }
    )


@login_required
def provider_requests(request):

    requests = Request.objects.filter(
        service__provider__user=request.user
    ).order_by('-created_at')

    return render(
        request,
        'requests_app/provider_requests.html',
        {
            'requests': requests
        }
    )


@login_required
def respond_to_request(request, request_id):

    service_request = get_object_or_404(
        Request,
        id=request_id,
        service__provider__user=request.user
    )

    if request.method == 'POST':

        Response.objects.create(
            request=service_request,
            provider=service_request.service.provider,
            message=request.POST.get('message'),
            price=request.POST.get('price')
        )

        service_request.status = 'accepted'
        service_request.save()

        return redirect('provider_requests')

    return render(
        request,
        'requests_app/respond.html',
        {
            'service_request': service_request
        }
    )
