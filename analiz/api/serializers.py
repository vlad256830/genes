from rest_framework import serializers


from analiz.models import Gene



class GeneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gene
        fields = [
            'gene_name',
            'category',
            'comments',
            'description',
            'urls'
        ]

