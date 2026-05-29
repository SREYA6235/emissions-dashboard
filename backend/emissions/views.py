from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import EmissionRecord, DataSource, RawRecord
from .serializers import EmissionSerializer
@api_view(["POST"])
def update_status(request, id):
    record = get_object_or_404(EmissionRecord, id=id)
    action = request.data.get("action")

    if action == "approve":
        record.status = "APPROVED"
    elif action == "reject":
        record.status = "REJECTED"

    record.save()
    return Response({"message": "updated"})

# -----------------------
# LIST EMISSIONS
# -----------------------
@api_view(["GET"])
def emissions_list(request):
    data = EmissionRecord.objects.all().order_by("-id")
    serializer = EmissionSerializer(data, many=True)
    return Response(serializer.data)


# -----------------------
# SAP INGESTION
# -----------------------
@api_view(["POST"])
def ingest_sap(request):
    data = request.data

    source = get_object_or_404(DataSource, id=data["source_id"])

    RawRecord.objects.create(
        source=source,
        raw_data=data
    )

    co2 = float(data["fuel_used"]) * 2.31

   


    emission = EmissionRecord.objects.create(
        organization=source.organization,
        source=source,
        scope=1,
        category="fuel",
        activity_value=float(data["fuel_used"]),
        unit="liters",
        co2e=co2,
      
        date=data["date"]
    )

    return Response({"message": "SAP ingested", "id": emission.id})


# -----------------------
# UTILITY INGESTION
# -----------------------
@api_view(["POST"])
def ingest_utility(request):
    data = request.data

    source = get_object_or_404(DataSource, id=data["source_id"])

    RawRecord.objects.create(
        source=source,
        raw_data=data
    )

    co2 = float(data["kwh"]) * 0.82
    

    emission = EmissionRecord.objects.create(
        organization=source.organization,
        source=source,
        scope=2,
        category="electricity",
        activity_value=float(data["kwh"]),
        unit="kWh",
        co2e=co2,
       
        date=data["date"]
    )

    return Response({"message": "Utility ingested", "id": emission.id})

@api_view(["POST"])
def update_status(request, id):
    record = EmissionRecord.objects.get(id=id)
    action = request.data.get("action")

    if action == "approve":
        record.is_approved = True
    elif action == "reject":
        record.is_approved = False

    record.save()
    return Response({"message": "updated"})
# -----------------------
# TRAVEL INGESTION
# -----------------------
@api_view(["POST"])
def ingest_travel(request):
    data = request.data

    source = get_object_or_404(DataSource, id=data["source_id"])

    RawRecord.objects.create(
        source=source,
        raw_data=data
    )

    co2 = float(data["distance_km"]) * 0.15
  
    emission = EmissionRecord.objects.create(
        organization=source.organization,
        source=source,
        scope=3,
        category="travel",
        activity_value=float(data["distance_km"]),
        unit="km",
        co2e=co2,
         
        date=data["date"]
    )

    return Response({"message": "Travel ingested", "id": emission.id})