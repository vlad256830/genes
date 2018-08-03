from django.db.models import Q
from rest_framework import generics, mixins

from analiz.models import Gene
from .serializers import GeneSerializer



class GeneAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    lookup_field            = 'pk' 
    serializer_class        = GeneSerializer

    def get_queryset(self):
        qs = Gene.objects.all()
        query = self.request.GET.get("q")
        if query is not None:
            qs = qs.filter(
                    Q(gene_name__icontains=query)|
                    Q(comments__icontains=query)
                    ).distinct()
        return qs

    def perform_create(self, serializer):
        serializer.save()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

