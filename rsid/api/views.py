from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.reverse import reverse
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from rsid.models import Genes, RSID, Groups, Risk
from .serializer import GenesSerializer, RSIDSerializer, GroupsSerializer, RiskSerializer,\
    RSIDGeneSerializer, GenesRSIDSSerializer, GroupsRiskSerializer

class GenesListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Genes.objects.all()
    serializer_class = GenesSerializer
    ordering_fields = ('id',)


class GenesRSIDSListView(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Genes.objects.all()
    serializer_class = GenesRSIDSSerializer
    ordering_fields = ('id',)


class GenesRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Genes.objects.all()
    serializer_class = GenesSerializer
    lookup_fields = ('id', )


class RSIDListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = RSID.objects.all()
    serializer_class = RSIDSerializer
    ordering_fields = ('id',)


class RSIDRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = RSID.objects.all()
    serializer_class = RSIDSerializer
    lookup_fields = ('id', )


class GroupsListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Groups.objects.all()
    serializer_class = GroupsSerializer
    ordering_fields = ('id',)


class GroupsRiskListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Groups.objects.all()
    serializer_class = GroupsRiskSerializer
    ordering_fields = ('id',)


class GroupsRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Groups.objects.all()
    serializer_class = GroupsSerializer
    lookup_fields = ('id', )
    

class RiskListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Risk.objects.all()
    serializer_class = RiskSerializer
    ordering_fields = ('id',)

    def list(self, request):
        queryset = self.get_queryset()
        params = self.request.query_params
        group_id = params.get('group_id', None)
        print(group_id)
        if group_id is not None:
            queryset = queryset.filter(group_id=group_id)
        serializer = RiskSerializer(queryset, many=True)
        return Response(serializer.data)

class RiskRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Risk.objects.all()
    serializer_class = RiskSerializer
    lookup_fields = ('id', )


class RSIDGeneListView(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = RSID.objects.all()
    serializer_class = RSIDGeneSerializer
    ordering_fields = ('id',)