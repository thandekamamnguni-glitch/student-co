from django.contrib import admin

from .models import (
    Profile,
    ProviderProfile,
    Category,
    Service,
    Request,
    Response,
    Booking,
    Review,
    Report,
)

admin.site.register(Profile)
admin.site.register(ProviderProfile)
admin.site.register(Category)
admin.site.register(Service)
admin.site.register(Request)
admin.site.register(Response)
admin.site.register(Booking)
admin.site.register(Review)
admin.site.register(Report)
