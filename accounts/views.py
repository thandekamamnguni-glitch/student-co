from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from core.models import Profile
# Create your views here.

def register(request):

    if request.method == 'POST':

        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            return render(
                request,
                'accounts/register.html',
                {
                    'error': 'Passwords do not match'
                }
            )

        if User.objects.filter(username=username).exists():
            return render(
                request,
                'accounts/register.html',
                {
                    'error':'Username already exists'
                }
            )

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        Profile.objects.create(
            user=user
        )

        login(request, user)

        return redirect('dashboard')

    return render(request, 'accounts/register.html')


def login_view(request):

    if request.method == 'POST':

        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:

            login(request, user)

            return redirect('dashboard')
        
        return render(
            request,
            'accounts/login.html',
            {
                'error': 'Invalid username or password.'
            }
        )

    return render(request, 'accounts/login.html')


def logout_view(request):

    logout(request)

    return redirect('home')


def dashboard(request):

    if not request.user.is_authenticated:
        return redirect('login')

    return render(
        request,
        'accounts/dashboard.html'
    )

def profile(request):

    if not request.user.is_authenticated:
        return redirect('login')

    user_profile = request.user.profile

    if request.method == 'POST':

        user_profile.student_number = request.POST.get(
            'student_number'
        )

        user_profile.phone = request.POST.get(
            'phone'
        )

        user_profile.bio = request.POST.get(
            'bio'
        )

        if request.FILES.get('profile_picture'):
            user_profile.profile_picture = request.FILES.get(
                'profile_picture'
            )

        user_profile.save()

        return redirect('profile')

    return render(
        request,
        'accounts/profile.html',
        {
            'profile': user_profile
        }
    )
