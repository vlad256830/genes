import os
import pandas as pd
from django.contrib.auth import authenticate, get_user_model
from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics, status, views, mixins
from rest_framework.reverse import reverse
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import APIException

from celery.result import ResultBase, AsyncResult
from django_celery_results.models import TaskResult
from celery.states import state, PENDING, SUCCESS


from django.conf import settings
from rsid.models import Genes, RSID, Groups, RiskGroups, FileUpload, GeneData
from .serializer import GenesSerializer, RSIDSerializer, GroupsSerializer, RiskGroupsSerializer,\
    RSIDGeneSerializer, GenesRSIDSSerializer, GroupsRiskSerializer, FileUploadSerializer,\
    GeneDataUploadSerializer, AnalizTestSerializer, Inform
from rsid.tasks import analiz


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
    queryset = RiskGroups.objects.all()
    serializer_class = RiskGroupsSerializer
    ordering_fields = ('id',)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        params = self.request.query_params
        group_id = params.get('group_id', None)
        # print(group_id)
        if group_id is not None:
            queryset = queryset.filter(group_id=group_id)
        serializer = RiskGroupsSerializer(queryset, many=True)
        return Response(serializer.data)


class RiskRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = RiskGroups.objects.all()
    serializer_class = RiskGroupsSerializer
    lookup_fields = ('id', )


class RSIDGeneListView(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = RSID.objects.all()
    serializer_class = RSIDGeneSerializer
    ordering_fields = ('id',)


class FileUploadView(mixins.CreateModelMixin, generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = FileUpload.objects.all()
    serializer_class = FileUploadSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AppendNewGroup(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = RiskGroups.objects.all()
    serializer_class = RiskGroupsSerializer

    def post(self, request, *args, **kwargs):
        id = request.data
        # print(id)
        fname = FileUpload.objects.get(id=id).datafile.name
        # print('fname', fname)
        fn = fname.split('/')
        gn = fn[len(fn)-1].split('.')

        if Groups.objects.filter(group=gn[0]):
            os.remove(settings.MEDIA_ROOT + '/' + fname)
            return Response({'This group is exists.'}, status=406)
        g = Groups(group=gn[0])
        g.save()

        g_id = Groups.objects.filter(group=gn[0])[:1].get().id
        # print(g_id)
        if fname != '':
            fgroup = settings.MEDIA_ROOT + '/' + fname

            with open(fgroup) as fp:
                for line in fp:
                    if line[0] != '#':
                        s = line.split(',')
                        # gene_name = s[0]
                        # rsid = s[1]
                        # risk = s[2]
                        serializer = self.get_serializer(
                            data={'gene_name': s[0], 'rsid': s[1], 'group_id': g_id, 'risk': s[2]})
                        if serializer.is_valid():
                            serializer.save()
            if os.path.exists(fgroup):
                os.remove(fgroup)
        else:
            return Response({'Invalid  file name.'}, status=406)
        # return self.create(request, *args, **kwargs)
        return Response(status=204)


class GeneDataView(mixins.CreateModelMixin, generics.ListAPIView):
    '''
    Upload clients file
    '''
    permission_classes = (IsAuthenticated,)
    queryset = GeneData.objects.all()
    serializer_class = GeneDataUploadSerializer

    def list(self, request, *args, **kwargs):
        user = self.request.user
        queryset = self.get_queryset().filter(user=user)
        serializer = GeneDataUploadSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ClientDataView(generics.ListAPIView):
    ''' 
    Analiz client file
    '''
    permission_classes = (IsAuthenticated,)
    serializer_class = AnalizTestSerializer

    def get_gene_name(self, rsid):
        # print(rsid)
        rsids = list(RSID.objects.filter(
            rsid=rsid).values_list('gene_id', flat=True)[:1])            
        gene_id = '0'
        if len(rsids) > 0:
            gene_id = rsids[0]
        gene_name = ''
        if gene_id != '0':
            gene_name = Genes.objects.get(id=gene_id).gene_name
        else:
            gene_name = 'no'
        return gene_name   

    def list(self, request, *args, **kwargs):
        params = self.request.query_params
        id = params.get('id', None)
        g = params.get('group', None)
        # print('group', g)
        fname = GeneData.objects.get(id=id).genedatafile.name
        fname = settings.MEDIA_ROOT + '/' + fname
        # print('fname', fname)
        csv = pd.read_csv(fname)
        informData = []
        if (g == '-1') or (g is None):
            riskA = RiskGroups.objects.all()
        else:
            riskA = RiskGroups.objects.all().filter(group_id=g)
        for r in riskA:
            rsid = r.rsid
            rs = csv[csv['RSID'] == r.rsid]
            if len(rs) > 0:
                res = rs['RESULT'].values[0]
                group = str(r.group_id)
                risk = r.risk
                gene = self.get_gene_name(rsid)
                # print('group:', group)
                # print('gene', gene)
                # print('rsid', rsid)
                # print('risk', risk)
                # print('res:', res)
                col = 0
                if len(res) == 2:
                    if (res[0] == res[1]) and (res[0] == risk):
                        col = 2
                    elif (res[0] == risk) or (res[1] == risk):
                        col = 1
                if len(res) == 1:
                    if res == risk:
                        col = 2
                serializer = self.get_serializer(
                    data={'group': group, 'rsid': rsid, 'gene_name': gene, 'risk': risk, 'res': res, 'col': col})
                if serializer.is_valid():
                    serializer.save()
                    informData.append(serializer.data)
                    # print(serializer.data)
                else:
                    print(serializer.data)
        if os.path.exists(fname):
            os.remove(fname)

        return Response({'data': informData})


class AnalizDataView(mixins.CreateModelMixin, generics.ListAPIView):
    ''' 
    Analiz client file
    '''
    permission_classes = (IsAuthenticated,)
    serializer_class = AnalizTestSerializer   

    def list(self, request, *args, **kwargs):
        params = self.request.query_params
        id = params.get('id', None)
        g = params.get('group', None)
        # print('group', g)
        fname = GeneData.objects.get(id=id).genedatafile.name
        fname = settings.MEDIA_ROOT + '/' + fname
        # print('fname', fname)
        task = analiz.delay(fname, g)
        rezult = {'task_id': task.id}      

        return Response({'rezult': rezult})

    def post(self, request, *args, **kwargs):
        task_id = request.data
        # print('task_id:', task_id)
        taskAnalis = AsyncResult(task_id)
        if taskAnalis.ready():
            print('task ready:')
            data = {
                'state': taskAnalis.state,
                'result': taskAnalis.result,
            }
            # print(taskAnalis.state)
            # print(taskAnalis.result)
            return Response(data)
        else:
            return Response({'result': 'Result not ready'})


     

