from rest_framework import serializers

from rsid.models import Genes, RSID, Groups, Risk


class GenesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genes
        fields = ('id', 'gene_name', 'category', 'urls', 'comments', 'description',)
        read_only_fields = ('id',)


class RSIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSID
        fields = ('id', 'rsid' , 'category', 'minor_allele', 'major_allele',
            'risk_allele', 'links', 'txt_minor', 'txt_major', 'gene_id', )
        read_only_fields = ('id',)


class GroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = ('id', 'group',)
        read_only_fields = ('id',)


class RiskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Risk
        fields = ('id', 'rsid', 'group_id', 'risk', )
        read_only_fields = ('id',)
