from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required

from core.models import (
    Booking,
    Review
)


@login_required
def create_review(request, booking_id):

    booking = get_object_or_404(
        Booking,
        id=booking_id,
        request__customer=request.user
    )

    if hasattr(booking, 'review'):
        return redirect('my_bookings')

    if request.method == 'POST':

        Review.objects.create(
            booking=booking,
            reviewer=request.user,
            rating=request.POST.get('rating'),
            comment=request.POST.get('comment')
        )

        return redirect('my_bookings')

    return render(
        request,
        'reviews/create_review.html',
        {
            'booking': booking
        }
    )
