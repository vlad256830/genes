from django.db import models

# Create your models here.


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
        return self.rsid

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


class Risk(models.Model):
    id = models.AutoField(primary_key=True)
    rsid = models.CharField(max_length=45)
    group_id = models.ForeignKey(Groups, related_name='riskgenes', on_delete=models.DO_NOTHING)
    risk = models.CharField(max_length=10)

    def __str__(self):
        return '%s %s' % (self.rsid, self.risk)

    class Meta:
        # managed = False
        db_table = 'risk'


class MyGroups(models.Model):
    rsid = models.CharField(max_length=45)
    gene_name = models.CharField(max_length=45)
    risk = models.CharField(max_length=10)
    group_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'my_groups'


class MygroupName(models.Model):
    name = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'mygroup_name'


class RiskGroups(models.Model):
    rsid = models.CharField(max_length=45)
    gene_name = models.CharField(max_length=45)
    risk = models.CharField(max_length=10)
    group = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'risk_groups'
