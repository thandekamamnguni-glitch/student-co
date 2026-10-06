from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from core.models import Profile, ProviderProfile

# Create your views here.


VALID_TYPES = ('seeker', 'provider', 'both')

def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        account_type = request.POST.get('account_type')

        error = None
        if account_type not in VALID_TYPES:
            error = 'Please choose how you will use Student Co'
        elif password != confirm_password:
            error = 'Passwords do not match'
        elif User.objects.filter(username=username).exists():
            error = 'Username already exists'
        elif User.objects.filter(email=email).exists():
            error = 'Email already in use'

        if error:
            return render(request, 'accounts/register.html', {'error': error})

        user = User.objects.create_user(username=username, email=email, password=password)
        Profile.objects.create(user=user, account_type=account_type)

        login(request, user)
        request.session['active_role'] = 'provider' if account_type == 'provider' else 'seeker'

        if account_type == 'provider':
            return redirect('become_provider')
        return redirect('dashboard')

    return render(request, 'accounts/register.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        role = request.POST.get('role', 'seeker')   # 'seeker' or 'provider'

        user = authenticate(request, username=username, password=password)
        if user is None:
            return render(request, 'accounts/login.html', {'error': 'Invalid username or password'})

        profile = Profile.objects.filter(user=user).first()
        acct = profile.account_type if profile else 'both'

        if acct != 'both' and acct != role:
            msg = ('This is a seeker-only account. Choose "Seeker", or register as Provider or Both.'
                   if acct == 'seeker' else
                   'This is a provider-only account. Choose "Provider", or register as Seeker or Both.')
            return render(request, 'accounts/login.html', {'error': msg})

        login(request, user)
        request.session['active_role'] = role
        return redirect('dashboard')

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

    user_profile, create = Profile.objects.get_or_create(user=request.user)

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

def become_provider(request):

    if not request.user.is_authenticated:
        return redirect('login')

    provider, created = ProviderProfile.objects.get_or_create(
        user=request.user,
        defaults={
            'business_name': request.user.username,
            'description': ''
        }
    )

    if request.method == 'POST':

        provider.business_name = request.POST.get('business_name')
        provider.description = request.POST.get('description')
        provider.is_available = True

        provider.save()

        profile = Profile.objects.get_or_create(
            user=request.user
        )[0]

        profile.is_provider = True
        profile.save()

        return redirect('provider_dashboard')

    return render(
        request,
        'accounts/become_provider.html',
        {
            'provider': provider
        }
    )