from django.conf import settings
from django.db import models
from django.urls import reverse

from rest_framework.reverse import reverse as api_reverse

# Create your models here.
class Gene(models.Model):
    gene_name = models.CharField(max_length=45, unique=True, db_index=True)
    category = models.CharField(max_length=45, blank=True)
    comments = models.TextField(blank=True)
    description = models.TextField(blank=True)
    urls = models.TextField(blank=True)    
    
    class Meta:
        db_table = 'genes'

    def __str__(self):
        return str(self.gene_name)

class Rsid(models.Model):
    rsid = models.CharField(max_length=45, unique=True, db_index=True)
    category = models.CharField(max_length=45, blank=True)
    txt_major = models.TextField(blank=True)
    txt_minor = models.TextField(blank=True)
    links = models.CharField(max_length=255, blank=True)
    minor_allele = models.CharField(max_length=10, blank=True)
    major_allele = models.CharField(max_length=10, blank=True)
    risk_allele = models.CharField(max_length=10)
    gene_id = models.ForeignKey(Gene, on_delete=models.CASCADE) 

    class Meta:
        db_table = 'rsid'

    def __str__(self):
        return str(self.rsid)

class Risk_group(models.Model):
    rsid = models.CharField(max_length=45, unique=True, db_index=True)
    gene_name = models.CharField(max_length=45)
    risk = models.CharField(max_length=10)
    group = models.CharField(max_length=45)

    class Meta:
        db_table = 'risk_group'

    def __str__(self):
        return str(self.rsid)

class Mygroup_name(models.Model):
    name = models.CharField(max_length=45, unique=True)

    class Meta:
        db_table = 'mygroup_name'

    def __str__(self):
        return str(self.name)


class My_group(models.Model):
    rsid = models.CharField(max_length=45, unique=True, db_index=True)
    gene_name = models.CharField(max_length=45)
    risk = models.CharField(max_length=10)
    group_id = models.ForeignKey(Mygroup_name, on_delete=models.CASCADE)

    class Meta:
        db_table = 'my_groups'
    
    def __str__(self):
        return str(self.rsid)










