from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    student_number = models.CharField(max_length=50, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(
        upload_to='profiles/',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class ProviderProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    business_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.business_name

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Service(models.Model):
    provider = models.ForeignKey(
        ProviderProfile,
        on_delete=models.CASCADE,
        related_name='services'
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='services'
    )

    title = models.CharField(max_length=150)
    description  = models.TextField()
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    location = models.CharField(max_length=200, blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Request(models.Model):

    STATUS_CHOICES =[
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='service_requests'
    )

    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='requests'
    )

    message = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Requested by {self.customer.username}"

class Response(models.Model):
    request = models.ForeignKey(
        Request,
        on_delete=models.CASCADE,
        related_name='responses'
    )

    provider = models.ForeignKey(
        ProviderProfile,
        on_delete=models.CASCADE,
        related_name='responses'
    )

    message = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response from {self.provider.business_name}"

class Booking(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    request = models.ForeignKey(
        Request,
        on_delete=models.CASCADE,
        related_name='bookings'
    )

    response = models.ForeignKey(
        Response,
        on_delete=models.CASCADE,
        related_name='bookings'
    )

    def __str__(self):
        return f"Booking {self.id}"

class Review(models.Model):
    booking = models.OneToOneField(
        Booking,
        on_delete=models.CASCADE,
        related_name='review'
    )

    reviewer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    rating = models.PositiveIntegerField()

    comment = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.reviewer.username}"
    
class Report(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('reviewed','Reviewed'),
        ('resolved','Resolved'),
    ]

    reporter = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reports_made'
    )

    reported_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reports_recieved'
    )

    reason = models.CharField(max_length=150)

    description = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report by {self.reporter.username}"

