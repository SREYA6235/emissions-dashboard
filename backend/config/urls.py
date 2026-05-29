from django.contrib import admin
from django.urls import path

from emissions.views import (
    emissions_list,
    ingest_sap,
    ingest_utility,
    ingest_travel,
    update_status
)

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/emissions/", emissions_list),

    path("api/ingest/sap/", ingest_sap),
    path("api/ingest/utility/", ingest_utility),
    path("api/ingest/travel/", ingest_travel),
    path("api/emissions/<int:id>/status/", update_status),
]