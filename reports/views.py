from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from core.models import Report


@login_required
def create_report(request, user_id):

    reported_user = get_object_or_404(
        User,
        id=user_id
    )

    if request.method == 'POST':

        Report.objects.create(
            reporter=request.user,
            reported_user=reported_user,
            reason=request.POST.get('reason'),
            description=request.POST.get('description')
        )

        return redirect('dashboard')

    return render(
        request,
        'reports/create_report.html',
        {
            'reported_user': reported_user
        }
    )
