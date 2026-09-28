from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from core.models import (
    ProviderProfile,
    Service,
    Request
)
def home(request):
    return render(request, 'home.html')

@login_required
def provider_dashboard(request):

    provider = ProviderProfile.objects.filter(
        user=request.user
    ).first()

    if not provider:
        return redirect('become_provider')

    services = Service.objects.filter(
        provider=provider
    )

    requests = Request.objects.filter(
        service__provider=provider
    )

    return render(
        request,
        'dashboard/provider_dashboard.html',
        {
            'provider': provider,
            'services': services,
            'requests': requests
        }
    )