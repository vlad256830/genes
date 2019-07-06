import string
import pandas as pd
import os
import io
from django.db import models
# from django.http import HttpResponse
from celery import shared_task, current_task


from .models import RiskGroups, Groups
from rsid.api.serializer import AnalizTestSerializer

# def get_gene_name(rsid):
#     print(rsid)
#     rsids = list(RSID.objects.filter(
#         rsid=rsid).values_list('gene_id', flat=True)[:1])
#     gene_id = '0'
#     if len(rsids) > 0:
#         gene_id = rsids[0]
#     gene_name = ''
#     if gene_id != '0':
#         gene_name = Genes.objects.get(id=gene_id).gene_name
#     else:
#         gene_name = 'no'
#     return gene_name


@shared_task
def analiz(fname, g):
    try:
        # task_id = current_task.request.id
        # print(task_id)
        # current_task.update_state(state='PROGRESS', meta={'current': i, 'total': 0, 'percent': 0})
        csv = pd.read_csv(fname)
        csv.set_index('RSID', inplace=True)
        informData = []        
        if (g == '-1') or (g is None):
            riskA = RiskGroups.objects.all()
            rsids = list(RiskGroups.objects.all().values_list('rsid', flat=True)) 
        else:
            riskA = RiskGroups.objects.all().filter(group_id=g)
            rsids = list(RiskGroups.objects.all().filter(group_id=g).values_list('rsid', flat=True)) 
        count = riskA.count()   
        csvrisk = csv.index.intersection(pd.Series(rsids))
        # csvlist = csvrisk.tolist()
        csvset = set(csvrisk)
        for r in riskA:
            rsid = r.rsid
            # print(rsid)
            # rs = csv[csv['RSID'] == r.rsid]
            if rsid in csvset:
                try:
                    rs = csv.loc[r.rsid]
                    # if len(rs) > 0:
                    res = rs['RESULT']
                    group = str(r.group_id)
                    risk = r.risk
                    gene = r.gene_name
                    # print(gene)
                    col = 0
                    if len(res) == 2:
                        if (res[0] == res[1]) and (res[0] == risk):
                            col = 2
                        elif (res[0] == risk) or (res[1] == risk):
                            col = 1
                    if len(res) == 1:
                        if res == risk:
                            col = 2                
                    dt = {'group': group, 'rsid': rsid, 'gene_name': gene, 'risk': risk, 'res': res, 'col': col}

                    informData.append(dt)
                except: 
                    continue
           
        if os.path.exists(fname):
            os.remove(fname)
        n = informData.count
        print('informData', n)
        return {'data': informData, 'total': count}
    except SomeNetworkException as e:
        print("maybe do some clenup here....")
        self.retry(e)
        return {'data': [], 'total': count}

