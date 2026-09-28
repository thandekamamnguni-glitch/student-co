from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required

from core.models import (
    Booking,
    Response
)


@login_required
def create_booking(request, response_id):

    response = get_object_or_404(
        Response,
        id=response_id,
        request__customer=request.user
    )

    if request.method == 'POST':

        Booking.objects.create(
            request=response.request,
            response=response
        )

        response.request.status = 'accepted'
        response.request.save()

        return redirect('my_bookings')

    return render(
        request,
        'bookings/create_booking.html',
        {
            'response': response
        }
    )


@login_required
def my_bookings(request):

    bookings = Booking.objects.filter(
        request__customer=request.user
    ).order_by('-id')

    return render(
        request,
        'bookings/my_bookings.html',
        {
            'bookings': bookings
        }
    )
