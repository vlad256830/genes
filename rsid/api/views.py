from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.reverse import reverse
from rest_framework.response import Response

from rsid.models import Genes, RSID, Groups, Risk
from .serializer import GenesSerializer, RSIDSerializer, GroupsSerializer, RiskSerializer

class GenesListCreateView(generics.ListCreateAPIView):
    queryset = Genes.objects.all()
    serializer_class = GenesSerializer


class GenesRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Genes.objects.all()
    serializer_class = GenesSerializer
    lookup_fields = ('id', )


class RSIDListCreateView(generics.ListCreateAPIView):
    queryset = RSID.objects.all()
    serializer_class = RSIDSerializer


class RSIDRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = RSID.objects.all()
    serializer_class = RSIDSerializer
    lookup_fields = ('id', )


class GroupsListCreateView(generics.ListCreateAPIView):
    queryset = Groups.objects.all()
    serializer_class = GroupsSerializer


class GroupsRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Groups.objects.all()
    serializer_class = GroupsSerializer
    lookup_fields = ('id', )


class RiskListCreateView(generics.ListCreateAPIView):
    queryset = Risk.objects.all()
    serializer_class = RiskSerializer


class RiskRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Risk.objects.all()
    serializer_class = RiskSerializer
    lookup_fields = ('id', )
 