from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required

from core.models import (
    Category,
    Service,
    ProviderProfile
)


def service_list(request):

    services = Service.objects.filter(
        is_available=True
    )

    categories = Category.objects.all()

    category_id = request.GET.get('category')

    if category_id:
        services = services.filter(
            category_id=category_id
        )

    search = request.GET.get('search')

    if search:
        services = services.filter(
            title__icontains=search
        )

    return render(
        request,
        'marketplace/service_list.html',
        {
            'services': services,
            'categories': categories
        }
    )


def service_detail(request, service_id):

    service = get_object_or_404(
        Service,
        id=service_id
    )

    return render(
        request,
        'marketplace/service_detail.html',
        {
            'service': service
        }
    )


@login_required
def add_service(request):

    provider = get_object_or_404(
        ProviderProfile,
        user=request.user
    )

    categories = Category.objects.all()

    if request.method == 'POST':

        category_id = request.POST.get('category')

        category = get_object_or_404(
            Category,
            id=category_id
        )

        Service.objects.create(
            provider=provider,
            category=category,
            title=request.POST.get('title'),
            description=request.POST.get('description'),
            price=request.POST.get('price'),
            location=request.POST.get('location')
        )

        return redirect('provider_dashboard')

    return render(
        request,
        'marketplace/add_service.html',
        {
            'categories': categories
        }
    ) 