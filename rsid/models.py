from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

User = settings.AUTH_USER_MODEL

def upload_risk_csv(instance, filename):
    return "groups/{user}/{filename}".format(user=instance.user, filename=filename)

def upload_genedata_file(instance, filename):
    return "data/{user}/{filename}".format(user=instance.user, filename=filename)


class Genes(models.Model):
    # id = models.AutoField(primary_key=True)
    gene_name = models.CharField(max_length=45, unique=True)
    category = models.CharField(max_length=45)
    urls = models.CharField(max_length=255, blank=True, null=True)
    comments = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.gene_name

    class Meta:
        # managed = False
        db_table = 'genes'


class RSID(models.Model):
    rsid = models.CharField(max_length=45, unique=True)
    category = models.CharField(max_length=45)
    minor_allele = models.CharField(max_length=10)
    major_allele = models.CharField(max_length=10)
    risk_allele = models.CharField(max_length=10)
    links = models.CharField(max_length=255, blank=True, null=True)
    txt_major = models.TextField(blank=True, null=True)
    txt_minor = models.TextField(blank=True, null=True)
    gene_id = models.ForeignKey(Genes, related_name='genes', on_delete=models.DO_NOTHING)
    
    def __str__(self):
        return '%s %s' % (self.rsid, self.gene_id)

    class Meta:
        # managed = False
        db_table = 'rsid'


class Groups(models.Model):
    id = models.AutoField(primary_key=True)
    group = models.CharField(max_length=45, unique=True)

    def __str__(self):
        return self.group

    class Meta:
        # managed = False
        db_table = 'groups'


# class Risk(models.Model):
#     id = models.AutoField(primary_key=True)
#     rsid = models.CharField(max_length=45)
#     # on_delete=models.DO_NOTHING
#     group_id = models.ForeignKey(Groups, related_name='riskgenes', on_delete=models.CASCADE)
#     risk = models.CharField(max_length=10)

#     def __str__(self):
#         return '%s %s' % (self.rsid, self.risk)

#     class Meta:
#         # managed = False
#         db_table = 'risk'

class RiskGroups(models.Model):
    id = models.AutoField(primary_key=True)
    rsid = models.CharField(max_length=45)
    gene_name = models.CharField(max_length=45)
    group_id = models.ForeignKey(Groups, related_name='riskgenes', on_delete=models.CASCADE)
    risk = models.CharField(max_length=10)

    def __str__(self):
        return '%s %s' % (self.rsid, self.risk)

    class Meta:
        db_table = 'riskgroups'


class FileUpload(models.Model):
    user        = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) 
    created     = models.DateTimeField(auto_now_add=True)
    datafile    = models.FileField(upload_to=upload_risk_csv, null=True, blank=True)

    def __str__(self):
        return '%s %s' % (self.datafile, self.created)


class GeneData(models.Model):
    user            = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) 
    genedatafile    = models.FileField(upload_to=upload_genedata_file, null=True, blank=True)
    created         = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s %s' % (self.genedatafile, self.created)



