import os
from rest_framework import serializers

from rsid.models import Genes, RSID, Groups, RiskGroups, FileUpload, GeneData


class Inform(object):
    def __init__(self, group, gene_name, rsid, risk, res, col):
        self.group = group
        self.gene_name = gene_name
        self.rsid = rsid
        self.risk = risk
        self.res = res
        self.col = col


class GenesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genes
        fields = ('id', 'gene_name', 'category',
                  'urls', 'comments', 'description',)
        read_only_fields = ('id',)


class GenesRSIDSSerializer(serializers.ModelSerializer):
    genes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Genes
        fields = ('id', 'gene_name', 'category', 'urls',
                  'comments', 'description', 'genes',)
        read_only_fields = ('id',)


class RSIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSID
        fields = ('id', 'rsid', 'category', 'minor_allele', 'major_allele',
                  'risk_allele', 'links', 'txt_minor', 'txt_major', 'gene_id', )
        read_only_fields = ('id',)


class RSIDGeneSerializer(serializers.ModelSerializer):
    gene_name = serializers.CharField(source='gene_id', read_only=True)

    class Meta:
        model = RSID
        fields = ('id', 'rsid', 'category', 'minor_allele', 'major_allele',
                  'risk_allele', 'links', 'txt_minor', 'txt_major', 'gene_id', 'gene_name')
        read_only_fields = ('id',)


class GroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = ('id', 'group',)
        read_only_fields = ('id',)


class GroupsRiskSerializer(serializers.ModelSerializer):
    riskgenes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Groups
        fields = ('id', 'group', 'riskgenes')
        read_only_fields = ('id',)


class RiskGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskGroups
        fields = ('id', 'rsid', 'gene_name', 'group_id', 'risk', )
        read_only_fields = ('id',)


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = ('created', 'datafile', 'id')
        read_only_fields = ('id',)

    def validate(self, data):
        datafile = data.get("datafile", None)
        if datafile is None:
            raise serializers.ValidationError("Datafile is required.")
        return data


class GeneDataUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneData
        fields = ('id', 'user', 'created', 'genedatafile')
        read_only_fields = ('id', 'user')

    def validate(self, data):
        datafile = data.get("genedatafile", None)
        if datafile is None:
            raise serializers.ValidationError("Datafile is required.")
        return data


class AnalizTestSerializer(serializers.Serializer):
    group = serializers.CharField(max_length=45)
    gene_name = serializers.CharField(max_length=45)
    rsid = serializers.CharField(max_length=45)
    risk = serializers.CharField(max_length=10)
    res = serializers.CharField(max_length=10)
    col = serializers.IntegerField(max_value=3, min_value=0)

    def create(self, validated_data):
        return Inform(**validated_data)

