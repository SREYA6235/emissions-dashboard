from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class DataSource(models.Model):
    TYPE_CHOICES = [
        ("SAP", "SAP"),
        ("UTILITY", "Utility"),
        ("TRAVEL", "Travel"),
    ]

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class EmissionRecord(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    source = models.ForeignKey(DataSource, on_delete=models.CASCADE)

    scope = models.IntegerField()
    category = models.CharField(max_length=50)
    activity_value = models.FloatField()
    unit = models.CharField(max_length=20)
    date = models.DateField()
    co2e = models.FloatField(null=True, blank=True)
   
    status = models.CharField(
    max_length=20,
    default="PENDING",
    choices=[
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    ]
)

class RawRecord(models.Model):
    source = models.ForeignKey(DataSource, on_delete=models.CASCADE)
    raw_data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)


class AuditLog(models.Model):
    emission = models.ForeignKey(EmissionRecord, on_delete=models.CASCADE)
    action = models.CharField(max_length=50)
    changed_by = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
